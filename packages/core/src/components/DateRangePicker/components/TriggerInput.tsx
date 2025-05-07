import React, { FocusEventHandler, MouseEvent, MouseEventHandler } from 'react';
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
  className,
  onClick,
}: {
  datepickerType: 'from' | 'to';
  withPopover?: boolean;
  className?: string;
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
    classNames,
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

  const handleOpen = (event: MouseEvent<HTMLInputElement>) => {
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
        className={className}
        wrapperClassName={css`
          display: flex;
          padding-left: ${datepickerType === 'from' ? 0 : 14}px;
        `}
        inputProps={{
          onBlur: handleBlur,
          onClick: handleOpen,
          onFocus: handleFocus,
          id: inputProps?.inputProps?.id || currentName,
          'data-testid': `daterangepicker-input-${datepickerType}`,
          autoComplete: 'off',
          className: [
            css`
              border: none !important;
              height: auto !important;
              padding: 0 !important;
              min-width: 75px;
              line-height: 16px;
              max-height: 16px;
              letter-spacing: 0.8px;
              border-radius: 0 !important;
              &::placeholder {
                letter-spacing: normal;
              }
            `,
            datepickerType === 'from'
              ? classNames?.trigger?.inputFrom
              : classNames?.trigger?.inputTo,
          ]
            .filter(Boolean)
            .join(' '),
          ...inputElementProps,
        }}
        showStatusIcon={false}
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
