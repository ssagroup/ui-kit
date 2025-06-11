export type MutationKey = unknown[];
export type QueryKey = unknown[];

export const hashKey = (queryKey: QueryKey | MutationKey) => {
  return JSON.stringify(queryKey);
};

export function partialMatchKey(a: QueryKey, b: QueryKey): boolean;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function partialMatchKey(a: any, b: any): boolean {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    return Object.keys(b).every((key) => partialMatchKey(a[key], b[key]));
  }
  return false;
}
