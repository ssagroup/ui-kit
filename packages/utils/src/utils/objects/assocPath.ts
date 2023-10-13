import { PathValue } from '../types';

export const assocPath =
  <T>([first, ...rest]: string[], value: PathValue) =>
  (sourceObject: T): T =>
    JSON.parse(
      JSON.stringify({
        ...sourceObject,
        [first]: rest.length
          ? assocPath(rest, value)((sourceObject as any)[first])
          : value,
      }),
    ) as T;
