export const assocPath =
  <T>([first, ...rest]: string[], value: unknown) =>
  (sourceObject: T): T =>
    JSON.parse(
      JSON.stringify({
        ...sourceObject,
        [first]: rest.length
          ? assocPath(rest, value)(sourceObject[first as keyof T])
          : value,
      }),
    ) as T;
