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
    onChangeOverride,
    value,
  } = props;
  const { enumOptions = [], enumDisabled = [] } = options;

  const selectedIndex = enumOptionsIndexForValue<S>(
    value,
    enumOptions,
  ) as string;

  const handleChange = onChangeOverride
    ? onChangeOverride
    : (value?: string) => {
        onChange(value);
      };

  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(id, target && target.value);

  const handleFocus = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    onFocus(id, target && target.value);

  const onEmptyChange = (isEmpty?: boolean) => {
    if (isEmpty) {
      handleChange();
    }
  };

  const items = Array.isArray(enumOptions) ? enumOptions : [];
  const selectedItems = selectedIndex
    ? [items[Number(selectedIndex)].value]
    : [];

  return (
    <div id={id} onBlur={handleBlur} onFocus={handleFocus}>
      <Typeahead
        width="100%"
        selectedItems={selectedItems}
        isDisabled={disabled}
        name={name}
        // RJSF provides placeholder as empty string
        placeholder={placeholder || undefined}
        onChange={handleChange}
        onEmptyChange={onEmptyChange}
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
