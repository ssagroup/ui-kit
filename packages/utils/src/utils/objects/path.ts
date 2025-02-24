export const path =
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  <T extends Record<string | number, any>, R = unknown>(
      path: Array<string | number>,
    ) =>
    (obj: T): R =>
      path.reduce(
        (prev, curr: string | number) => prev?.[curr],
        obj,
      ) as unknown as R;
