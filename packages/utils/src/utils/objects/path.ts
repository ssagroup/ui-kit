export const path =
  <T extends Record<string | number, any>>(path: string[]) =>
  (obj: T): unknown =>
    path.reduce((prev, curr: string | number) => prev?.[curr], obj);
