import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import { useClickOutside } from '@ssa-ui-kit/hooks';
import * as C from '@components';
import * as S from '../styles';
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
    messages,
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
        <S.TriggerWrapper
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
            size={16}
            color={disabled ? theme.colors.grey : theme.colors.greyDarker}
            className={classNames?.trigger?.arrowIcon}
            css={{
              margin: '0 3px',
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
              className={classNames?.trigger?.calendarIcon}
              css={{
                padding: 0,
                margin: '0 0 0 10px',
                height: 'auto',
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
        </S.TriggerWrapper>
      </C.Field.Control>
      {messages?.description && (
        <C.Field.Description>{messages?.description}</C.Field.Description>
      )}
      {(errorMessage.length || messages?.error) && (
        <C.Field.Error>
          {errorMessage.length
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
            : messages?.error}
        </C.Field.Error>
      )}
      {messages?.success && (
        <C.Field.Success>{messages?.success}</C.Field.Success>
      )}
    </C.Field.Root>
  );
};
