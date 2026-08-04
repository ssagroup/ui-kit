import type { TypeaheadProps } from '@components/Typeahead/types';

/**
 * Props that need special handling (computed from RJSF state) or are RJSF-controlled
 * These are extracted explicitly and NOT spread
 *
 * The deprecated spellings (`selectedItems`, `isDisabled`) stay on the list
 * alongside their replacements: a `uiSchema` written before the rename would
 * otherwise pass its filter and land on `Typeahead` through the spread, where
 * it would take over whenever the RJSF-computed `value` / `disabled` happened
 * to be undefined.
 */
export type SelectWidgetNonSpreadableProps =
  | 'name'
  | 'onChange'
  | 'onClearAll'
  | 'onRemoveSelectedClick'
  | 'onEmptyChange'
  | 'value'
  | 'selectedItems'
  | 'isMultiple'
  | 'disabled'
  | 'isDisabled'
  | 'placeholder'
  | 'renderOption'
  | 'children';

/**
 * Props that can be automatically spread from uiOptions
 * New props added to TypeaheadProps will automatically be included here
 */
export type SelectWidgetSpreadableFromUiOptions = Omit<
  TypeaheadProps,
  SelectWidgetNonSpreadableProps
>;

/**
 * Extract props that can be spread automatically from uiOptions
 * Filters out props that need special handling or are computed from RJSF state
 */
export const extractSelectWidgetSpreadableProps = (
  uiOptions: Record<string, unknown>,
): Partial<SelectWidgetSpreadableFromUiOptions> => {
  const propsToExclude = [
    'name',
    'onChange',
    'onClearAll',
    'onRemoveSelectedClick',
    'onEmptyChange',
    'value',
    'selectedItems', // deprecated alias of `value`
    'isMultiple',
    'disabled',
    'isDisabled', // deprecated alias of `disabled`
    'placeholder',
    'renderOption',
    'children',
    'typeaheadAvatarSize', // Handled separately for avatar rendering
  ];
  const result: Record<string, unknown> = {};

  Object.entries(uiOptions).forEach(([key, value]) => {
    if (!propsToExclude.includes(key) && value !== undefined) {
      result[key] = value;
    }
  });

  return result as Partial<SelectWidgetSpreadableFromUiOptions>;
};
