import {
  FormContextType,
  rangeSpec,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

export const RangeWidget = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: WidgetProps<T, S, F>,
) => {
  const {
    id,
    disabled,
    options,
    onChangeOverride,
    value,
    schema,
    onChange,
    onBlur,
    onFocus,
  } = props;
  const { min, max, step } = rangeSpec(schema);

  const emptyValue = options.emptyValue || '';

  const handleChange = (nextValue: unknown) =>
    onChangeOverride
      ? onChangeOverride
      : onChange(nextValue === '' ? emptyValue : nextValue);

  const handleBlur = () => onBlur(id, value);

  const handleFocus = () => onFocus(id, value);

  return (
    <div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        css={{ width: '100%' }}
      />
    </div>
  );
};
