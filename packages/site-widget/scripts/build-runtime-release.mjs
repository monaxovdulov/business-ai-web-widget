import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  stat,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ZIP_LOCAL_FILE_HEADER = 0x04034b50;
const ZIP_CENTRAL_DIRECTORY_HEADER = 0x02014b50;
const ZIP_END_OF_CENTRAL_DIRECTORY = 0x06054b50;
const ZIP_VERSION = 20;
const ZIP_VERSION_MADE_BY_UNIX = 0x0314;
const ZIP_UTF8_FLAG = 0x0800;
const ZIP_STORE_METHOD = 0;
const ZIP_DOS_TIME = 0;
const ZIP_DOS_DATE = 0x0021; // 1980-01-01, the earliest representable ZIP date.
const ZIP_FILE_MODE = ((0o100644 & 0xffff) << 16) >>> 0;
const UINT32_MAX = 0xffffffff;

const builderScriptPath = fileURLToPath(import.meta.url);
const scriptDirectory = dirname(builderScriptPath);
const packageRoot = resolve(scriptDirectory, "..");
const packageJsonPath = join(packageRoot, "package.json");
const distDirectory = join(packageRoot, "dist");
const artifactsDirectory = join(packageRoot, "release-artifacts");

const runtimeFileNames = ["loader.js", "site-widget.esm.js"];

const crc32Table = new Uint32Array(256);
for (let index = 0; index < crc32Table.length; index += 1) {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = (value & 1) === 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  crc32Table[index] = value >>> 0;
}

function sha256(data) {
  return createHash("sha256").update(data).digest("hex");
}

function crc32(data) {
  let value = 0xffffffff;
  for (const byte of data) {
    value = crc32Table[(value ^ byte) & 0xff] ^ (value >>> 8);
  }
  return (value ^ 0xffffffff) >>> 0;
}

function assertZip32(value, label) {
  if (!Number.isSafeInteger(value) || value < 0 || value > UINT32_MAX) {
    throw new Error(`${label} exceeds the ZIP32 limit`);
  }
}

function assertReadableRange(buffer, offset, length, label) {
  if (
    !Number.isSafeInteger(offset) ||
    !Number.isSafeInteger(length) ||
    offset < 0 ||
    length < 0 ||
    offset + length > buffer.length
  ) {
    throw new Error(`Invalid ${label} range in runtime ZIP`);
  }
}

async function readPackageMetadata() {
  let sourceBytes;
  let packageJson;
  try {
    sourceBytes = await readFile(packageJsonPath);
    packageJson = JSON.parse(sourceBytes.toString("utf8"));
  } catch (error) {
    throw new Error(`Cannot read ${packageJsonPath}: ${error.message}`, { cause: error });
  }

  if (typeof packageJson.name !== "string" || packageJson.name.length === 0) {
    throw new Error("package.json must contain a non-empty package name");
  }

  if (
    typeof packageJson.version !== "string" ||
    !/^[0-9A-Za-z][0-9A-Za-z.+-]*$/.test(packageJson.version)
  ) {
    throw new Error("package.json must contain a path-safe package version");
  }

  return { name: packageJson.name, version: packageJson.version, sourceBytes };
}

async function readRuntimeFile(fileName) {
  const filePath = join(distDirectory, fileName);
  let fileStats;
  try {
    fileStats = await stat(filePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(
        `Required runtime file is missing: ${filePath}. Run the package build first.`,
        { cause: error }
      );
    }
    throw error;
  }

  if (!fileStats.isFile()) {
    throw new Error(`Required runtime path is not a file: ${filePath}`);
  }

  const data = await readFile(filePath);
  if (data.length === 0) {
    throw new Error(`Required runtime file is empty: ${filePath}`);
  }
  return data;
}

function spawnGit(args, input) {
  const result = spawnSync("git", args, {
    cwd: packageRoot,
    encoding: "utf8",
    input,
    maxBuffer: 10 * 1024 * 1024,
    stdio: [input === undefined ? "ignore" : "pipe", "pipe", "pipe"],
    windowsHide: true
  });

  if (result.error) {
    throw new Error(`Cannot run git ${args.join(" ")}: ${result.error.message}`, {
      cause: result.error
    });
  }
  return result;
}

