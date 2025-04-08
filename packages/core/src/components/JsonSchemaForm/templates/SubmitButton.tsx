import {
  FormContextType,
  getSubmitButtonOptions,
  RJSFSchema,
  StrictRJSFSchema,
  SubmitButtonProps,
} from '@rjsf/utils';

import Button from '@components/Button';

export const SubmitButton = <
  T = unknown,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = Record<string, unknown>,
>({
  uiSchema,
}: SubmitButtonProps<T, S, F>) => {
  const {
    submitText,
    norender,
    props: submitButtonProps,
  } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return (
    <Button
      type="submit"
      {...submitButtonProps}
      data-testid="rjsf-submit-button">
      {submitText}
    </Button>
  );
};
