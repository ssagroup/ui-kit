import { DateRangePickerContextProps, DateRangePickerProps } from './types';
import { useDateRangePicker } from './hooks';
import { DateRangePickerContext } from './DateRangePickerContext';

export const DateRangePickerProvider = ({
  children,
  ...rest
}: React.PropsWithChildren<DateRangePickerProps>) => {
  const { formatIndexes, inputFromRef, inputToRef, ...restHook } =
    useDateRangePicker({
      ...rest,
      isOpenState: rest.isOpenState,
    });

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    restHook.handleBlur(e);
    rest.onBlur?.(e);
  };

  const toggleOpen = () => {
    restHook.setIsOpen((current) => !current);
  };

  const handleToggleOpen: DateRangePickerContextProps['handleToggleOpen'] = (
    e,
  ) => {
    const tagName = e.currentTarget.tagName.toLowerCase();
    if (
      rest.openCalendarMode === 'both' ||
      (rest.openCalendarMode === 'input' && tagName === 'input') ||
      (rest.openCalendarMode === 'icon' && tagName === 'button')
    ) {
      toggleOpen();
    }
    if (tagName === 'input' && rest.inputProps?.inputProps?.onClick) {
      rest.inputProps.inputProps.onClick(
        e as React.MouseEvent<HTMLInputElement>,
      );
    }
  };
  return (
    <DateRangePickerContext.Provider
      value={{
        ...rest,
        ...restHook,
        formatIndexes,
        inputFromRef,
        inputToRef,
        handleToggleOpen,
        onBlur: handleBlur,
      }}>
      {children}
    </DateRangePickerContext.Provider>
  );
};
