/**
 * Geometry shared by every bordered form control (Input, Dropdown, Typeahead,
 * DatePicker, DateRangePicker, FileUpload, Field.Control, ...).
 *
 * Fields placed side by side in one row only line up when they agree on these
 * numbers, so each control reads them from here rather than keeping its own
 * copy. Change a value once and every field moves with it.
 *
 * The height is the outer height, border included. Pair it with
 * `box-sizing: border-box` (`FIELD_CONTROL_BOX_SIZING`): the global
 * `* { box-sizing }` reset is not guaranteed to load in a consuming app, and
 * under `content-box` the 1px border adds 2px to the outer height.
 */
export const FIELD_CONTROL_HEIGHT = 44;
export const FIELD_CONTROL_RADIUS = 12;
export const FIELD_CONTROL_BORDER_WIDTH = 1;
export const FIELD_CONTROL_BOX_SIZING = 'border-box';

/** Gap between a field's label and its control. */
export const FIELD_LABEL_GAP = 6;
/** Label line height; label block = line height + gap = 24px. */
export const FIELD_LABEL_LINE_HEIGHT = 18;

/**
 * Prop that styled field parts take to switch to the `fieldGeometryV2` rules.
 * The owning component reads `useFeatureFlag('fieldGeometryV2')` and passes it
 * down, since styled templates cannot call hooks.
 */
export interface FieldGeometryProps {
  fieldGeometryV2?: boolean;
}

/**
 * `shouldForwardProp` for styled wrappers of *components* (not DOM tags, where
 * Emotion already drops unknown props): keeps `fieldGeometryV2` from reaching
 * the wrapped component and, through it, the DOM.
 */
export const withoutFieldGeometryProp = (prop: string) =>
  prop !== 'fieldGeometryV2' && prop !== 'theme';

/**
 * Border-box sizing, so the 1px border sits inside the 44px. Only under
 * `fieldGeometryV2`: without it bordered controls keep their pre-3.27.2
 * content-box height.
 */
export const fieldGeometryBoxSizing = ({
  fieldGeometryV2,
}: FieldGeometryProps) =>
  fieldGeometryV2 ? `box-sizing: ${FIELD_CONTROL_BOX_SIZING};` : '';
