import React, { FocusEventHandler } from 'react';
import { FieldError, useForm, useFormContext } from 'react-hook-form';
import { css } from '@emotion/css';
import * as C from '@components';
import { InputProps } from '@components/Input/types';
import { useDateRangePickerContext } from '../useDateRangePickerContext';
import { PRESENT_VALUE } from '../DateRangePickerFormBridge';

export const TriggerInput = ({
  datepickerType,
  className,
}: {
  datepickerType: 'from' | 'to';
  className?: string;
}) => {
  const {
    format,
    nameFrom,
    nameTo,
    inputFromRef,
    inputToRef,
    inputProps,
    disabled,
    setLastFocusedElement,
    classNames,
    onBlur: handleBlur,
    isOpen,
    setIsOpen,
    isEndDatePresent,
    setIsEndDatePresent,
    setDateTime,
    status: contextStatus,
  } = useDateRangePickerContext();
  const formContext = useFormContext(); // Using FormProvider from react-hook-form
  const useFormResult = useForm();
  const currentName = datepickerType === 'from' ? nameFrom : nameTo;
  const hookFormResult = formContext ?? useFormResult;
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = hookFormResult;

  const formValue = watch(currentName);
  // Override display with PRESENT_VALUE when "Present" is selected
  const displayValue =
    datepickerType === 'to' && isEndDatePresent ? PRESENT_VALUE : formValue;
  const { inputProps: inputElementProps, ...restInputProps } =
    (inputProps as Partial<InputProps>) || {};

  const fieldError = errors[currentName];
  // Use context status for border styling, but only show individual field errors as helperText
  const fieldStatus: InputProps['status'] =
    contextStatus === 'error'
      ? 'error'
      : fieldError?.message
        ? 'error'
        : 'basic';

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    setLastFocusedElement(datepickerType);
    inputProps?.inputProps?.onFocus?.(e);
  };

  const clearPresentAndField = () => {
    setIsEndDatePresent(false);
    setValue(currentName, '');
    setDateTime((prev) => [prev[0], undefined]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If PRESENT_VALUE is displayed and user presses Backspace or Delete, clear the field entirely
    if (
      datepickerType === 'to' &&
      isEndDatePresent &&
      (e.key === 'Backspace' || e.key === 'Delete')
    ) {
      const input = e.currentTarget;

      // Clear "Present" entirely (prevents letter-by-letter deletion)
      e.preventDefault();
      e.stopPropagation();
      clearPresentAndField();
      // Focus the input after clearing to allow immediate typing
      setTimeout(() => input.focus(), 0);
      return;
    }
    // Pass through to original handler
    inputProps?.inputProps?.onKeyDown?.(
      e as unknown as React.KeyboardEvent<HTMLInputElement>,
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Clear "Present" flag when user changes input (backup if onInput doesn't fire)
    if (
      datepickerType === 'to' &&
      isEndDatePresent &&
      newValue !== displayValue
    ) {
      setIsEndDatePresent(false);
    }

    // Pass through to original handler
    inputProps?.inputProps?.onChange?.(e);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newValue = target.value;

    // Clear "Present" flag immediately when user modifies input (typing, deleting, pasting)
    if (
      datepickerType === 'to' &&
      isEndDatePresent &&
      newValue !== displayValue
    ) {
      setIsEndDatePresent(false);
      // Form value should already be empty, but ensure it's set to the new value
      if (formValue !== newValue) {
        setValue(currentName, newValue);
      }
    }

    // Pass through to original handler
    inputProps?.inputProps?.onInput?.(e);
  };

  return (
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
        value: displayValue || '',
        onBlur: handleBlur,
        onFocus: handleFocus,
        onClick: (e) => {
          if (isOpen) {
            setIsOpen(false);
          }
          // Select all text when "Present" is displayed (easier to replace)
          if (datepickerType === 'to' && isEndDatePresent) {
            e.currentTarget.select();
          }
          inputProps?.inputProps?.onClick?.(e);
        },
        onKeyDown: handleKeyDown,
        onBeforeInput: (e: unknown) => {
          // pass-through
          inputProps?.inputProps?.onBeforeInput?.(
            e as React.InputEvent<HTMLInputElement>,
          );
        },
        onInput: handleInput,
        onChange: handleChange,
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
      showHelperText={!!fieldError}
      helperText={fieldError?.message as string | undefined}
      helperClassName={css`
        & > span::first-letter {
          text-transform: uppercase;
        }
      `}
      {...restInputProps}
    />
  );
};
