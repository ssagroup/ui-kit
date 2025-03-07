import {
  FocusEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useFormContext } from 'react-hook-form';
import { useTheme } from '@emotion/react';
import * as C from '@components';
import { DateRangePickerProps } from './types';
import { DEFAULT_MASK_FORMAT } from './constants';

/**
 * - highlight the selected date range, when two dates are selected
 * - keep the same place for datepicker (from / to)
 * - don't close the datepicker while switching between from / to
 */
export const DateRangePicker = ({
  format = DEFAULT_MASK_FORMAT,
  openCalendarMode = 'both',
  name,
  label,
  value,
  defaultValue,
  ...rest
}: DateRangePickerProps) => {
  const theme = useTheme();
  const formContext = useFormContext();
  const [currentStatus, setCurrentStatus] = useState(rest.status);
  const errorsFrom = formContext.formState.errors[`${name}From`]?.message;
  const errorsTo = formContext.formState.errors[`${name}To`]?.message;
  const errorMessage = [errorsFrom, errorsTo].filter(Boolean) as string[];
  const { disabled } = rest;
  const [fromOpenToggle, setFromOpenToggle] = useState<boolean | undefined>();
  const [toOpenToggle, setToOpenToggle] = useState<boolean | undefined>();
  const [changedDate, setChangedDate] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [lastFocusedElement, setLastFocusedElement] = useState<'from' | 'to'>(
    'from',
  );
  const [valueFrom, valueTo] = value || [];
  const [defaultValueFrom, defaultValueTo] = defaultValue || [];
  const datepickerFromRef = useRef<HTMLInputElement | null>(null);
  const datepickerToRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setCurrentStatus(rest.status);
  }, [rest.status]);

  useEffect(() => {
    if (errorMessage.length) {
      setCurrentStatus('error');
    } else {
      setCurrentStatus(rest.status || 'basic');
    }
  }, [errorMessage]);

  const toggleOpen = () => {
    if (lastFocusedElement === 'from') {
      setFromOpenToggle((current) => !current);
      setTimeout(() => datepickerFromRef.current?.focus(), 5);
    } else {
      setToOpenToggle((current) => !current);
      setTimeout(() => datepickerToRef.current?.focus(), 5);
    }
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
    if (tagName === 'input' && rest.inputProps?.inputProps?.onClick) {
      rest.inputProps.inputProps.onClick(
        e as React.MouseEvent<HTMLInputElement>,
      );
    }
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    const { name } = e.currentTarget;
    setLastFocusedElement(name.endsWith('From') ? 'from' : 'to');
    rest.inputProps?.inputProps?.onFocus?.(e);
  };

  const onChangeFrom = (date?: Date) => {
    const newDate = date || null;
    if (newDate !== changedDate?.[0]) {
      const changedData: [Date | null, Date | null] = [
        newDate,
        changedDate ? changedDate[1] : null,
      ];
      setChangedDate(changedData);
      if (!changedDate?.[1]) {
        setLastFocusedElement('to');
        setToOpenToggle(true);
      }
      rest.onChange?.(changedData);
    }
  };

  const onChangeTo = (date?: Date) => {
    const newDate = date || null;
    if (newDate !== changedDate?.[1]) {
      const changedData: [Date | null, Date | null] = [
        changedDate ? changedDate[0] : null,
        newDate,
      ];
      setChangedDate(changedData);
      datepickerToRef.current?.focus();
      rest.onChange?.(changedData);
    }
  };

  // TODO: change status dynamically
  return (
    <C.Field.Root status={currentStatus} disabled={rest.disabled}>
      <C.Field.Label
        htmlFor={
          lastFocusedElement === 'from'
            ? `formElement-${name}From`
            : `formElement-${name}To`
        }>
        {label}
      </C.Field.Label>
      <C.Field.Control>
        <C.Wrapper
          css={{
            '& input': {
              border: 'none !important',
            },
          }}>
          <C.DatePicker
            format={format}
            openCalendarMode={openCalendarMode}
            isOpenToggle={fromOpenToggle}
            name={`${name}From`}
            value={valueFrom}
            defaultValue={defaultValueFrom}
            label={''}
            showCalendarIcon={false}
            {...rest}
            ref={datepickerFromRef}
            onChange={onChangeFrom}
            inputProps={{
              showStatusIcon: false,
              ...rest.inputProps,
              inputProps: {
                ...rest.inputProps?.inputProps,
                onFocus: handleFocus,
                onClick: handleToggleOpen,
              },
            }}
          />
          <C.Icon
            name="carrot-right"
            size={18}
            color={theme.colors.greyDarker80}
            css={{
              margin: '0 14px',
            }}
          />
          <C.DatePicker
            format={format}
            openCalendarMode={openCalendarMode}
            isOpenToggle={toOpenToggle}
            name={`${name}To`}
            value={valueTo}
            defaultValue={defaultValueTo}
            label={''}
            showCalendarIcon={false}
            {...rest}
            ref={datepickerToRef}
            onChange={onChangeTo}
            inputProps={{
              showStatusIcon: false,
              ...rest.inputProps,
              inputProps: {
                ...rest.inputProps?.inputProps,
                onFocus: handleFocus,
                onClick: handleToggleOpen,
              },
            }}
          />
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
        </C.Wrapper>
      </C.Field.Control>
      <C.Field.Description>{rest.helperText}</C.Field.Description>
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
          : rest.helperText}
      </C.Field.Error>
      <C.Field.Success>{rest.helperText}</C.Field.Success>
    </C.Field.Root>
  );
};
