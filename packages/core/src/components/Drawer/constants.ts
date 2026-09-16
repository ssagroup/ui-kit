/**
 * Panel padding, per the design: 24px above the header, 32px gutters.
 *
 * `DrawerHeader` and `DrawerFooter` are sticky bars that have to cover the full
 * width of the panel as content scrolls under them, so both cancel these
 * gutters with a negative margin and re-apply them as their own padding.
 * Keeping the numbers here means the bleed cannot drift from the padding it is
 * cancelling.
 */
export const PANEL_PADDING_X = 32;
export const PANEL_PADDING_TOP = 24;

/**
 * Gap between the header and the body, per the design. Applied as the header's
 * bottom padding rather than a margin so it stays opaque while the header is
 * stuck and the body scrolls beneath it.
 */
export const HEADER_GAP = 24;
