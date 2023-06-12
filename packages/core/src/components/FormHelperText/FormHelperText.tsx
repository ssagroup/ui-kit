import { IFormHelperText } from './types';
import { FormHelperTextBase } from './FormHelperTextBase';

const FormHelperText = ({
  role,
  status,
  disabled,
  children,
}: IFormHelperText) => {
  status = disabled ? 'basic' : status;
  return (
    <FormHelperTextBase role={role} status={status}>
      {children}
    </FormHelperTextBase>
  );
};

export default FormHelperText;
