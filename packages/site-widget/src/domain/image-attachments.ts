export const MAX_IMAGE_COUNT = 3;
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const MAX_TOTAL_IMAGE_BYTES = 15 * 1024 * 1024;
export const MAX_IMAGE_PIXELS = 24_000_000;

export type AllowedImageMime = "image/jpeg" | "image/png" | "image/webp";

export type ImageLimitCandidate = {
  sizeBytes: number;
};

export type ImageValidationError =
  | { code: "invalid_image_size"; actualBytes: number }
  | { code: "too_many_images"; maxCount: number; actualCount: number }
  | { code: "image_too_large"; maxBytes: number; actualBytes: number }
  | { code: "total_too_large"; maxBytes: number; actualBytes: number }
  | { code: "unsupported_image_type" }
  | { code: "mime_mismatch"; declaredMime: string; detectedMime: AllowedImageMime }
  | { code: "decode_failed" }
  | { code: "invalid_image_dimensions"; width: number; height: number }
  | { code: "too_many_pixels"; maxPixels: number; actualPixels: number };

export type ImageValidationRejection<T> = {
  candidate: T;
  error: ImageValidationError;
};

export type ImageBatchPlan<T> = {
  accepted: readonly T[];
  rejections: readonly ImageValidationRejection<T>[];
};

const JPEG_SIGNATURE = [0xff, 0xd8, 0xff] as const;
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] as const;
const RIFF_SIGNATURE = [0x52, 0x49, 0x46, 0x46] as const;
const WEBP_SIGNATURE = [0x57, 0x45, 0x42, 0x50] as const;

/** Определяет тип только по разрешённым magic bytes, не доверяя расширению файла. */
export function detectImageMime(bytes: Uint8Array): AllowedImageMime | undefined {
  if (matchesSignature(bytes, JPEG_SIGNATURE)) return "image/jpeg";
  if (matchesSignature(bytes, PNG_SIGNATURE)) return "image/png";
  if (matchesSignature(bytes, RIFF_SIGNATURE) && matchesSignature(bytes, WEBP_SIGNATURE, 8)) return "image/webp";
  return undefined;
}

/** Пустой browser MIME допустим, но обнаруженная сигнатура обязательна всегда. */
export function validateDeclaredMime(
  declared: string | null | undefined,
  detected: AllowedImageMime | undefined
): boolean {
  if (!detected) return false;
  const normalized = String(declared ?? "").trim().toLowerCase();
  return normalized === "" || normalized === detected;
}

/** Проверяет лимиты для следующего кандидата относительно уже принятых фото. */
export function validateImageLimits(
  candidate: ImageLimitCandidate,
  existing: readonly ImageLimitCandidate[]
): ImageValidationError | undefined {
  if (!Number.isSafeInteger(candidate.sizeBytes) || candidate.sizeBytes < 0) {
    return { code: "invalid_image_size", actualBytes: candidate.sizeBytes };
  }

  const actualCount = existing.length + 1;
  if (actualCount > MAX_IMAGE_COUNT) {
    return { code: "too_many_images", maxCount: MAX_IMAGE_COUNT, actualCount };
  }

  if (candidate.sizeBytes > MAX_IMAGE_BYTES) {
    return { code: "image_too_large", maxBytes: MAX_IMAGE_BYTES, actualBytes: candidate.sizeBytes };
  }

  const actualBytes = existing.reduce((total, item) => total + item.sizeBytes, candidate.sizeBytes);
  if (actualBytes > MAX_TOTAL_IMAGE_BYTES) {
    return { code: "total_too_large", maxBytes: MAX_TOTAL_IMAGE_BYTES, actualBytes };
  }

  return undefined;
}

/** Проверяет размер уже декодированного raster без обращения к browser decoder. */
export function validateImagePixelLimit(width: number, height: number): ImageValidationError | undefined {
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width <= 0 || height <= 0) {
    return { code: "invalid_image_dimensions", width, height };
  }

  const actualPixels = width * height;
  if (!Number.isSafeInteger(actualPixels) || actualPixels > MAX_IMAGE_PIXELS) {
    return { code: "too_many_pixels", maxPixels: MAX_IMAGE_PIXELS, actualPixels };
  }

  return undefined;
}

/**
 * Планирует batch последовательно: отклонённый файл не занимает слот и не
 * расходует суммарный лимит для следующих валидных кандидатов.
 */
export function planImageBatch<T extends ImageLimitCandidate>(
  candidates: readonly T[],
  existing: readonly ImageLimitCandidate[] = []
): ImageBatchPlan<T> {
  const accepted: T[] = [];
  const rejections: ImageValidationRejection<T>[] = [];
  const acceptedForLimits: ImageLimitCandidate[] = [...existing];

  for (const candidate of candidates) {
    const error = validateImageLimits(candidate, acceptedForLimits);
    if (error) {
      rejections.push({ candidate, error });
      continue;
    }

    accepted.push(candidate);
    acceptedForLimits.push(candidate);
  }

  return { accepted, rejections };
}

/** Собирает причины всего batch в одно объявление без повторяющихся фраз. */
export function formatImageValidationMessage(
  rejections: readonly ImageValidationRejection<unknown>[]
): string {
  if (rejections.length === 0) return "";

  const reasons = [...new Set(rejections.map(({ error }) => describeValidationError(error)))];
  const prefix = rejections.length === 1 ? "Фото не добавлено" : "Некоторые фото не добавлены";
  return `${prefix}: ${reasons.join("; ")}.`;
}

function matchesSignature(bytes: Uint8Array, signature: readonly number[], offset = 0): boolean {
  if (bytes.length < offset + signature.length) return false;
  return signature.every((expected, index) => bytes[offset + index] === expected);
}

function describeValidationError(error: ImageValidationError): string {
  switch (error.code) {
    case "invalid_image_size":
      return "не удалось определить размер файла";
    case "too_many_images":
      return `можно добавить не более ${error.maxCount} фото`;
    case "image_too_large":
      return `размер одного фото превышает ${formatMebibytes(error.maxBytes)} МБ`;
    case "total_too_large":
      return `общий размер фото превышает ${formatMebibytes(error.maxBytes)} МБ`;
    case "unsupported_image_type":
      return "поддерживаются только JPEG, PNG и WebP";
    case "mime_mismatch":
      return "тип файла не совпадает с его содержимым";
    case "decode_failed":
      return "одно из изображений не удалось прочитать";
    case "invalid_image_dimensions":
      return "не удалось определить разрешение изображения";
    case "too_many_pixels":
      return "разрешение одного фото слишком большое";
  }
}

function formatMebibytes(bytes: number): string {
  return String(bytes / (1024 * 1024));
}
