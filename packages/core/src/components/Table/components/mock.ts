export const dataForTableSorting = Array.from({ length: 10 }).map(
  (_, index) => ({
    title: `title ${index + 1}`,
    value: `value ${index + 1}`,
    description: `description ${index + 1}`,
  }),
);

export type DataRow = (typeof dataForTableSorting)[0];
export type RowKeys = keyof DataRow;
export type RowKeysArray = ['title', 'value', 'description'];
export type SortInfo =
  | {
      column: RowKeys;
      order: 'asc' | 'desc';
    }
  | Record<string, never>;

export const headers = Object.keys(
  dataForTableSorting[0],
) as unknown as RowKeysArray;

export const defaultSort: SortInfo = {
  column: 'value',
  order: 'desc',
};
