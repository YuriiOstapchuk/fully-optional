export type None = null | undefined;
export type Optional<T> = T | None;
export type ToOptional<T extends any[]> = { [K in keyof T]: Optional<T[K]> };
