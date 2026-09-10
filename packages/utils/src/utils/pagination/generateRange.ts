import { isNill } from '../isNill';
import { GenerateRangeFn } from './types';

const SKIPPED_ITEMS_DELTA = 2;

const getSelectedRange = (pagesCount: number, selectedPage: number) => {
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

const fill = (range: number[], minValue: number, maxValue: number) => {
  for (let i = minValue; i < maxValue; ++i) {
    range.push(i);
  }
};

/**
 * Builds the list of page numbers a paginator should display.
 *
 * Always includes the first and last page, plus one page either side of the
 * selection, and collapses the rest.
 *
 * ### `-1` marks a gap, it is not a page
 * Skipped stretches are represented by `-1`, which the caller renders as an
 * ellipsis. Render the array directly and a `-1` button appears — check for it:
 * `range.map((page) => (page === -1 ? <Ellipsis /> : <PageButton page={page} />))`.
 *
 * ### It throws on bad input rather than clamping
 * A non-integer `pagesCount` or `selectedPage`, or a selection outside
 * `1…pagesCount`, raises an `Error`. Only `pagesCount <= 0` is tolerated,
 * returning `[]`. Note pages are **1-based**, so `selectedPage: 0` throws.
 *
 * @param pagesCount - Total pages. `<= 0` yields an empty array.
 * @param selectedPage - Current page, 1-based. Omit for the unselected layout.
 *
 * @example
 * generateRange(5); // [1, 2, 3, 4, 5] — short enough to show in full
 * generateRange(10); // [1, 2, 3, -1, 10]
 *
 * @example
 * generateRange(10, 5); // [1, -1, 4, 5, 6, -1, 10] — gaps on both sides
 * generateRange(10, 10); // [1, -1, 9, 10]
 */
const generateRange: GenerateRangeFn = (pagesCount, selectedPage) => {
  if (isNill(pagesCount) || !Number.isInteger(pagesCount)) {
    throw new Error('Pages count should be an integer');
  }

  if (pagesCount <= 0) {
    return [];
  }

  let range = [1];

  if (pagesCount === 1) {
    return range;
  }

  if (!isNill(selectedPage) && !Number.isInteger(selectedPage)) {
    throw new Error('Selected page should be an integer');
  }

  if (
    !isNill(selectedPage) &&
    (selectedPage < 1 || selectedPage > pagesCount)
  ) {
    throw new Error(`Selected page ${selectedPage} is out of range`);
  }

  if (selectedPage && selectedPage > 2) {
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
