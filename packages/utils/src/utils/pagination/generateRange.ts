import { GenerateRangeFn } from './types';

/**
 * The function that returns an array of page numbers to show in the pagination
 * component.
 *
 * Rules:
 * - To always show the 1st and the last page.
 * - To show one item before and one item after the selected page.
 * - To return "-1" for the skipped items. This is to be able to display "..." in
 * the pagination component.
 * */
const SKIPPED_ITEMS_DELTA = 2;

const getSelectedRange = (pagesCount, selectedPage) => {
  const range: number[] = [];

  if (selectedPage !== pagesCount) {
    range.push(selectedPage);
  }

  if (selectedPage > 1) {
    range.unshift(selectedPage - 1);
  }

  if (selectedPage + 1 < pagesCount) {
    range.push(selectedPage + 1);
  }

  return range;
};

const fill = (range, minValue, maxValue) => {
  for (let i = minValue; i < maxValue; ++i) {
    range.push(i);
  }
};

const generateRange: GenerateRangeFn = (pagesCount, selectedPage) => {
  if (pagesCount == null || !Number.isInteger(pagesCount)) {
    throw new Error('Pages count should be an integer');
  }

  if (pagesCount <= 0) {
    return [];
  }

  let range = [1];

  if (pagesCount === 1) {
    return range;
  }

  if (selectedPage != null && !Number.isInteger(selectedPage)) {
    throw new Error('Selected page should be an integer');
  }

  if (selectedPage != null && (selectedPage < 1 || selectedPage > pagesCount)) {
    throw new Error(`Selected page ${selectedPage} is out of range`);
  }

  if (selectedPage && selectedPage > 3) {
    const selectedRange = getSelectedRange(pagesCount, selectedPage);

    const [minSelectedRange, , maxSelectedRange] = selectedRange;

    if (minSelectedRange - SKIPPED_ITEMS_DELTA > 1) {
      range.push(-1);
    } else {
      fill(range, 2, minSelectedRange);
    }

    range = range.concat(selectedRange);

    if (pagesCount - maxSelectedRange > SKIPPED_ITEMS_DELTA) {
      range.push(-1);
    } else {
      fill(range, maxSelectedRange + 1, pagesCount);
    }
  } else if (pagesCount <= 5) {
    fill(range, 2, pagesCount);
  } else {
    range.push(2, 3, -1);
  }

  range.push(pagesCount);

  return range;
};

export default generateRange;
