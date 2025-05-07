import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { useClickOutside } from '@ssa-ui-kit/hooks';
import * as C from '@components';
import { TriggerInput } from './TriggerInput';
import { useDateRangePickerContext } from '../useDateRangePickerContext';

export const Trigger = () => {
  const {
    nameFrom,
    nameTo,
    label,
    lastFocusedElement,
    disabled,
    status,
    helperText,
    openCalendarMode,
    isOpen,
    showCalendarIcon,
    classNames,
    setIsOpen,
    handleToggleOpen,
  } = useDateRangePickerContext();

  const theme = useTheme();
  const formContext = useFormContext();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, (event) => {
    const { target } = event;
    const closestPopover = (target as HTMLElement).closest('div.popover');
    if (isOpen && !closestPopover) {
      setIsOpen(false);
    }
  });

  const errorsFrom = formContext.formState.errors[nameFrom]?.message;
  const errorsTo = formContext.formState.errors[nameTo]?.message;
  const errorMessage = [errorsFrom, errorsTo].filter(Boolean) as string[];

  return (
    <C.Field.Root
      status={status}
      disabled={disabled}
      data-testid="daterangepicker"
      className={classNames?.trigger?.root}>
      <C.Field.Label
        htmlFor={lastFocusedElement === 'from' ? nameFrom : nameTo}
        className={classNames?.label}>
        {label}
      </C.Field.Label>
      <C.Field.Control>
        <C.Wrapper
          ref={wrapperRef}
          className={classNames?.trigger?.controlsWrapper}>
          <TriggerInput
            withPopover
            datepickerType="from"
            className={classNames?.trigger?.inputFrom}
            onClick={() => {
              if (!isOpen) {
                setIsOpen(true);
              }
            }}
          />
          <C.Icon
            name="carrot-right"
            size={18}
            color={theme.colors.greyDarker80}
            className={classNames?.trigger?.icon}
            css={{
              margin: '0 14px',
            }}
          />
          <TriggerInput
            datepickerType="to"
            className={classNames?.trigger?.inputTo}
            onClick={() => {
              if (!isOpen) {
                setIsOpen(true);
              }
            }}
          />
          {showCalendarIcon && (
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
                  openCalendarMode === 'input' || disabled
                    ? 'default'
                    : 'pointer',
                '&:focus::before': {
                  display: 'none',
                },
              }}
            />
          )}
        </C.Wrapper>
      </C.Field.Control>
      <C.Field.Description>{helperText}</C.Field.Description>
      <C.Field.Error>
        {errorMessage
          ? errorMessage.map((error, index) => (
              <span
                key={`error-${index}`}
                css={{
                  color: 'inherit',
                  '&::first-letter': { textTransform: 'uppercase' },
                }}>
                {error}
              </span>
            ))
          : helperText}
      </C.Field.Error>
      <C.Field.Success>{helperText}</C.Field.Success>
    </C.Field.Root>
  );
};
