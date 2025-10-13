import { FormHelperTextBase } from './FormHelperTextBase';
import { FormHelperTextProps } from './types';

const FormHelperText = ({
  role,
  status,
  disabled,
  children,
  ...rest
}: FormHelperTextProps) => {
  status = disabled ? 'basic' : status;
  return (
    <FormHelperTextBase role={role} status={status} {...rest}>
      {children}
    </FormHelperTextBase>
  );
};

export default FormHelperText;
