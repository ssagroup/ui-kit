/* eslint-disable @typescript-eslint/no-explicit-any */
export const prop =
  <T extends Record<string | number, any>, R = any>(propName: string) =>
  (obj: T): R =>
    obj?.[propName];
