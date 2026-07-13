export declare const MAX_IMAGE_COUNT = 3;
export declare const MAX_IMAGE_BYTES: number;
export declare const MAX_TOTAL_IMAGE_BYTES: number;
export declare const MAX_IMAGE_PIXELS = 24000000;
export type AllowedImageMime = "image/jpeg" | "image/png" | "image/webp";
export type ImageLimitCandidate = {
    sizeBytes: number;
};
export type ImageValidationError = {
    code: "invalid_image_size";
    actualBytes: number;
} | {
    code: "too_many_images";
    maxCount: number;
    actualCount: number;
} | {
    code: "image_too_large";
    maxBytes: number;
    actualBytes: number;
} | {
    code: "total_too_large";
    maxBytes: number;
    actualBytes: number;
} | {
    code: "unsupported_image_type";
} | {
    code: "mime_mismatch";
    declaredMime: string;
    detectedMime: AllowedImageMime;
} | {
    code: "decode_failed";
} | {
    code: "invalid_image_dimensions";
    width: number;
    height: number;
} | {
    code: "too_many_pixels";
    maxPixels: number;
    actualPixels: number;
};
export type ImageValidationRejection<T> = {
    candidate: T;
    error: ImageValidationError;
};
export type ImageBatchPlan<T> = {
    accepted: readonly T[];
    rejections: readonly ImageValidationRejection<T>[];
};
/** Определяет тип только по разрешённым magic bytes, не доверяя расширению файла. */
export declare function detectImageMime(bytes: Uint8Array): AllowedImageMime | undefined;
/** Пустой browser MIME допустим, но обнаруженная сигнатура обязательна всегда. */
export declare function validateDeclaredMime(declared: string | null | undefined, detected: AllowedImageMime | undefined): boolean;
/** Проверяет лимиты для следующего кандидата относительно уже принятых фото. */
export declare function validateImageLimits(candidate: ImageLimitCandidate, existing: readonly ImageLimitCandidate[]): ImageValidationError | undefined;
/** Проверяет размер уже декодированного raster без обращения к browser decoder. */
export declare function validateImagePixelLimit(width: number, height: number): ImageValidationError | undefined;
/**
 * Планирует batch последовательно: отклонённый файл не занимает слот и не
 * расходует суммарный лимит для следующих валидных кандидатов.
 */
export declare function planImageBatch<T extends ImageLimitCandidate>(candidates: readonly T[], existing?: readonly ImageLimitCandidate[]): ImageBatchPlan<T>;
/** Собирает причины всего batch в одно объявление без повторяющихся фраз. */
export declare function formatImageValidationMessage(rejections: readonly ImageValidationRejection<unknown>[]): string;
//# sourceMappingURL=image-attachments.d.ts.map