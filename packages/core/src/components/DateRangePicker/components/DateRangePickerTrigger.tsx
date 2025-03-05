import React, { FocusEventHandler, MouseEventHandler, useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import * as C from '@components';
import { InputProps } from '@components/Input/types';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

/**
 * use different?
 * - inputRef
 * - name
 * - wrap up with the new Field component
 *
 */
export const DateRangePickerTrigger = () => {
  const {
    format,
    name,
    label,
    openCalendarMode,
    inputFromRef,
    disabled,
    // TODO: process the fieldStatus variable separately
    helperText,
    lastFocusedElement,
    setLastFocusedElement,
    onBlur: handleBlur,
    setIsOpen,
  } = useDateRangePickerContext();
  const formContext = useFormContext(); // Using FormProvider from react-hook-form
  const useFormResult = useForm();
  const theme = useTheme();
  const hookFormResult = formContext ?? useFormResult;
  const {
    register,
    formState: { errors },
  } = hookFormResult;
  const nameFrom = `${name}From`;
  const nameTo = `${name}To`;
  // TODO: process the fieldStatus variable separately
  const fieldErrorFrom = errors[nameFrom];
  const fieldErrorTo = errors[nameTo];

  // TODO: process the fieldStatus variable separately
  const fieldStatusFrom: InputProps['status'] = fieldErrorFrom?.message
    ? 'error'
    : 'basic';
  const fieldStatusTo: InputProps['status'] = fieldErrorTo?.message
    ? 'error'
    : 'basic';

  const showHelperText =
    fieldErrorFrom?.message || fieldErrorTo?.message || helperText;

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

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    const { name } = e.currentTarget;
    setLastFocusedElement(name.endsWith('From') ? 'from' : 'to');
    // console.log('>>>handleFocus', e.currentTarget.name);
  };

  useEffect(() => {
    console.log('>>>lastFocusedElement', lastFocusedElement);
  }, [lastFocusedElement]);

  return (
    <React.Fragment>
      {label && <C.Label htmlFor={`field-${name}`}>{label}</C.Label>}
      <C.Wrapper
        css={{
          borderRadius: 12,
          border: theme.colors.greyDarker,
        }}>
        <C.PopoverTrigger asChild>
          <C.Input
            name={nameFrom}
            placeholder={format}
            ref={lastFocusedElement === 'from' ? inputFromRef : undefined}
            disabled={disabled}
            register={register}
            showStatusIcon={false}
            inputProps={{
              onFocus: handleFocus,
              onBlur: handleBlur,
              onClick: handleToggleOpen,
              id: `field-${nameFrom}`,
              'data-testid': 'datepicker-input-from',
            }}
            // errors={fieldError as FieldError}
            // status={fieldStatus}
            // helperText={helperText}
            // helperClassName={css`
            //   & > span::first-letter {
            //     text-transform: uppercase;
            //   }
            // `}
          />
        </C.PopoverTrigger>
        <C.Icon
          name="carrot-right"
          size={18}
          color={theme.colors.greyDarker80}
          css={{
            margin: '0 14px',
          }}
        />
        <C.PopoverTrigger asChild>
          <C.Input
            name={nameTo}
            placeholder={format}
            showHelperText={false}
            ref={lastFocusedElement === 'to' ? inputFromRef : undefined}
            disabled={disabled}
            register={register}
            showStatusIcon={false}
            inputProps={{
              onFocus: handleFocus,
              onBlur: handleBlur,
              onClick: handleToggleOpen,
              id: `field-${nameTo}`,
              'data-testid': 'datepicker-input-to',
            }}
            // errors={fieldError as FieldError}
            // status={fieldStatus}
            // helperText={helperText}
            // helperClassName={css`
            //   & > span::first-letter {
            //     text-transform: uppercase;
            //   }
            // `}
          />
        </C.PopoverTrigger>
        <C.Button
          endIcon={
            <C.Icon
              name="calendar"
              size={16}
              color={disabled ? theme.colors.grey : theme.colors.greyDarker}
            />
          }
          data-testid={'daterangepicker-button'}
          onClick={handleToggleOpen}
          variant="tertiary"
          aria-label="Calendar"
          isDisabled={disabled}
          css={{
            padding: 0,
            margin: '0 8px 0 14px',
            cursor:
              openCalendarMode === 'input' || disabled ? 'default' : 'pointer',
            '&:focus::before': {
              display: 'none',
            },
          }}
        />
      </C.Wrapper>
      {showHelperText && (
        // Replace with the new component Field
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <C.FormHelperText
            role="status"
            status={fieldStatusFrom || fieldStatusTo}
            disabled={disabled}
            css={{
              '&::first-letter': {
                textTransform: 'uppercase',
              },
            }}>
            {`${fieldErrorFrom?.message || ''}`}
            {`${fieldErrorTo?.message || ''}`}
          </C.FormHelperText>
        </div>
      )}
    </React.Fragment>
  );
};
