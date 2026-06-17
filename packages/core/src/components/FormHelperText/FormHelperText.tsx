import { FormHelperTextProps } from './types';
import { FormHelperTextBase } from './FormHelperTextBase';

const FormHelperText = ({
  role,
  status,
  disabled,
  children,
  ...rest
}: FormHelperTextProps) => {
  return (
    <FormHelperTextBase
      role={role}
      status={status}
      isDisabled={disabled}
      {...rest}>
      {children}
    </FormHelperTextBase>
  );
};

export default FormHelperText;
