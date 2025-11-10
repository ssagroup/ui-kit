import { css } from '@emotion/css';
import {
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  FormContextType,
  optionId,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

import Radio from '@components/Radio';
import RadioGroup from '@components/RadioGroup';

export const RadioWidget = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: WidgetProps<T, S, F>,
) => {
  const { id, name, disabled, options, value, required, onChange } = props;
  const {
    enumOptions = [],
    enumDisabled = [],
    inline = false,
    emptyValue,
  } = options;
  const selectedIndex = enumOptionsIndexForValue<S>(
    value,
    enumOptions,
  ) as string;

  const handleChange = (nextValue: string | number | (string | number)[]) =>
    onChange(enumOptionsValueForIndex<S>(nextValue, enumOptions, emptyValue));

  return (
    <RadioGroup
      name={name}
      onChange={handleChange}
      externalState={selectedIndex}
      isRequired={required}
      css={{
        [`> label`]: {
          display: inline ? 'inline-flex' : 'flex',
        },
      }}>
      {Array.isArray(enumOptions)
        ? enumOptions.map((option, i) => (
            <Radio
              id={optionId(id, i)}
              name={id}
              isDisabled={
                disabled ||
                (Array.isArray(enumDisabled) &&
                  enumDisabled.indexOf(option.value) !== -1)
              }
              key={i}
              text={option.label}
              className={css`
                margin-bottom: 0;
              `}
              value={String(i)}
            />
          ))
        : undefined}
    </RadioGroup>
  );
};
