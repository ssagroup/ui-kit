import { InputBase } from './InputBase';
import { InputGroup } from './InputGroup';
import { InputProps, InputStatusColors } from './Input.types';
import { InputStatusError } from './InputStatusError';
import { InputStatusSuccess } from './InputStatusSuccess';
import * as S from './styles';

const mapColors: InputStatusColors = {
  basic: S.basic,
  error: S.error,
  success: S.success,
};

const Input = ({
  name,
  type = 'text',
  placeholder,
  register,
  validationSchema,
  status = 'basic',
  disabled = false,
  startElement,
  endElement,
}: InputProps) => {
  if (!register) {
    throw new Error('Input component must be used within a Form component');
  }

  const showStatusIcon = () => !disabled && !endElement;

  return (
    <InputGroup css={[mapColors[status]]} disabled={disabled}>
      {startElement ? <div css={S.startElement}>{startElement}</div> : null}
      <InputBase
        type={type}
        id={`formElement-${name}`}
        placeholder={placeholder}
        disabled={disabled}
        $paddingLeft={startElement && 40}
        $paddingRight={endElement && 40}
        {...register(name, validationSchema)}
      />

      {status === 'error' && showStatusIcon() ? <InputStatusError /> : null}
      {status === 'success' && showStatusIcon() ? <InputStatusSuccess /> : null}

      {endElement ? <div css={S.endElement}>{endElement}</div> : null}
    </InputGroup>
  );
};

export default Input;
