import type { TypeaheadProps } from '@components/Typeahead/types';

/**
 * Props that need special handling (computed from RJSF state) or are RJSF-controlled
 * These are extracted explicitly and NOT spread
 */
export type SelectWidgetNonSpreadableProps =
  | 'name'
  | 'onChange'
  | 'onClearAll'
  | 'onRemoveSelectedClick'
  | 'onEmptyChange'
  | 'selectedItems'
  | 'isMultiple'
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
    'selectedItems',
    'isMultiple',
    'isDisabled',
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
