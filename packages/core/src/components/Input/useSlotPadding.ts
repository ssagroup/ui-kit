import { RefObject, useLayoutEffect, useState } from 'react';

/** Distance from the input edge to the slot (matches `left`/`right` in styles). */
const SLOT_OFFSET = 14;
/** Space between the slot content and the typed text. */
const SLOT_GAP = 8;
/** Historical fixed padding; anything that already fit inside it keeps it. */
export const MIN_SLOT_PADDING = 40;

/**
 * Returns the input padding needed to keep typed text clear of an absolutely
 * positioned start/end slot. Content that fit the historical 40px (icons up
 * to 26px) keeps it, so existing layouts don't shift; wider content (e.g. a
 * text action button) grows the padding to fit, plus a gap.
 */
export const useSlotPadding = (
  ref: RefObject<HTMLElement | null>,
  hasSlot: boolean,
): number | undefined => {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!hasSlot || !el) {
      return;
    }
    const measure = () => setWidth(Math.ceil(el.offsetWidth));
    measure();
    if (typeof ResizeObserver === 'undefined') {
      return;
    }
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, hasSlot]);

  if (!hasSlot) {
    return undefined;
  }
  if (SLOT_OFFSET + width <= MIN_SLOT_PADDING) {
    return MIN_SLOT_PADDING;
  }
  return SLOT_OFFSET + width + SLOT_GAP;
};
