import {
  FieldTemplateProps,
  FormContextType,
  getTemplate,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';

import { Field } from '@components/Field';

export const FieldTemplate = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>(
  props: FieldTemplateProps<T, S, F>,
) => {
  const {
    id,
    classNames,
    style,
    label,
    displayLabel,
    disabled,
    rawErrors,
    registry,
    uiSchema,
    children,
    readonly,
    required,
    schema,
    rawHelp,
    help,
    onDropPropertyClick,
    onKeyChange,
  } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate<
    'WrapIfAdditionalTemplate',
    T,
    S,
    F
  >('WrapIfAdditionalTemplate', registry, uiOptions);

  const status = rawErrors && rawErrors.length > 0 ? 'error' : 'basic';

  return (
    <WrapIfAdditionalTemplate
      classNames={classNames}
      style={style}
      disabled={disabled}
      id={id}
      label={label}
      onDropPropertyClick={onDropPropertyClick}
      onKeyChange={onKeyChange}
      readonly={readonly}
      required={required}
      schema={schema}
      uiSchema={uiSchema}
      registry={registry}>
      <Field.Root status={status} disabled={disabled} asChild>
        {displayLabel && <Field.Label htmlFor={id}>{label}</Field.Label>}
        {children}
        <Field.Error>{rawErrors?.join(', ')}</Field.Error>
        {rawHelp && <Field.Description>{help}</Field.Description>}
      </Field.Root>
    </WrapIfAdditionalTemplate>
  );
};
