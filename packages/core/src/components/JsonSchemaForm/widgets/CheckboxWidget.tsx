import {
  FormContextType,
  labelValue,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';

import Checkbox from '@components/Checkbox';

export const CheckboxWidget = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: WidgetProps<T, S, F>,
) => {
  const { id, value, label, hideLabel, onChange } = props;
  return (
    <div>
      <Checkbox
        id={id}
        initialState={value}
        onChange={onChange}
        text={labelValue(label, hideLabel, '')}
        css={{ marginBottom: 0 }}
      />
    </div>
  );
};