function requireGitOutput(args, input) {
  const result = spawnGit(args, input);
  if (result.status !== 0) {
    const detail = result.stderr.trim();
    throw new Error(`git ${args.join(" ")} failed${detail ? `: ${detail}` : ""}`);
  }
  return result.stdout.trim();
}

function readGitCommit() {
  const commit = requireGitOutput(["rev-parse", "--verify", "HEAD^{commit}"]);

  if (!/^[0-9a-f]{40}([0-9a-f]{24})?$/i.test(commit)) {
    throw new Error(`Unexpected git commit returned by git: ${commit}`);
  }
  return commit.toLowerCase();
}

function findDirtyReleaseInputs(releaseInputs) {
  const repositoryPrefix = requireGitOutput(["rev-parse", "--show-prefix"]);
  const dirtyInputs = [];

  for (const [packageRelativePath, data] of releaseInputs) {
    const repositoryRelativePath = `${repositoryPrefix}${packageRelativePath}`;
    const headBlob = spawnGit(["rev-parse", "--verify", `HEAD:${repositoryRelativePath}`]);
    const inputBlob = requireGitOutput(["hash-object", "--stdin"], data);
    const trackedDiff = spawnGit(["diff", "--quiet", "HEAD", "--", packageRelativePath]);

    if (trackedDiff.status !== 0 && trackedDiff.status !== 1) {
      const detail = trackedDiff.stderr.trim();
      throw new Error(
        `Cannot compare ${packageRelativePath} with HEAD${detail ? `: ${detail}` : ""}`
      );
    }

    const headBlobHash = headBlob.status === 0 ? headBlob.stdout.trim() : "";
    if (headBlobHash === "" || headBlobHash !== inputBlob || trackedDiff.status === 1) {
      dirtyInputs.push(packageRelativePath);
    }
  }

  return dirtyInputs;
}

