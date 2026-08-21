/**
 * Shared treatment for "disabled but still on" form controls.
 *
 * Switch and Checkbox both have an active state that carries meaning — a
 * locked-on toggle, a checked-but-read-only box. Flattening those to grey when
 * disabled throws that meaning away, so instead we keep the control's own
 * colour and mute it with the overlay below.
 *
 * Why an overlay and not `opacity`:
 * - `opacity` is a group operation, so it dims the state glyph (the Switch
 *   knob, the Checkbox tick) along with the surface behind it — and the glyph
 *   is the very cue we are trying to preserve.
 * - `opacity` composites against the page, so the result shifts with whatever
 *   surface the control sits on. The overlay sits on the control's own colour,
 *   so it does not.
 *
 * The overlay must paint above the coloured surface and below the glyph. Each
 * component wires that up itself, since their stacking differs.
 */
export const DISABLED_SURFACE_OVERLAY = 'rgba(255, 255, 255, 0.45)';
