export type FilterType<T> = {
  [K in keyof T]?: T[K] extends number
    ? { min?: number; max?: number }
    : T[K] extends Date
      ? { from?: string; to?: string }
      : T[K] extends boolean
        ? boolean
        : T[K] extends string
          ? string
          : never;
};
