/** The cells that define the column grid — the first header row, or row one. */
export const getHeaderCells = (table: HTMLTableElement | null) => {
  const row = table?.tHead?.rows[0] ?? table?.rows[0];
  return row ? Array.from(row.cells) : [];
};
