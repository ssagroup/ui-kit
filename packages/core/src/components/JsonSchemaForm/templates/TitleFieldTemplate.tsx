import {
  FormContextType,
  TitleFieldProps,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';

export const TitleFieldTemplate = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>({
  id,
  title,
}: TitleFieldProps<T, S, F>) => {
  return title ? (
    <label
      htmlFor={id}
      title={typeof title === 'string' ? title : ''}
      css={{ fontWeight: 600 }}>
      {title}
    </label>
  ) : null;
};
