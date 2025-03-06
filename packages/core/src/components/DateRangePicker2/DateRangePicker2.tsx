import {
  FocusEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { useTheme } from '@emotion/react';
import * as C from '@components';
import { DateRangePickerProps } from './types';
import { DEFAULT_MASK_FORMAT } from './constants';

export const DateRangePicker2 = ({
  format = DEFAULT_MASK_FORMAT,
  openCalendarMode = 'both',
  name,
  label,
  ...rest
}: DateRangePickerProps) => {
  const theme = useTheme();
  const { disabled } = rest;
  const [fromOpenToggle, setFromOpenToggle] = useState<boolean | undefined>();
  const [toOpenToggle, setToOpenToggle] = useState<boolean | undefined>();
  const [lastFocusedElement, setLastFocusedElement] = useState<'from' | 'to'>(
    'from',
  );

  const toggleOpen = () => {
    if (lastFocusedElement === 'from') {
      setFromOpenToggle((current) => !current);
    } else {
      setToOpenToggle((current) => !current);
    }
  };

  const handleToggleOpen: MouseEventHandler<HTMLElement> = (e) => {
    const tagName = e.currentTarget.tagName.toLowerCase();
    console.log('>>>tagName', tagName, openCalendarMode);
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
    console.log('>>>handleFocus', name);
    setLastFocusedElement(name.endsWith('From') ? 'from' : 'to');
    rest.inputProps?.inputProps?.onFocus?.(e);
    // console.log('>>>handleFocus', e.currentTarget.name);
  };

  useEffect(() => {
    console.log('>>>lastFocusedElement', lastFocusedElement);
  }, [lastFocusedElement]);

  console.log('>>>label', label);

  return (
    <C.Wrapper
      css={{
        borderRadius: 12,
        border: `1px solid ${theme.colors.greyDarker}`,
        '& input': {
          border: 'none !important',
        },
      }}>
      <C.DatePicker
        format={format}
        openCalendarMode={openCalendarMode}
        isOpenToggle={fromOpenToggle}
        name={`${name}From`}
        label={''}
        showCalendarIcon={false}
        {...rest}
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
        label={''}
        showCalendarIcon={false}
        {...rest}
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
            openCalendarMode === 'input' || disabled ? 'default' : 'pointer',
          '&:focus::before': {
            display: 'none',
          },
        }}
      />
    </C.Wrapper>
  );
};
