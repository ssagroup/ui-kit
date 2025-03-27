import { Fragment, useState } from 'react';
import {
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  FormContextType,
  optionId,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

import Checkbox from '@components/Checkbox';

export const CheckboxesWidget = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: WidgetProps<T, S, F>,
) => {
  const { id, options, value, readonly, disabled, onChange, onBlur, onFocus } =
    props;
  const {
    enumOptions = [],
    enumDisabled = [],
    inline = false,
    emptyValue,
  } = options;
  const selectedIndexes = enumOptionsIndexForValue<S>(
    value,
    enumOptions,
    true,
  ) as string[];

  const [selectedOptions, setSelectedOptions] = useState(selectedIndexes);

  const handleChange = (nextValue: string | number | (string | number)[]) => {
    const newSelectedOptions = [...selectedOptions];
    const index = newSelectedOptions.indexOf(String(nextValue));
    if (index > -1) {
      newSelectedOptions.splice(index, 1);
    } else {
      newSelectedOptions.push(String(nextValue));
    }
    setSelectedOptions(newSelectedOptions);
    onChange(
      enumOptionsValueForIndex<S>(newSelectedOptions, enumOptions, emptyValue),
    );
  };

  const handleBlur = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    onBlur(
      id,
      enumOptionsValueForIndex<S>(target.value, enumOptions, emptyValue),
    );

  const handleFocus = ({ target }: React.FocusEvent<HTMLInputElement>) =>
    onFocus(
      id,
      enumOptionsValueForIndex<S>(target.value, enumOptions, emptyValue),
    );

  const divProps = {
    id,
    onBlur: !readonly ? handleBlur : undefined,
    onFocus: !readonly ? handleFocus : undefined,
  };

  return (
    <div {...divProps}>
      {Array.isArray(enumOptions) &&
        enumOptions.map((option, i) => (
          <Fragment key={i}>
            <Checkbox
              id={optionId(id, i)}
              onChange={() => handleChange(i)}
              isDisabled={
                disabled ||
                (Array.isArray(enumDisabled) &&
                  enumDisabled.indexOf(option.value) !== -1)
              }
              initialState={selectedOptions.includes(String(i))}
              name={id}
              text={option.label}
            />
            {!inline && <br />}
          </Fragment>
        ))}
    </div>
  );
};
