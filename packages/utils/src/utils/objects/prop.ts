/* eslint-disable @typescript-eslint/no-explicit-any */
export const prop =
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  <T extends Record<string | number, any>, R = any>(propName: string) =>
    (obj: T): R =>
      obj?.[propName] as R;
