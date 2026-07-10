import { describe, expect, it } from "vitest";
import {
  MAX_IMAGE_BYTES,
  MAX_IMAGE_COUNT,
  MAX_IMAGE_PIXELS,
  MAX_TOTAL_IMAGE_BYTES,
  detectImageMime,
  formatImageValidationMessage,
  planImageBatch,
  validateDeclaredMime,
  validateImageLimits,
  validateImagePixelLimit
} from "../src/domain/image-attachments";

const MIB = 1024 * 1024;

describe("image attachment validation", () => {
  it("defines the approved count, byte and pixel limits", () => {
    expect(MAX_IMAGE_COUNT).toBe(3);
    expect(MAX_IMAGE_BYTES).toBe(5 * MIB);
    expect(MAX_TOTAL_IMAGE_BYTES).toBe(15 * MIB);
    expect(MAX_IMAGE_PIXELS).toBe(24_000_000);
  });

  it.each([
    ["image/jpeg", [0xff, 0xd8, 0xff, 0xe0]],
    ["image/png", [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
    ["image/webp", [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50]]
  ] as const)("detects %s from its complete signature", (expected, signature) => {
    expect(detectImageMime(Uint8Array.from(signature))).toBe(expected);
  });

  it("requires the complete PNG and WebP signatures", () => {
    expect(detectImageMime(Uint8Array.from([0x89, 0x50, 0x4e, 0x47]))).toBeUndefined();
    expect(detectImageMime(Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x00]))).toBeUndefined();
    expect(
      detectImageMime(Uint8Array.from([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x00]))
    ).toBeUndefined();
  });

  it.each([
    ["SVG", [0x3c, 0x73, 0x76, 0x67]],
    ["GIF", [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]],
    ["PDF", [0x25, 0x50, 0x44, 0x46]],
    ["ZIP", [0x50, 0x4b, 0x03, 0x04]],
    ["HEIC", [0, 0, 0, 0x18, 0x66, 0x74, 0x79, 0x70, 0x68, 0x65, 0x69, 0x63]],
    ["random bytes", [0xde, 0xad, 0xbe, 0xef]]
  ] as const)("rejects %s bytes", (_label, signature) => {
    expect(detectImageMime(Uint8Array.from(signature))).toBeUndefined();
  });

  it("allows an empty declared MIME but rejects spoofed or unsupported MIME values", () => {
    expect(validateDeclaredMime("", "image/png")).toBe(true);
    expect(validateDeclaredMime(undefined, "image/webp")).toBe(true);
    expect(validateDeclaredMime(" IMAGE/JPEG ", "image/jpeg")).toBe(true);
    expect(validateDeclaredMime("image/png", "image/jpeg")).toBe(false);
    expect(validateDeclaredMime("image/gif", "image/png")).toBe(false);
    expect(validateDeclaredMime("", undefined)).toBe(false);
  });

  it("accepts exactly 5 MiB and rejects one byte more", () => {
    expect(validateImageLimits({ sizeBytes: MAX_IMAGE_BYTES }, [])).toBeUndefined();
    expect(validateImageLimits({ sizeBytes: MAX_IMAGE_BYTES + 1 }, [])).toMatchObject({
      code: "image_too_large",
      maxBytes: MAX_IMAGE_BYTES,
      actualBytes: MAX_IMAGE_BYTES + 1
    });
  });

  it("accepts the third image and rejects the fourth", () => {
    const existing = [{ sizeBytes: 1 }, { sizeBytes: 1 }];
    expect(validateImageLimits({ sizeBytes: 1 }, existing)).toBeUndefined();
    expect(validateImageLimits({ sizeBytes: 1 }, [...existing, { sizeBytes: 1 }])).toMatchObject({
      code: "too_many_images",
      maxCount: MAX_IMAGE_COUNT
    });
  });

  it("accepts exactly 15 MiB total and rejects one byte more", () => {
    const twoMaximumImages = [{ sizeBytes: MAX_IMAGE_BYTES }, { sizeBytes: MAX_IMAGE_BYTES }];
    expect(validateImageLimits({ sizeBytes: MAX_IMAGE_BYTES }, twoMaximumImages)).toBeUndefined();

    const existingOverTenMiB = [{ sizeBytes: MAX_IMAGE_BYTES }, { sizeBytes: MAX_IMAGE_BYTES + 1 }];
    expect(validateImageLimits({ sizeBytes: MAX_IMAGE_BYTES }, existingOverTenMiB)).toMatchObject({
      code: "total_too_large",
      maxBytes: MAX_TOTAL_IMAGE_BYTES,
      actualBytes: MAX_TOTAL_IMAGE_BYTES + 1
    });
  });

  it("accepts exactly 24 million decoded pixels and rejects more", () => {
    expect(validateImagePixelLimit(6_000, 4_000)).toBeUndefined();
    expect(validateImagePixelLimit(6_001, 4_000)).toMatchObject({
      code: "too_many_pixels",
      maxPixels: MAX_IMAGE_PIXELS,
      actualPixels: 24_004_000
    });
  });

  it("partially accepts a batch without charging rejected files against later candidates", () => {
    const candidates = [
      { id: "first", sizeBytes: MIB },
      { id: "oversized", sizeBytes: MAX_IMAGE_BYTES + 1 },
      { id: "second", sizeBytes: MIB },
      { id: "third", sizeBytes: MIB },
      { id: "fourth", sizeBytes: MIB }
    ];

    const plan = planImageBatch(candidates, []);

    expect(plan.accepted.map((candidate) => candidate.id)).toEqual(["first", "second", "third"]);
    expect(plan.rejections.map(({ candidate, error }) => [candidate.id, error.code])).toEqual([
      ["oversized", "image_too_large"],
      ["fourth", "too_many_images"]
    ]);
  });

  it("formats all batch rejection reasons as one concise message", () => {
    const plan = planImageBatch(
      [
        { id: "first", sizeBytes: MIB },
        { id: "oversized", sizeBytes: MAX_IMAGE_BYTES + 1 },
        { id: "second", sizeBytes: MIB },
        { id: "third", sizeBytes: MIB },
        { id: "fourth", sizeBytes: MIB }
      ],
      []
    );

    expect(formatImageValidationMessage(plan.rejections)).toBe(
      "Некоторые фото не добавлены: размер одного фото превышает 5 МБ; можно добавить не более 3 фото."
    );
    expect(formatImageValidationMessage([])).toBe("");
  });
});
