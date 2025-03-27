import {
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

import { Dropdown, DropdownOption } from '@components';

export const SelectWidget = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: WidgetProps<T, S, F>,
) => {
  const { disabled, options, placeholder, onChange, onChangeOverride, value } =
    props;
  const { enumOptions = [], enumDisabled = [] } = options;

  const selectedIndex = enumOptionsIndexForValue<S>(
    value,
    enumOptions,
  ) as string;

  const handleChange = onChangeOverride
    ? onChangeOverride
    : ({ value }: { value: string }) =>
        onChange(enumOptionsValueForIndex<S>(value, enumOptions));

  return (
    <div>
      <Dropdown
        isDisabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        selectedItem={
          selectedIndex
            ? {
                value: selectedIndex,
                label: enumOptions[Number(selectedIndex)].label,
              }
            : undefined
        }>
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, i) => (
            <DropdownOption
              key={i}
              value={String(i)}
              label={option.label}
              isDisabled={
                disabled ||
                (Array.isArray(enumDisabled) &&
                  enumDisabled.indexOf(option.value) !== -1)
              }
            />
          ))}
      </Dropdown>
    </div>
  );
};
