import React, { MouseEventHandler } from 'react';
import { FieldError, useForm, useFormContext } from 'react-hook-form';
import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import * as C from '@components';
import { InputProps } from '@components/Input/types';
import { useDatePickerContext } from '../useDatePickerContext';

export const DatePickerTrigger = () => {
  const {
    format,
    name,
    label,
    classNames,
    openCalendarMode,
    inputRef,
    inputProps,
    disabled,
    helperText,
    showCalendarIcon,
    onBlur: handleBlur,
    setIsOpen,
  } = useDatePickerContext();

  const { inputProps: inputElementProps, ...restInputProps } =
    (inputProps as Partial<InputProps>) || {};
  const formContext = useFormContext(); // Using FormProvider from react-hook-form
  const useFormResult = useForm();
  const theme = useTheme();
  const hookFormResult = formContext ?? useFormResult;
  const {
    register,
    formState: { errors },
  } = hookFormResult;
  const fieldError = errors[name];
  const fieldStatus: InputProps['status'] = fieldError?.message
    ? 'error'
    : 'basic';

  const toggleOpen = () => {
    setIsOpen((current) => !current);
  };

  const handleToggleOpen: MouseEventHandler<
    HTMLButtonElement | HTMLInputElement
  > = (e) => {
    const tagName = e.currentTarget.tagName.toLowerCase();
    if (
      openCalendarMode === 'both' ||
      (openCalendarMode === 'input' && tagName === 'input') ||
      (openCalendarMode === 'icon' && tagName === 'button')
    ) {
      toggleOpen();
    }
    if (e.currentTarget instanceof HTMLInputElement) {
      inputProps?.inputProps?.onClick?.(
        e as React.MouseEvent<HTMLInputElement>,
      );
    }
  };

  return (
    <React.Fragment>
      {label && (
        <C.Label htmlFor={name} className={classNames?.label}>
          {label}
        </C.Label>
      )}
      <C.PopoverTrigger asChild>
        <C.Input
          name={name}
          placeholder={format}
          ref={inputRef}
          disabled={disabled}
          className={classNames?.trigger?.input}
          register={register}
          inputProps={{
            onBlur: handleBlur,
            onClick: handleToggleOpen,
            id: inputProps?.inputProps?.id || name,
            'data-testid': 'datepicker-input',
            autoComplete: 'off',
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
          endElement={
            showCalendarIcon ? (
              <C.Button
                endIcon={
                  <C.Icon
                    name="calendar"
                    size={16}
                    color={
                      disabled ? theme.colors.grey : theme.colors.greyDarker
                    }
                  />
                }
                data-testid={'datepicker-button'}
                onClick={handleToggleOpen}
                variant="tertiary"
                aria-label="Calendar"
                isDisabled={disabled}
                className={classNames?.trigger?.calendarIcon}
                css={{
                  padding: 0,
                  cursor:
                    openCalendarMode === 'input' || disabled
                      ? 'default'
                      : 'pointer',
                  '&:focus::before': {
                    display: 'none',
                  },
                }}
              />
            ) : undefined
          }
          {...restInputProps}
        />
      </C.PopoverTrigger>
    </React.Fragment>
  );
};
