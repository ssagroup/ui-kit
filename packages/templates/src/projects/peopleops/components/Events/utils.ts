export const getDateColumnWidth = ({
  photoCell = null,
  dateCell = null,
}: {
  photoCell?: HTMLTableCellElement | null;
  dateCell?: HTMLTableCellElement | null;
}) => {
  const linkElement = photoCell?.querySelector('a');
  const imgElement = photoCell?.querySelector('img');
  if (!photoCell || !dateCell || !imgElement) {
    return 0;
  }
  const photoCellCS = getComputedStyle(photoCell);
  const linkElementCS = linkElement && getComputedStyle(linkElement);
  const imgElementCS = getComputedStyle(imgElement);
  const photoCellPaddingLeft = parseInt(photoCellCS.paddingLeft, 10);
  const linkPaddingLeft = linkElementCS
    ? parseInt(linkElementCS.paddingLeft, 10)
    : 0;
  const imgMarginLeft = parseInt(imgElementCS.marginRight, 10);
  const result =
    photoCell.offsetLeft -
    dateCell.offsetLeft +
    photoCellPaddingLeft +
    linkPaddingLeft +
    imgMarginLeft;
  return result;
};
