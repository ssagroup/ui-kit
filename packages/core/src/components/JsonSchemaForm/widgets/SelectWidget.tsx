import {
  enumOptionsIndexForValue,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

import { highlightInputMatch, Typeahead, TypeaheadOption } from '@components';

export const SelectWidget = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: WidgetProps<T, S, F>,
) => {
  const {
    id,
    name,
    disabled,
    options,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    value,
    onChangeOverride,
    multiple,
    uiSchema,
  } = props;
  const { enumOptions = [], enumDisabled = [] } = options;
  const customPlaceholder = placeholder || uiSchema?.['ui:placeholder'];

  const isMultiple = !!multiple || Array.isArray(value);
  const items = Array.isArray(enumOptions) ? enumOptions : [];

  const handleChange = onChangeOverride
    ? onChangeOverride
    : (value?: string | number | (string | number)[]) => {
        onChange(value);
      };

  const getSelectedItems = (): (string | number)[] => {
    if (isMultiple) {
      if (Array.isArray(value)) return value;
      if (value !== undefined) return [value];
      return [];
    }

    if (value === undefined || value === null) return [];

    const index = enumOptionsIndexForValue<S>(value, enumOptions);
    return index !== undefined ? [value] : [];
  };

  const selectedItems = getSelectedItems();

  const handleFormChange = (
    newValue: string | number | (string | number)[],
  ) => {
    if (isMultiple) {
      const arrayValue = Array.isArray(newValue) ? newValue : [newValue];
      handleChange(arrayValue);
    } else {
      const singleValue = Array.isArray(newValue) ? newValue[0] : newValue;
      handleChange(singleValue);
    }
  };

  const handleTypeaheadChange = (
    changedValue: string | number,
    isAdded: boolean,
  ) => {
    if (isMultiple) {
      const currentSelected = Array.isArray(selectedItems) ? selectedItems : [];
      const newSelected = isAdded
        ? [...currentSelected, changedValue]
        : currentSelected.filter((item) => item !== changedValue);
      handleFormChange(newSelected);
    } else {
      const newValue = isAdded ? changedValue : undefined;
      handleFormChange(newValue as string | number);
    }
  };

  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, target && target.value);

  const handleFocus = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    onFocus(id, target && target.value);

  const onEmptyChange = (isEmpty?: boolean) => {
    if (isEmpty) {
      handleChange(isMultiple ? [] : undefined);
    }
  };

  const onClearAll = () => {
    handleChange(isMultiple ? [] : undefined);
  };

  const onRemoveSelectedClick = (removedValue: string | number) => {
    if (isMultiple) {
      const currentSelected = Array.isArray(selectedItems) ? selectedItems : [];
      const newSelected = currentSelected.filter(
        (item) => item !== removedValue,
      );
      handleChange(newSelected);
    } else {
      handleChange(undefined);
    }
  };

  return (
    <div id={id} onBlur={handleBlur} onFocus={handleFocus}>
      <Typeahead
        width="100%"
        selectedItems={selectedItems}
        isDisabled={disabled}
        name={name}
        isMultiple={isMultiple}
        placeholder={customPlaceholder || undefined}
        onChange={handleTypeaheadChange}
        onEmptyChange={onEmptyChange}
        onClearAll={onClearAll}
        onRemoveSelectedClick={onRemoveSelectedClick}
        renderOption={({ label, input }) => highlightInputMatch(label, input)}>
        {items.map(({ label, value }) => (
          <TypeaheadOption
            key={value}
            value={value}
            label={label || value}
            isDisabled={
              disabled ||
              (Array.isArray(enumDisabled) &&
                enumDisabled.includes(value as string))
            }>
            {label || value}
          </TypeaheadOption>
        ))}
      </Typeahead>
    </div>
  );
};
