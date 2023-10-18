export const assocPath =
  <T>([first, ...rest]: string[], value: any) =>
  (sourceObject: T): T =>
    JSON.parse(
      JSON.stringify({
        ...sourceObject,
        [first]: rest.length
          ? assocPath(rest, value)((sourceObject as any)[first])
          : value,
      }),
    ) as T;