function createDeterministicZip(inputEntries) {
  const entries = inputEntries
    .map(({ name, data }) => ({
      name,
      nameBuffer: Buffer.from(name, "utf8"),
      data: Buffer.from(data)
    }))
    .sort((left, right) => Buffer.compare(left.nameBuffer, right.nameBuffer));

  assert.ok(entries.length > 0, "Runtime ZIP must contain at least one entry");
  assert.ok(entries.length <= 0xffff, "Runtime ZIP has too many entries for ZIP32");
  assert.equal(new Set(entries.map(({ name }) => name)).size, entries.length, "Duplicate ZIP entry");

  const localParts = [];
  const records = [];
  let localOffset = 0;

  for (const entry of entries) {
    assert.ok(entry.nameBuffer.length > 0 && entry.nameBuffer.length <= 0xffff, "Invalid ZIP name");
    assertZip32(entry.data.length, `Runtime file ${entry.name}`);
    assertZip32(localOffset, "Runtime ZIP local header offset");

    const checksum = crc32(entry.data);
    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(ZIP_LOCAL_FILE_HEADER, 0);
    localHeader.writeUInt16LE(ZIP_VERSION, 4);
    localHeader.writeUInt16LE(ZIP_UTF8_FLAG, 6);
    localHeader.writeUInt16LE(ZIP_STORE_METHOD, 8);
    localHeader.writeUInt16LE(ZIP_DOS_TIME, 10);
    localHeader.writeUInt16LE(ZIP_DOS_DATE, 12);
    localHeader.writeUInt32LE(checksum, 14);
    localHeader.writeUInt32LE(entry.data.length, 18);
    localHeader.writeUInt32LE(entry.data.length, 22);
    localHeader.writeUInt16LE(entry.nameBuffer.length, 26);
    localHeader.writeUInt16LE(0, 28);

    localParts.push(localHeader, entry.nameBuffer, entry.data);
    records.push({ ...entry, checksum, localOffset });
    localOffset += localHeader.length + entry.nameBuffer.length + entry.data.length;
  }

  const centralOffset = localOffset;
  const centralParts = [];
  let centralSize = 0;

  for (const record of records) {
    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(ZIP_CENTRAL_DIRECTORY_HEADER, 0);
    centralHeader.writeUInt16LE(ZIP_VERSION_MADE_BY_UNIX, 4);
    centralHeader.writeUInt16LE(ZIP_VERSION, 6);
    centralHeader.writeUInt16LE(ZIP_UTF8_FLAG, 8);
    centralHeader.writeUInt16LE(ZIP_STORE_METHOD, 10);
    centralHeader.writeUInt16LE(ZIP_DOS_TIME, 12);
    centralHeader.writeUInt16LE(ZIP_DOS_DATE, 14);
    centralHeader.writeUInt32LE(record.checksum, 16);
    centralHeader.writeUInt32LE(record.data.length, 20);
    centralHeader.writeUInt32LE(record.data.length, 24);
    centralHeader.writeUInt16LE(record.nameBuffer.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(ZIP_FILE_MODE, 38);
    centralHeader.writeUInt32LE(record.localOffset, 42);

    centralParts.push(centralHeader, record.nameBuffer);
    centralSize += centralHeader.length + record.nameBuffer.length;
  }

  assertZip32(centralOffset, "Runtime ZIP central directory offset");
  assertZip32(centralSize, "Runtime ZIP central directory size");

  const endRecord = Buffer.alloc(22);
  endRecord.writeUInt32LE(ZIP_END_OF_CENTRAL_DIRECTORY, 0);
  endRecord.writeUInt16LE(0, 4);
  endRecord.writeUInt16LE(0, 6);
  endRecord.writeUInt16LE(records.length, 8);
  endRecord.writeUInt16LE(records.length, 10);
  endRecord.writeUInt32LE(centralSize, 12);
  endRecord.writeUInt32LE(centralOffset, 16);
  endRecord.writeUInt16LE(0, 20);

  return Buffer.concat([...localParts, ...centralParts, endRecord]);
}

export function parseAndValidateZip(zipBuffer, expectedNames) {
  if (zipBuffer.length < 22) {
    throw new Error("Runtime ZIP is shorter than its end record");
  }

  const endOffset = zipBuffer.length - 22;
  assert.equal(
    zipBuffer.readUInt32LE(endOffset),
    ZIP_END_OF_CENTRAL_DIRECTORY,
    "Runtime ZIP must end with one un-commented central directory record"
  );
  assert.equal(zipBuffer.readUInt16LE(endOffset + 4), 0, "Multi-disk ZIP is not allowed");
  assert.equal(zipBuffer.readUInt16LE(endOffset + 6), 0, "Multi-disk ZIP is not allowed");

  const diskEntryCount = zipBuffer.readUInt16LE(endOffset + 8);
  const entryCount = zipBuffer.readUInt16LE(endOffset + 10);
  const centralSize = zipBuffer.readUInt32LE(endOffset + 12);
  const centralOffset = zipBuffer.readUInt32LE(endOffset + 16);
  const commentLength = zipBuffer.readUInt16LE(endOffset + 20);

  assert.equal(diskEntryCount, entryCount, "All ZIP entries must be on one disk");
  assert.equal(entryCount, expectedNames.length, "Runtime ZIP entry count differs from contract");
  assert.equal(commentLength, 0, "Runtime ZIP must not have a comment");
  assert.equal(
    centralOffset + centralSize,
    endOffset,
    "Runtime ZIP central directory has an invalid range"
  );

  const records = [];
  let cursor = centralOffset;

  for (let index = 0; index < entryCount; index += 1) {
    assertReadableRange(zipBuffer, cursor, 46, "central directory header");
    assert.equal(
      zipBuffer.readUInt32LE(cursor),
      ZIP_CENTRAL_DIRECTORY_HEADER,
      "Invalid central directory signature"
    );
    assert.equal(zipBuffer.readUInt16LE(cursor + 4), ZIP_VERSION_MADE_BY_UNIX);
    assert.equal(zipBuffer.readUInt16LE(cursor + 6), ZIP_VERSION);
    assert.equal(zipBuffer.readUInt16LE(cursor + 8), ZIP_UTF8_FLAG);
    assert.equal(zipBuffer.readUInt16LE(cursor + 10), ZIP_STORE_METHOD);
    assert.equal(zipBuffer.readUInt16LE(cursor + 12), ZIP_DOS_TIME);
    assert.equal(zipBuffer.readUInt16LE(cursor + 14), ZIP_DOS_DATE);

    const checksum = zipBuffer.readUInt32LE(cursor + 16);
    const compressedSize = zipBuffer.readUInt32LE(cursor + 20);
    const uncompressedSize = zipBuffer.readUInt32LE(cursor + 24);
    const nameLength = zipBuffer.readUInt16LE(cursor + 28);
    const extraLength = zipBuffer.readUInt16LE(cursor + 30);
    const entryCommentLength = zipBuffer.readUInt16LE(cursor + 32);
    const startDisk = zipBuffer.readUInt16LE(cursor + 34);
    const internalAttributes = zipBuffer.readUInt16LE(cursor + 36);
    const externalAttributes = zipBuffer.readUInt32LE(cursor + 38);
    const localHeaderOffset = zipBuffer.readUInt32LE(cursor + 42);

    assert.equal(compressedSize, uncompressedSize, "Stored ZIP entry has inconsistent sizes");
    assert.equal(extraLength, 0, "Runtime ZIP entries must not have extra fields");
    assert.equal(entryCommentLength, 0, "Runtime ZIP entries must not have comments");
    assert.equal(startDisk, 0, "Multi-disk ZIP is not allowed");
    assert.equal(internalAttributes, 0);
    assert.equal(externalAttributes, ZIP_FILE_MODE);

    const nameOffset = cursor + 46;
    assertReadableRange(zipBuffer, nameOffset, nameLength, "central directory entry name");
    const nameBuffer = zipBuffer.subarray(nameOffset, nameOffset + nameLength);
    const name = nameBuffer.toString("utf8");
    assert.ok(Buffer.from(name, "utf8").equals(nameBuffer), "ZIP entry name is not valid UTF-8");

    records.push({
      name,
      checksum,
      compressedSize,
      uncompressedSize,
      localHeaderOffset
    });
    cursor = nameOffset + nameLength;
  }

  assert.equal(cursor, endOffset, "Runtime ZIP contains unexpected central directory data");
  assert.deepEqual(
    records.map(({ name }) => name),
    expectedNames,
    "Runtime ZIP contains unexpected or incorrectly ordered entries"
  );

  let expectedLocalOffset = 0;
  const extractedEntries = [];

  for (const record of records) {
    const cursor = record.localHeaderOffset;
    assert.equal(cursor, expectedLocalOffset, "Runtime ZIP has hidden data between entries");
    assertReadableRange(zipBuffer, cursor, 30, "local file header");
    assert.equal(zipBuffer.readUInt32LE(cursor), ZIP_LOCAL_FILE_HEADER, "Invalid local header");
    assert.equal(zipBuffer.readUInt16LE(cursor + 4), ZIP_VERSION);
    assert.equal(zipBuffer.readUInt16LE(cursor + 6), ZIP_UTF8_FLAG);
    assert.equal(zipBuffer.readUInt16LE(cursor + 8), ZIP_STORE_METHOD);
    assert.equal(zipBuffer.readUInt16LE(cursor + 10), ZIP_DOS_TIME);
    assert.equal(zipBuffer.readUInt16LE(cursor + 12), ZIP_DOS_DATE);
    assert.equal(zipBuffer.readUInt32LE(cursor + 14), record.checksum);
    assert.equal(zipBuffer.readUInt32LE(cursor + 18), record.compressedSize);
    assert.equal(zipBuffer.readUInt32LE(cursor + 22), record.uncompressedSize);

    const nameLength = zipBuffer.readUInt16LE(cursor + 26);
    const extraLength = zipBuffer.readUInt16LE(cursor + 28);
    assert.equal(extraLength, 0, "Runtime ZIP local entries must not have extra fields");

    const nameOffset = cursor + 30;
    assertReadableRange(zipBuffer, nameOffset, nameLength, "local entry name");
    assert.equal(zipBuffer.subarray(nameOffset, nameOffset + nameLength).toString("utf8"), record.name);

    const dataOffset = nameOffset + nameLength;
    assertReadableRange(zipBuffer, dataOffset, record.compressedSize, "stored entry data");
    const data = zipBuffer.subarray(dataOffset, dataOffset + record.compressedSize);
    assert.equal(crc32(data), record.checksum, `CRC-32 mismatch for ${record.name}`);

    expectedLocalOffset = dataOffset + record.compressedSize;
    extractedEntries.push({ name: record.name, data });
  }

  assert.equal(expectedLocalOffset, centralOffset, "Runtime ZIP has hidden local data");
  return extractedEntries;
}

export function assertSafeArchivePath(root, entryName) {
  assert.ok(!entryName.includes("\\"), `Backslashes are not allowed in ZIP entry: ${entryName}`);
  const segments = entryName.split("/");
  assert.ok(
    segments.length > 1 && segments.every((segment) => segment !== "" && segment !== "." && segment !== ".."),
    `Unsafe ZIP entry path: ${entryName}`
  );

  const target = resolve(root, ...segments);
  assert.ok(target.startsWith(`${resolve(root)}${sep}`), `ZIP entry escapes extraction root: ${entryName}`);
  return target;
}

async function listExtractedTree(root, prefix = "") {
  const directoryEntries = await readdir(join(root, ...prefix.split("/").filter(Boolean)), {
    withFileTypes: true
  });
  directoryEntries.sort((left, right) => Buffer.compare(Buffer.from(left.name), Buffer.from(right.name)));

  const results = [];
  for (const directoryEntry of directoryEntries) {
    const relativeName = prefix ? `${prefix}/${directoryEntry.name}` : directoryEntry.name;
    if (directoryEntry.isDirectory()) {
      results.push(`${relativeName}/`);
      results.push(...(await listExtractedTree(root, relativeName)));
    } else if (directoryEntry.isFile()) {
      results.push(relativeName);
    } else {
      throw new Error(`Unexpected extracted filesystem entry: ${relativeName}`);
    }
  }
  return results;
}

async function validateReleaseArtifact({
  zipPath,
  checksumPath,
  zipName,
  versionDirectory,
  expectedManifest,
  expectedManifestBuffer,
  runtimeFiles
}) {
  const zipBuffer = await readFile(zipPath);
  const expectedZipHash = sha256(zipBuffer);
  const checksumContents = await readFile(checksumPath, "utf8");
  assert.equal(
    checksumContents,
    `${expectedZipHash}  ${zipName}\n`,
    "ZIP checksum file does not match the generated archive"
  );

  const expectedNames = [
    `${versionDirectory}/loader.js`,
    `${versionDirectory}/manifest.json`,
    `${versionDirectory}/site-widget.esm.js`
  ];
  const entries = parseAndValidateZip(zipBuffer, expectedNames);

  const extractionRoot = await mkdtemp(join(tmpdir(), "granit-site-widget-runtime-"));
  try {
    for (const entry of entries) {
      const targetPath = assertSafeArchivePath(extractionRoot, entry.name);
      await mkdir(dirname(targetPath), { recursive: true });
      await writeFile(targetPath, entry.data, { flag: "wx" });
    }

    assert.deepEqual(await listExtractedTree(extractionRoot), [
      `${versionDirectory}/`,
      `${versionDirectory}/loader.js`,
      `${versionDirectory}/manifest.json`,
      `${versionDirectory}/site-widget.esm.js`
    ]);

    const extractedManifestPath = join(extractionRoot, versionDirectory, "manifest.json");
    const extractedManifestBuffer = await readFile(extractedManifestPath);
    assert.ok(
      extractedManifestBuffer.equals(expectedManifestBuffer),
      "Extracted manifest bytes differ from generated manifest"
    );
    assert.deepEqual(JSON.parse(extractedManifestBuffer.toString("utf8")), expectedManifest);

    for (const [fileName, sourceData] of runtimeFiles) {
      const extractedData = await readFile(join(extractionRoot, versionDirectory, fileName));
      assert.ok(extractedData.equals(sourceData), `Extracted ${fileName} differs from dist/${fileName}`);
      assert.equal(
        sha256(extractedData),
        expectedManifest.files[fileName].sha256,
        `SHA-256 mismatch for extracted ${fileName}`
      );
    }
  } finally {
    await rm(extractionRoot, { recursive: true, force: true });
  }

  return expectedZipHash;
}

function parseArguments(args) {
  if (args.length === 0) return { allowDirtyRuntime: false };
  if (args.length === 1 && args[0] === "--allow-dirty-runtime") {
    return { allowDirtyRuntime: true };
  }
  throw new Error(
    "Usage: node scripts/build-runtime-release.mjs [--allow-dirty-runtime]\n" +
      "The override is for development validation only and never produces a release candidate."
  );
}

async function main(args) {
  const { allowDirtyRuntime } = parseArguments(args);
  const packageMetadata = await readPackageMetadata();
  const builderScriptBytes = await readFile(builderScriptPath);
  const gitCommit = readGitCommit();
  const runtimeFiles = new Map();

  for (const fileName of runtimeFileNames) {
    runtimeFiles.set(fileName, await readRuntimeFile(fileName));
  }

  const releaseInputs = new Map([
    ["package.json", packageMetadata.sourceBytes],
    ["scripts/build-runtime-release.mjs", builderScriptBytes],
    ...[...runtimeFiles].map(([fileName, data]) => [`dist/${fileName}`, data])
  ]);
  const dirtyReleaseInputs = findDirtyReleaseInputs(releaseInputs);
  if (dirtyReleaseInputs.length > 0 && !allowDirtyRuntime) {
    throw new Error(
      [
        "Runtime release refused because release inputs differ from HEAD:",
        ...dirtyReleaseInputs.map((fileName) => `  - ${fileName}`),
        "Commit all release inputs and rebuild the runtime before creating an RC.",
        "For development validation only, use --allow-dirty-runtime; that artifact is not an RC."
      ].join("\n")
    );
  }

  const manifest = {
    packageName: packageMetadata.name,
    version: packageMetadata.version,
    gitCommit,
    ...(allowDirtyRuntime ? { dirtyRuntime: true } : {}),
    files: Object.fromEntries(
      [...runtimeFiles].map(([fileName, data]) => [fileName, { sha256: sha256(data) }])
    )
  };
  const manifestBuffer = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  const versionDirectory = `v${packageMetadata.version}`;
  const zipName = `granit-site-widget-v${packageMetadata.version}.zip`;
  const zipPath = join(artifactsDirectory, zipName);
  const checksumPath = `${zipPath}.sha256`;

  const zipBuffer = createDeterministicZip([
    ...[...runtimeFiles].map(([fileName, data]) => ({
      name: `${versionDirectory}/${fileName}`,
      data
    })),
    { name: `${versionDirectory}/manifest.json`, data: manifestBuffer }
  ]);

  await mkdir(artifactsDirectory, { recursive: true });
  await writeFile(zipPath, zipBuffer);
  const zipHash = sha256(zipBuffer);
  await writeFile(checksumPath, `${zipHash}  ${zipName}\n`, "utf8");

  const validatedZipHash = await validateReleaseArtifact({
    zipPath,
    checksumPath,
    zipName,
    versionDirectory,
    expectedManifest: manifest,
    expectedManifestBuffer: manifestBuffer,
    runtimeFiles
  });
  assert.equal(validatedZipHash, zipHash);

  process.stdout.write(
    [
      ...(allowDirtyRuntime
        ? [
            "DEVELOPMENT ARTIFACT ONLY: --allow-dirty-runtime was used; manifest.dirtyRuntime=true.",
            "This output is NOT a release candidate."
          ]
        : []),
      `Created and validated ${zipPath}`,
      `SHA-256 ${zipHash}`,
      `Checksum ${checksumPath}`,
      `Entries v${packageMetadata.version}/{loader.js,manifest.json,site-widget.esm.js}`
    ].join("\n") + "\n"
  );
}

const invokedScriptPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (invokedScriptPath === fileURLToPath(import.meta.url)) {
  await main(process.argv.slice(2));
}
