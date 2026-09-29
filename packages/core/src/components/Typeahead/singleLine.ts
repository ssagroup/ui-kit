import { RefObject, useLayoutEffect, useState } from 'react';

/** Gap between the trigger's flex children, matches `S.TypeaheadTrigger`. */
export const SINGLE_LINE_GAP = 8;

/**
 * Room always left for the search input, so typing never pushes chips around.
 * Matches the input group's `min-width` while the popup is open.
 */
export const SINGLE_LINE_INPUT_MIN_WIDTH = 50;

/**
 * Width reserved for the hidden-items Counter before it has been rendered.
 * Matches its small size, which is a 24px circle up to two digits.
 */
export const SINGLE_LINE_COUNTER_WIDTH = 24;

/**
 * Same timing and size as the Dropdown option tooltips (#669): long enough not
 * to fire while the pointer is travelling across, capped so a long label does
 * not produce an unreadably wide tooltip.
 */
export const LABEL_TOOLTIP_DELAY = 1000;
export const LABEL_TOOLTIP_MAX_WIDTH = 320;

/**
 * Only a primitive is safe to repeat inside a tooltip. Rendering the same
 * element twice mounts two independent copies of it, so labels made of
 * components get no tooltip.
 */
export const asText = (value: unknown): string | number | undefined =>
  typeof value === 'string' || typeof value === 'number' ? value : undefined;

/**
 * How many chips, taken in order, fit into `available` pixels, reserving room
 * for the hidden-items counter whenever at least one chip is left out.
 *
 * Never returns less than 1 while there are chips: a single chip that is too
 * wide on its own is shown truncated rather than replaced by a bare counter.
 */
export const getVisibleCount = (
  chipWidths: number[],
  available: number,
  gap = SINGLE_LINE_GAP,
  counterWidth = SINGLE_LINE_COUNTER_WIDTH,
) => {
  let used = 0;
  let count = 0;
  for (let index = 0; index < chipWidths.length; index++) {
    const next = used + (index > 0 ? gap : 0) + chipWidths[index];
    const hasHidden = index < chipWidths.length - 1;
    const needed = next + (hasHidden ? gap + counterWidth : 0);
    // Sub-pixel slack so fractional widths do not drop a chip that fits.
    if (needed > available + 0.5) {
      break;
    }
    used = next;
    count++;
  }
  return chipWidths.length ? Math.max(1, count) : 0;
};

const getWidth = (element: Element) => element.getBoundingClientRect().width;

/**
 * Measures how many selected chips fit on the trigger's single line.
 *
 * The line width is read as row + gap + input group: the input group grows to
 * fill whatever the row leaves, so their sum is the line regardless of icons or
 * paddings on the trigger. Chips beyond the current count are rendered out of
 * flow (but laid out), so their natural widths are always measurable.
 *
 * Returns `Infinity` until the first real measurement, so an element that is
 * not laid out (hidden, or jsdom) shows every chip instead of collapsing to one.
 */
export const useVisibleCount = ({
  enabled,
  rowRef,
  inputGroupRef,
  selectedCount,
  deps,
}: {
  enabled: boolean;
  rowRef: RefObject<HTMLElement | null>;
  inputGroupRef: RefObject<HTMLElement | null>;
  selectedCount: number;
  deps: unknown[];
}) => {
  const [visibleCount, setVisibleCount] = useState(Infinity);
  // Re-measured whenever this changes: the counter mounts, unmounts or changes
  // its label, and the fit decision has to use its real width. Settles after
  // one extra pass, since an unchanged count is a no-op state update.
  const hiddenCount = Math.max(0, selectedCount - visibleCount);

  useLayoutEffect(() => {
    const row = rowRef.current;
    const inputGroup = inputGroupRef.current;
    if (!enabled || !row || !inputGroup) {
      return;
    }

    const measure = () => {
      // line = row + gap + input group, and the row may take all of it except
      // the gap and the input's reserved minimum.
      const rowAndInput = getWidth(row) + getWidth(inputGroup);
      const chips = Array.from(
        row.querySelectorAll(':scope > [data-typeahead-chip]'),
      );
      if (!chips.length || rowAndInput <= 0) {
        return;
      }
      const available = rowAndInput - SINGLE_LINE_INPUT_MIN_WIDTH;
      // The counter grows past a circle at "99+", so use its real width once
      // it is on screen.
      const counter = row.querySelector(':scope > [data-typeahead-counter]');
      setVisibleCount(
        getVisibleCount(
          chips.map(getWidth),
          available,
          SINGLE_LINE_GAP,
          counter ? getWidth(counter) : SINGLE_LINE_COUNTER_WIDTH,
        ),
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    // The trigger's width is what changes on resize; the row and input group
    // only redistribute it.
    if (row.parentElement) {
      observer.observe(row.parentElement);
    }
    return () => observer.disconnect();
  }, [enabled, hiddenCount, ...deps]);

  return enabled ? visibleCount : Infinity;
};
