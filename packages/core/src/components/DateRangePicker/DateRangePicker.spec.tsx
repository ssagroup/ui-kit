import { FieldValues, Form, FormProvider, useForm } from 'react-hook-form';
import { DateTime } from 'luxon';
import { fireEvent, render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { DateRangePicker } from './DateRangePicker';
import { DEFAULT_MASK_FORMAT } from './constants';
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
              rangePickerType="days"
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

  it('should render default state (no range selected)', () => {
    const { getByTestId } = setup();
    expect(getByTestId('daterangepicker-input-from')).toHaveValue('');
    expect(getByTestId('daterangepicker-input-to')).toHaveValue('');
  });

  it('should render with a default value', () => {
    const { getByTestId } = setup({
      defaultValue: ['01/15/2025', '01/20/2025'],
    });
    const inputEl = getByTestId('daterangepicker-input-from');
    expect(inputEl).toHaveAttribute('placeholder', 'mm/dd/yyyy');
    expect(inputEl).toHaveValue('01/15/2025');
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

    const previousMonthButton = within(dialogEl).getByTestId(
      'previous-year-month',
    );
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

    const nextMonthButton = within(dialogEl).getByTestId('next-year-month');
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

  it('should not render description, success, or error fields when "messages" prop is not passed', () => {
    const { queryByTestId } = setup();
    expect(queryByTestId('field-description')).not.toBeInTheDocument();
    expect(queryByTestId('field-success')).not.toBeInTheDocument();
    expect(queryByTestId('field-error')).not.toBeInTheDocument();
  });

  it('should render "field-description" with correct text when "messages.description" is passed', () => {
    const descriptionText = 'This is a description';
    const { getByTestId } = setup({
      messages: { description: descriptionText },
    });
    const descriptionField = getByTestId('field-description');
    expect(descriptionField).toBeInTheDocument();
    expect(descriptionField).toHaveTextContent(descriptionText);
  });

  it('should render "field-success" with correct text when "messages.success" is passed', () => {
    const successText = 'This is a success message';
    const { getByTestId } = setup({
      messages: { success: successText },
      status: 'success',
    });
    const successField = getByTestId('field-success');
    expect(successField).toBeInTheDocument();
    expect(successField).toHaveTextContent(successText);
  });

  it('should render "field-error" with correct text when "messages.defaultError" is passed', () => {
    const errorText = 'This is an error message';
    const { getByTestId } = setup({
      messages: { error: errorText },
      status: 'error',
    });
    const errorField = getByTestId('field-error');
    expect(errorField).toBeInTheDocument();
    expect(errorField).toHaveTextContent(errorText);
  });

  it('should not open the date range picker when disabled', async () => {
    const { getByTestId } = setup({ disabled: true });
    const input = getByTestId('daterangepicker-input-from');
    await fireEvent.click(input);
    expect(input).toBeDisabled();
  });

  it('should call onError when an invalid date is entered', async () => {
    const { getByTestId, mockOnError, user } = setup();
    const startDate = getByTestId('daterangepicker-input-from');
    await user.clear(startDate);
    await user.type(startDate, '12/12/202');
    await user.tab();
    expect(mockOnError).toHaveBeenCalledTimes(1);
  });

  it('should renders correct number of days for February (non-leap year)', async () => {
    const { getByTestId, getByRole, user } = setup({
      defaultValue: ['02/15/2025', '02/20/2025'],
    });
    await user.click(getByTestId('daterangepicker-input-from'));
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();
    const days = within(dialogEl).queryAllByText('29');
    const activeDays = days.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    expect(activeDays).toHaveLength(0);
  });

  it('should renders correct number of days for February (leap year)', async () => {
    const { getByTestId, getByRole, user } = setup({
      defaultValue: ['02/15/2024', '02/20/2024'],
    });
    await user.click(getByTestId('daterangepicker-input-from'));
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();
    const days = within(dialogEl).queryAllByText('29');
    const activeDays = days.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    expect(activeDays).toHaveLength(1);
  });

  it('renders correct months list when month selection mode is active', async () => {
    const { getByTestId, getByRole, user } = setup({
      rangePickerType: 'months',
    });
    await user.click(getByTestId('daterangepicker-input-from'));
    const dialogEl = getByRole('dialog');
    [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ].forEach((month) => {
      expect(within(dialogEl).getByText(month)).toBeInTheDocument();
    });
  });

  it('should not select a date greater than max date or less than min date if provided', async () => {
    const minDate = DateTime.local().set({ day: 10 });
    const maxDate = DateTime.local().set({ day: 20 });
    const { getByTestId, getByRole, user, mockOnChange } = setup({
      dateMin: minDate.toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
      dateMax: maxDate.toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    });
    await user.click(getByTestId('daterangepicker-input-from'));
    const dialogEl = getByRole('dialog');
    const beforeMin = within(dialogEl).getAllByText('9');
    const beforeMinDays = beforeMin.filter(
      (day) => day.getAttribute('aria-disabled') === 'true',
    );
    expect(beforeMinDays.length).toBeGreaterThanOrEqual(1);

    const afterMax = within(dialogEl).getAllByText('21');
    const afterMaxDays = afterMax.filter(
      (day) => day.getAttribute('aria-disabled') === 'true',
    );
    expect(afterMaxDays.length).toBeGreaterThanOrEqual(1);

    const active = within(dialogEl).getAllByText('15');
    const validDay = active.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    await user.click(validDay[0]);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should select a months range', async () => {
    const { getByTestId, getByRole, user } = setup({
      rangePickerType: 'months',
    });

    const startDate = getByTestId('daterangepicker-input-from');
    const endDate = getByTestId('daterangepicker-input-to');

    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    const dateFrom = DateTime.now().set({
      day: 1,
      month: 3,
    });
    const dateTo = DateTime.now().set({
      day: 30,
      month: 6,
    });

    await user.click(startDate);
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const march = within(dialogEl).getByText('Mar');
    await user.click(march);
    expect(startDate).toHaveValue(
      dateFrom.toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );

    await user.click(endDate);
    expect(dialogEl).toBeInTheDocument();
    const june = within(dialogEl).getByText('Jun');
    await user.click(june);

    expect(endDate).toHaveValue(
      dateTo.toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );
  });

  it('should update start date and end date when selecting a date earlier than current start date and after than current end date', async () => {
    const { getByTestId, getByRole, user } = setup({
      value: [
        DateTime.now()
          .set({
            day: 15,
          })
          .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
        DateTime.now()
          .set({
            day: 20,
          })
          .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
      ],
    });

    const startDate = getByTestId('daterangepicker-input-from');
    const endDate = getByTestId('daterangepicker-input-to');

    const dateFrom = DateTime.now().set({
      day: 10,
    });
    const dateTo = DateTime.now().set({
      day: 25,
    });

    await user.click(startDate);
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const day10Element = within(dialogEl).getAllByText('10');
    const enabledDay10 = day10Element.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    expect(enabledDay10.length).toBeGreaterThanOrEqual(1);
    await user.click(enabledDay10[0]);

    expect(startDate).toHaveValue(
      dateFrom.toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );

    await user.click(endDate);
    const dialogEl2 = getByRole('dialog');
    expect(dialogEl2).toBeInTheDocument();

    const day25Element = within(dialogEl2).getAllByText('25');
    const enabledDay25 = day25Element.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    expect(enabledDay25.length).toBeGreaterThanOrEqual(1);
    await user.click(enabledDay25[0]);

    expect(endDate).toHaveValue(
      dateTo.toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );
  });

  it('should clear start date if end date is selected earlier than start date', async () => {
    const { getByTestId, getByRole, user } = setup({
      value: [
        DateTime.now()
          .set({
            day: 15,
          })
          .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
        DateTime.now()
          .set({
            day: 20,
          })
          .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
      ],
    });

    const startDate = getByTestId('daterangepicker-input-from');
    const endDate = getByTestId('daterangepicker-input-to');

    await user.click(endDate);
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const day10Element = within(dialogEl).getAllByText('10');
    const enabledDay10 = day10Element.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    expect(enabledDay10.length).toBeGreaterThanOrEqual(1);
    await user.click(enabledDay10[0]);

    expect(startDate).toHaveValue('');
    expect(endDate).toHaveValue(
      DateTime.now()
        .set({ day: 10 })
        .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );
  });

  it('should clear end date if start date is selected later than end date', async () => {
    const { getByTestId, getByRole, user } = setup({
      value: [
        DateTime.now()
          .set({
            day: 15,
          })
          .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
        DateTime.now()
          .set({
            day: 20,
          })
          .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
      ],
    });

    const startDate = getByTestId('daterangepicker-input-from');
    const endDate = getByTestId('daterangepicker-input-to');

    await user.click(startDate);
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const day25Element = within(dialogEl).getAllByText('25');
    const enabledDay25 = day25Element.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    expect(enabledDay25.length).toBeGreaterThanOrEqual(1);
    await user.click(enabledDay25[0]);

    expect(startDate).toHaveValue(
      DateTime.now()
        .set({ day: 25 })
        .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );
    expect(endDate).toHaveValue('');
  });
});
