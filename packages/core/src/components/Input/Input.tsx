import { forwardRef, useEffect } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { InputBase } from './InputBase';
import { InputGroup } from './InputGroup';
import { InputProps, InputStatusColors } from './types';
import { InputStatusError } from './InputStatusError';
import { InputStatusSuccess } from './InputStatusSuccess';
import * as S from './styles';

const mapColors: InputStatusColors = {
  basic: S.basic,
  error: S.error,
  success: S.success,
  custom: S.custom,
};

const InputInner = (
  {
    name,
    type = 'text',
    placeholder,
    validationSchema,
    status = 'basic',
    disabled = false,
    startElement,
    endElement,
    className,
    wrapperClassName,
    inputProps = {},
    errorTooltip,
    successTooltip,
    register,
    onKeyUp,
  }: InputProps,
  inputRef?: React.ForwardedRef<HTMLInputElement | null>,
) => {
  useEffect(() => {
    if (!register) {
      console.warn('Input component must be used within a Form component');
    }
  }, []);

  const showStatusIcon = () => !disabled && !endElement;

  const registerResult = register?.(name, validationSchema);
  return (
    <InputGroup
      css={[mapColors[status]]}
      className={wrapperClassName}
      disabled={disabled}>
      {startElement ? <div css={S.startElement}>{startElement}</div> : null}
      <InputBase
        type={type}
        id={`formElement-${name}`}
        placeholder={placeholder}
        disabled={disabled}
        css={{
          paddingLeft: startElement && 40,
          paddingRight: endElement && 40,
        }}
        className={className}
        onKeyUp={onKeyUp}
        {...inputProps}
        {...register?.(name, validationSchema)}
        ref={useMergeRefs([registerResult?.ref, inputRef])}
      />

      {status === 'error' && showStatusIcon() ? (
        <InputStatusError errorTooltip={errorTooltip} />
      ) : null}
      {status === 'success' && showStatusIcon() ? (
        <InputStatusSuccess successTooltip={successTooltip} />
      ) : null}

      {endElement ? <div css={S.endElement}>{endElement}</div> : null}
    </InputGroup>
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(InputInner);

export default Input;
