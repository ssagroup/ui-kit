import { InputBase } from './InputBase';
import { InputGroup } from './InputGroup';
import { InputProps, InputStatusColors } from './Input.types';
import { InputStatusError } from './InputStatusError';
import { InputStatusSuccess } from './InputStatusSuccess';

import { basic, error, success, appendElement } from './styles';

const mapColors: InputStatusColors = {
  basic: basic,
  error: error,
  success: success,
};

const Input = ({
  name,
  type = 'text',
  placeholder,
  register,
  validationSchema,
  status = 'basic',
  disabled = false,
  append,
}: InputProps) => {
  if (!register) {
    throw new Error('Input component must be used within a Form component');
  }

  const showStatusIcon = () => !disabled && !append;

  return (
    <InputGroup css={[mapColors[status]]} disabled={disabled}>
      <InputBase
        type={type}
        id={`formElement-${name}`}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, validationSchema)}
      />

      {status === 'error' && showStatusIcon() ? <InputStatusError /> : null}
      {status === 'success' && showStatusIcon() ? <InputStatusSuccess /> : null}

      {append ? <div css={appendElement}>{append}</div> : null}
    </InputGroup>
  );
};

export default Input;
