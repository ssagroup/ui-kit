export type PathValue = string | number | boolean | null;
export interface PathObject {
  [key: string | number]: PathValue | PathObject;
}

export type Has<T extends string, U extends string> =
  Exclude<U, T> extends never ? true : false;

export type MustInclude<T extends readonly string[], I extends string> =
  Has<T[number], I> extends true ? T : never;
