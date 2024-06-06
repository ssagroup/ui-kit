export const path =
  <T extends Record<string | number, any>>(path: Array<string | number>) =>
  (obj: T): unknown =>
    path.reduce((prev, curr: string | number) => prev?.[curr], obj);
