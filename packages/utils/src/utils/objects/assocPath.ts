type AssocPathValue = string | number | boolean | null;
interface AssocPath {
  [key: string | number]: AssocPathValue | AssocPath;
}

type AssocPathFunction = (
  path: string[],
  value: AssocPathValue,
) => (obj: AssocPath) => AssocPath;

export const assocPath: AssocPathFunction =
  ([first, ...rest], value) =>
  (obj = {}) => ({
    ...obj,
    [first]: rest.length
      ? assocPath(rest, value)(obj[first] as AssocPath)
      : value,
  });
