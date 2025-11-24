import 'reflect-metadata';

export const createFilterClass = <T>(keys: (keyof T)[]) => {
  class FilterDto {}

  for (const key of keys) {
    Reflect.defineMetadata('design:type', Object, FilterDto.prototype, key as string);
    Object.defineProperty(FilterDto.prototype, key, {
      enumerable: true,
      writable: true,
      value: true,
    });
  }

  return FilterDto;
};
