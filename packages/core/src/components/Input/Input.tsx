import React, { forwardRef, useEffect } from 'react';

import { useMergeRefs } from '@floating-ui/react';

import FormHelperText from '@components/FormHelperText';

import { InputBase } from './InputBase';
import { InputGroup } from './InputGroup';
import { InputStatusError } from './InputStatusError';
import { InputStatusSuccess } from './InputStatusSuccess';
import * as S from './styles';
import { InputProps, InputStatusColors } from './types';

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
    helperClassName,
    inputProps = {},
    errorTooltip,
    successTooltip,
    errors,
    maxLength,
    helperText,
    showHelperText = false,
    showStatusIcon = true,
    showBorders = true,
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

  const [countChar, setCountChar] = React.useState(0);
  const showStatusIconByProps = !disabled && !endElement && showStatusIcon;
  const registerResult = register?.(name, validationSchema);

  const handleCount: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    setCountChar(e.currentTarget.value.length);
    onKeyUp?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    registerResult?.onBlur(e);
    inputProps.onBlur?.(e);
  };

  return (
    <>
      <InputGroup
        css={[mapColors[status]]}
        className={wrapperClassName}
        disabled={disabled}>
        {startElement ? <div css={S.startElement}>{startElement}</div> : null}
        <InputBase
          type={type}
          id={`formElement-${name}`}
          showBorders={showBorders}
          placeholder={placeholder}
          disabled={disabled}
          css={{
            paddingLeft: startElement && 40,
            paddingRight: endElement && 40,
          }}
          className={className}
          onKeyUp={handleCount}
          {...inputProps}
          {...registerResult}
          onBlur={handleBlur}
          ref={useMergeRefs([registerResult?.ref, inputRef])}
        />

        {status === 'error' && showStatusIconByProps ? (
          <InputStatusError errorTooltip={errorTooltip} />
        ) : null}
        {status === 'success' && showStatusIconByProps ? (
          <InputStatusSuccess successTooltip={successTooltip} />
        ) : null}

        {endElement ? <div css={S.endElement}>{endElement}</div> : null}
      </InputGroup>
      {showHelperText && (
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
          className={helperClassName}>
          <FormHelperText role="status" status={status} disabled={disabled}>
            {errors ? errors?.message : helperText}
          </FormHelperText>
          <FormHelperText role="meter">
            {maxLength ? `${countChar} / ${maxLength}` : null}
          </FormHelperText>
        </div>
      )}
    </>
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(InputInner);

export default Input;
