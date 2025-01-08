export const generateGridTemplateAreas = (
  areas: Array<string>,
  columnsCount = 2,
) => {
  const rows = [];
  for (let i = 0; i < areas.length; i += columnsCount) {
    const row = [];
    for (let j = i; j < i + columnsCount; j++) {
      row.push(areas[j] || '.');
    }
    rows.push(row);
  }
  const gridTemplateAreas = rows
    .map((row) => `  "${row.join(' ')}"`)
    .join('\n');
  return gridTemplateAreas;
};
