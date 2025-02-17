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
    openCalendarMode,
    inputRef,
    disabled,
    helperText,
    handleBlur,
    setIsOpen,
  } = useDatePickerContext();
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

  const handleToggleOpen: MouseEventHandler<HTMLElement> = (e) => {
    const tagName = e.currentTarget.tagName.toLowerCase();
    if (
      openCalendarMode === 'both' ||
      (openCalendarMode === 'input' && tagName === 'input') ||
      (openCalendarMode === 'icon' && tagName === 'button')
    ) {
      toggleOpen();
    }
  };

  return (
    <React.Fragment>
      {label && <C.Label htmlFor={name}>{label}</C.Label>}
      <C.PopoverTrigger asChild>
        <C.Input
          name={name}
          placeholder={format}
          showHelperText
          ref={inputRef}
          disabled={disabled}
          register={register}
          inputProps={{
            onBlur: handleBlur,
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
            <C.Button
              endIcon={
                <C.Icon
                  name="calendar"
                  size={16}
                  color={disabled ? theme.colors.grey : theme.colors.greyDarker}
                />
              }
              onClick={handleToggleOpen}
              variant="tertiary"
              isDisabled={disabled}
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
          }
        />
      </C.PopoverTrigger>
    </React.Fragment>
  );
};
