import React, { FocusEventHandler, MouseEventHandler } from 'react';
import { FieldError, useForm, useFormContext } from 'react-hook-form';
import { css } from '@emotion/css';
import * as C from '@components';
import { InputProps } from '@components/Input/types';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

const WithTriggerPopover = ({
  isEnabled,
  children,
}: {
  isEnabled?: boolean;
  children: React.ReactElement;
}) => {
  return isEnabled ? (
    <C.PopoverTrigger asChild>
      {React.cloneElement(children, {
        ...children.props,
      })}
    </C.PopoverTrigger>
  ) : (
    React.cloneElement(children, {
      ...children.props,
    })
  );
};

export const TriggerInput = ({
  datepickerType,
  withPopover = false,
  onClick,
}: {
  datepickerType: 'from' | 'to';
  withPopover?: boolean;
  onClick: MouseEventHandler<HTMLInputElement>;
}) => {
  const {
    format,
    nameFrom,
    nameTo,
    inputFromRef,
    inputToRef,
    inputProps,
    disabled,
    helperText,
    setLastFocusedElement,
    onBlur: handleBlur,
  } = useDateRangePickerContext();
  const formContext = useFormContext(); // Using FormProvider from react-hook-form
  const useFormResult = useForm();
  const currentName = datepickerType === 'from' ? nameFrom : nameTo;
  const hookFormResult = formContext ?? useFormResult;
  const {
    register,
    formState: { errors },
  } = hookFormResult;
  const { inputProps: inputElementProps, ...restInputProps } =
    (inputProps as Partial<InputProps>) || {};

  const fieldError = errors[currentName];
  const fieldStatus: InputProps['status'] = fieldError?.message
    ? 'error'
    : 'basic';

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setLastFocusedElement(datepickerType);
    inputProps?.inputProps?.onFocus?.(e);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOpen = (event: any) => {
    onClick?.(event);
  };

  return (
    <WithTriggerPopover isEnabled={withPopover}>
      <C.Input
        name={currentName}
        placeholder={format}
        ref={datepickerType === 'from' ? inputFromRef : inputToRef}
        disabled={disabled}
        register={register}
        inputProps={{
          onBlur: handleBlur,
          onClick: handleOpen,
          onFocus: handleFocus,
          id: inputProps?.inputProps?.id || currentName,
          'data-testid': `daterangepicker-input-${datepickerType}`,
          autoComplete: 'off',
          className: css`
            border: none !important;
          `,
          ...inputElementProps,
        }}
        errors={fieldError as FieldError}
        status={fieldStatus}
        helperText={helperText}
        helperClassName={css`
          & > span::first-letter {
            text-transform: uppercase;
          }
        `}
        {...restInputProps}
      />
    </WithTriggerPopover>
  );
};
