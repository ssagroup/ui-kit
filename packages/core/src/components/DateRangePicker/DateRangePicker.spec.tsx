import { DateTime } from 'luxon';
import { fireEvent, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { DateRangePicker } from './DateRangePicker';
import { DEFAULT_MASK_FORMAT } from './constants';
import { FieldValues, Form, FormProvider, useForm } from 'react-hook-form';
import { DateRangePickerProps } from './types';
import { FormGroup, mainTheme } from '../..';

describe('DateRangePicker', () => {
  const DateRangePickerFormProvider = ({
    children,
  }: React.PropsWithChildren) => {
    const useFormResult = useForm<FieldValues>();
    return (
      <FormProvider {...useFormResult}>
        <Form>
          <FormGroup>{children}</FormGroup>
        </Form>
      </FormProvider>
    );
  };

  function setup(props: Partial<DateRangePickerProps> = {}) {
    const mockOnChange = jest.fn();
    const mockOnOpen = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnError = jest.fn();
    const mockOnMonthChange = jest.fn();
    const mockOnYearChange = jest.fn();
    const mockOnBlur = jest.fn();

    return {
      user: userEvent.setup(),
      mockOnChange,
      mockOnOpen,
      mockOnClose,
      mockOnError,
      mockOnMonthChange,
      mockOnYearChange,
      mockOnBlur,
      ...render(
        <ThemeProvider theme={mainTheme}>
          <DateRangePickerFormProvider>
            <DateRangePicker
              name="field1"
              label="Field"
              openCalendarMode="both"
              onChange={mockOnChange}
              onBlur={mockOnBlur}
              onClose={mockOnClose}
              onError={mockOnError}
              onMonthChange={mockOnMonthChange}
              onOpen={mockOnOpen}
              onYearChange={mockOnYearChange}
              {...props}
            />
          </DateRangePickerFormProvider>
        </ThemeProvider>,
      ),
    };
  }

  it('should render without crashing', () => {
    const { getByTestId } = setup();
    expect(getByTestId('daterangepicker')).toBeInTheDocument();
  });

  it('should open the date range picker when clicked', async () => {
    const { getByTestId } = setup();
    const input = getByTestId('daterangepicker-input-from');
    await fireEvent.click(input);
    expect(getByTestId('daterangepicker-calendar')).toBeVisible();
  });

  it('should select a date range', async () => {
    const {
      getByTestId,
      getByRole,
      user,
      mockOnOpen,
      mockOnClose,
      mockOnBlur,
      mockOnChange,
      mockOnError,
      mockOnMonthChange,
      mockOnYearChange,
    } = setup();
    const startDate = getByTestId('daterangepicker-input-from');
    const endDate = getByTestId('daterangepicker-input-to');

    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    await user.click(startDate);

    expect(mockOnClose).toHaveBeenCalledTimes(0);
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledTimes(0);
    expect(mockOnError).toHaveBeenCalledTimes(0);
    expect(mockOnMonthChange).toHaveBeenCalledTimes(0);
    expect(mockOnYearChange).toHaveBeenCalledTimes(0);
    expect(mockOnOpen).toHaveBeenCalledTimes(1);

    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const day15Element = within(dialogEl).getByText(15);
    await user.click(day15Element);

    const day20Element = within(dialogEl).getByText(20);
    await user.click(day20Element);

    const dateFrom = DateTime.now().set({
      day: 15,
    });
    const dateTo = DateTime.now().set({
      day: 20,
    });
    expect(startDate).toHaveValue(
      dateFrom.toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );
    expect(endDate).toHaveValue(
      dateTo.toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );
    expect(mockOnChange).toHaveBeenLastCalledWith([
      dateFrom
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .toJSDate(),
      dateTo
        .set({
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0,
        })
        .toJSDate(),
    ]);
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnBlur).toHaveBeenCalledTimes(2);
    expect(mockOnError).toHaveBeenCalledTimes(0);
  });

  it('should onChange, onMonthChange, onYearChange events be called', async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    const {
      getByTestId,
      getByRole,
      user,
      mockOnMonthChange,
      mockOnYearChange,
    } = setup();
    const startDate = getByTestId('daterangepicker-input-from');
    const endDate = getByTestId('daterangepicker-input-to');

    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    await user.click(startDate);

    expect(mockOnMonthChange).toHaveBeenCalledTimes(0);
    expect(mockOnYearChange).toHaveBeenCalledTimes(0);

    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const previousMonthButton = within(dialogEl).getByTestId('previous-month');
    await user.click(previousMonthButton);

    const day15Element = within(dialogEl).getByText(15);
    await user.click(day15Element);

    await user.click(endDate);

    const dateFrom = DateTime.now().minus({ month: 1 }).set({
      day: 15,
    });
    const dateTo = DateTime.now().plus({ month: 1, year: 1 }).set({
      day: 20,
    });

    const calendarTypeChangeButton = within(dialogEl).getByTestId(
      'calendar-type-change-button',
    );

    const nextMonthButton = within(dialogEl).getByTestId('next-month');
    await user.click(nextMonthButton);

    await user.click(calendarTypeChangeButton);
    const yearNext = within(dialogEl).getByText(dateTo.year);
    await user.click(yearNext);

    const monthNext = within(dialogEl).getByText(dateTo.toFormat('MMM'));
    await user.click(monthNext);

    const day20Element = within(dialogEl).getByText(20);
    await user.click(day20Element);

    expect(startDate).toHaveValue(
      dateFrom.toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );
    expect(endDate).toHaveValue(
      dateTo.toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );

    expect(mockOnMonthChange).toHaveBeenCalledTimes(3);
    expect(mockOnYearChange).toHaveBeenCalledTimes(1);
  });
});
