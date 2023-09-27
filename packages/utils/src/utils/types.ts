export type PathValue = string | number | boolean | null;
export interface PathObject {
  [key: string | number]: PathValue | PathObject;
}
