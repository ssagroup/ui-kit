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
    success,
    showCalendarIcon,
    showClearButton,
    isDirty,
    resetToDefault,
    onBlur: handleBlur,
    setIsOpen,
    validationSchema,
  } = useDatePickerContext();

  const { inputProps: inputElementProps, ...rest } =
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
  let fieldStatus: InputProps['status'] = 'basic';
  if (fieldError?.message) {
    fieldStatus = 'error';
  } else if (success) {
    fieldStatus = 'success';
  }

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

  const calendarButton = showCalendarIcon ? (
    <C.Button
      endIcon={
        <C.Icon
          name="calendar"
          size={16}
          color={disabled ? theme.colors.grey : theme.colors.greyDarker}
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
          openCalendarMode === 'input' || disabled ? 'default' : 'pointer',
        '&:focus::before': {
          display: 'none',
        },
      }}
    />
  ) : undefined;

  const clearButton =
    showClearButton && isDirty && !disabled ? (
      <C.Button
        endIcon={
          <C.Icon name="cross" size={16} color={theme.colors.greyDarker80} />
        }
        data-testid={'datepicker-clear-button'}
        onClick={() => resetToDefault?.()}
        variant="tertiary"
        aria-label="Clear date"
        className={classNames?.trigger?.clearButton}
        css={{
          padding: 0,
          '&:focus::before': {
            display: 'none',
          },
        }}
      />
    ) : undefined;

  // Figma groups the trailing actions with a 16px gap; rendering them as a
  // single `endElement` keeps Input's absolute positioning applying to the
  // group rather than to each button.
  const actions =
    clearButton || calendarButton ? (
      <C.Wrapper css={{ gap: 16, alignItems: 'center' }}>
        {clearButton}
        {calendarButton}
      </C.Wrapper>
    ) : undefined;

  return (
    <React.Fragment>
      {label && (
        <C.Label htmlFor={name} className={classNames?.label}>
          {label}
        </C.Label>
      )}
      <C.PopoverTrigger asChild>
        <C.Input
          {...rest}
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
          showHelperText={!!(fieldError || helperText)}
          validationSchema={validationSchema}
          helperClassName={css`
            & > span::first-letter {
              text-transform: uppercase;
            }
          `}
          endElement={actions}
        />
      </C.PopoverTrigger>
    </React.Fragment>
  );
};
