import { FieldValues, Form, FormProvider, useForm } from 'react-hook-form';
import { DateTime } from 'luxon';
import { fireEvent, render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { DateRangePicker } from '@components';
import { DEFAULT_MASK_FORMAT, DEFAULT_MONTH_MASK_FORMAT } from './constants';
import { DateRangePreset, DateRangePickerProps } from './types';
import {
  DEFAULT_DATE_RANGE_PRESETS,
  currentMonthPreset,
  currentWeekPreset,
  lastMonthPreset,
  lastWeekPreset,
  todayPreset,
  yesterdayPreset,
} from './utils/presets';
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

  it('should open the date range picker when calendar button is clicked', async () => {
    const { getByTestId, user } = setup();
    const calendarButton = getByTestId('daterangepicker-button');
    await user.click(calendarButton);
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

  it('should not render the clear button unless [showClearButton] is set', () => {
    const { queryByTestId } = setup({
      defaultValue: ['01/15/2025', '01/20/2025'],
    });
    expect(
      queryByTestId('daterangepicker-clear-button'),
    ).not.toBeInTheDocument();
  });

  it('should reset both dates to the default when the clear button is clicked', async () => {
    const { user, getByRole, getByTestId, queryByTestId } = setup({
      showClearButton: true,
      defaultValue: ['01/15/2025', '01/20/2025'],
    });

    const fromEl = getByTestId('daterangepicker-input-from');
    const toEl = getByTestId('daterangepicker-input-to');
    // Both fields sit on their defaults, so there is nothing to reset yet.
    expect(
      queryByTestId('daterangepicker-clear-button'),
    ).not.toBeInTheDocument();

    // Start a fresh range from the calendar to move off the defaults.
    await user.click(getByTestId('daterangepicker-button'));
    await user.click(within(getByRole('dialog')).getByText(10));
    expect(fromEl).toHaveValue('01/10/2025');

    await user.click(getByTestId('daterangepicker-clear-button'));

    expect(fromEl).toHaveValue('01/15/2025');
    expect(toEl).toHaveValue('01/20/2025');
    expect(
      queryByTestId('daterangepicker-clear-button'),
    ).not.toBeInTheDocument();
  });

  it('should clear both dates back to empty when there is no [defaultValue]', async () => {
    const { user, getByRole, getByTestId, queryByTestId } = setup({
      showClearButton: true,
    });

    const fromEl = getByTestId('daterangepicker-input-from');
    const toEl = getByTestId('daterangepicker-input-to');
    expect(fromEl).toHaveValue('');
    // Nothing entered yet, so there is nothing to clear.
    expect(
      queryByTestId('daterangepicker-clear-button'),
    ).not.toBeInTheDocument();

    await user.click(getByTestId('daterangepicker-button'));
    const dialogEl = getByRole('dialog');
    await user.click(within(dialogEl).getByText(10));
    await user.click(within(dialogEl).getByText(20));
    expect(fromEl).not.toHaveValue('');
    expect(toEl).not.toHaveValue('');

    await user.click(getByTestId('daterangepicker-clear-button'));

    expect(fromEl).toHaveValue('');
    expect(toEl).toHaveValue('');
    expect(
      queryByTestId('daterangepicker-clear-button'),
    ).not.toBeInTheDocument();
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
    const calendarButton = getByTestId('daterangepicker-button');

    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    await user.click(calendarButton);

    expect(mockOnClose).toHaveBeenCalledTimes(0);
    expect(mockOnBlur).toHaveBeenCalledTimes(0);
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
    expect(mockOnBlur).toHaveBeenCalledTimes(0);
    expect(mockOnError).toHaveBeenCalledTimes(0);
  });

  it('should onChange, onMonthChange, onYearChange events be called', async () => {
    window.HTMLElement.prototype.scrollIntoView = function () {};
    const {
      getByTestId,
      getByRole,
      queryByRole,
      user,
      mockOnMonthChange,
      mockOnYearChange,
    } = setup();
    const startDate = getByTestId('daterangepicker-input-from');
    const endDate = getByTestId('daterangepicker-input-to');
    const calendarButton = getByTestId('daterangepicker-button');

    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    await user.click(calendarButton);

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

    const dateFrom = DateTime.now().minus({ month: 1 }).set({
      day: 15,
    });
    const dateTo = DateTime.now().plus({ month: 1, year: 1 }).set({
      day: 20,
    });

    // Check if calendar is still open, if not click button to reopen
    let dialogEl2 = queryByRole('dialog');
    if (!dialogEl2) {
      await user.click(calendarButton);
      dialogEl2 = await waitFor(() => getByRole('dialog'), { timeout: 2000 });
    }
    const calendarTypeChangeButton = within(dialogEl2).getByTestId(
      'calendar-type-change-button',
    );

    const nextMonthButton = within(dialogEl2).getByTestId('next-year-month');
    await user.click(nextMonthButton);

    await user.click(calendarTypeChangeButton);
    const dialogEl3 = await waitFor(() => getByRole('dialog'));
    const yearNext = within(dialogEl3).getByText(dateTo.year.toString());
    await user.click(yearNext);

    const dialogEl4 = await waitFor(() => getByRole('dialog'));
    const monthNext = within(dialogEl4).getByText(dateTo.toFormat('MMM'));
    await user.click(monthNext);

    const dialogEl5 = await waitFor(() => getByRole('dialog'));
    const day20Element = within(dialogEl5).getByText(20);
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

  it('should keep leading/trailing days from adjacent months clickable', async () => {
    const { getByTestId, getByRole, user } = setup({
      defaultValue: ['07/29/2026', '08/01/2026'],
    });

    await user.click(getByTestId('daterangepicker-button'));
    const dialogEl = getByRole('dialog');

    // Move from the "from" month (July) into the "to" month (August), where
    // 27-31 July are rendered as leading padding days.
    await user.click(within(dialogEl).getByTestId('next-year-month'));

    // Padding days from the adjacent month are real, selectable dates and
    // must not be disabled just for falling outside the displayed month.
    const day27 = within(dialogEl).getAllByText('27')[0];
    const day30 = within(dialogEl).getAllByText('30')[0];
    const day31 = within(dialogEl).getAllByText('31')[0];
    expect(day27).toHaveAttribute('aria-disabled', 'false');
    expect(day30).toHaveAttribute('aria-disabled', 'false');
    expect(day31).toHaveAttribute('aria-disabled', 'false');
  });

  it('should resolve the correct month when a padding day from an adjacent month is clicked', async () => {
    const { getByTestId, getByRole, user } = setup({
      defaultValue: ['07/29/2026', '08/01/2026'],
    });

    await user.click(getByTestId('daterangepicker-button'));
    const dialogEl = getByRole('dialog');

    // View August, where 30-31 July render as leading padding days.
    await user.click(within(dialogEl).getByTestId('next-year-month'));

    // Clicking padding "30" must resolve to 30 Jul (the cell's real date),
    // not 30 Aug (the displayed month). Opening the dialog resets range
    // selection to "start", so this click sets the new start date.
    const day30 = within(dialogEl).getAllByText('30')[0];
    await user.click(day30);

    const startDate = getByTestId('daterangepicker-input-from');
    expect(startDate).toHaveValue('07/30/2026');
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

  it('should not render a "February 29" cell for a non-leap year', async () => {
    const { getByTestId, getByRole, user } = setup({
      defaultValue: ['02/15/2025', '02/20/2025'],
    });
    await user.click(getByTestId('daterangepicker-button'));
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();
    const feb29Cells = within(dialogEl)
      .queryAllByText('29')
      .filter((day) => day.getAttribute('aria-label')?.includes('February 29'));
    expect(feb29Cells).toHaveLength(0);
  });

  it('should render a "February 29" cell for a leap year', async () => {
    const { getByTestId, getByRole, user } = setup({
      defaultValue: ['02/15/2024', '02/20/2024'],
    });
    await user.click(getByTestId('daterangepicker-button'));
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();
    const feb29Cells = within(dialogEl)
      .queryAllByText('29')
      .filter((day) => day.getAttribute('aria-label')?.includes('February 29'));
    expect(feb29Cells).toHaveLength(1);
  });

  it('renders correct months list when month selection mode is active', async () => {
    const { getByTestId, getByRole, user } = setup({
      rangePickerType: 'months',
    });
    await user.click(getByTestId('daterangepicker-button'));
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
    await user.click(getByTestId('daterangepicker-button'));
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
    // Clear mock to only count calls from clicking the day
    mockOnChange.mockClear();
    await user.click(validDay[0]);
    // onChange is called twice: once when clearing 'to' field, once when setting start date
    expect(mockOnChange).toHaveBeenCalledTimes(2);
  });

  it('should select a months range', async () => {
    const { getByTestId, getByRole, queryByRole, user } = setup({
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

    const calendarButton = getByTestId('daterangepicker-button');
    await user.click(calendarButton);
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const march = within(dialogEl).getByText('Mar');
    await user.click(march);
    expect(startDate).toHaveValue(
      dateFrom.toFormat(DEFAULT_MONTH_MASK_FORMAT.replace('mm', 'MM')),
    );

    // Check if calendar is still open, if not click button to reopen
    let dialogEl2 = queryByRole('dialog');
    if (!dialogEl2) {
      await user.click(calendarButton);
      dialogEl2 = await waitFor(() => getByRole('dialog'), { timeout: 2000 });
    }
    expect(dialogEl2).toBeInTheDocument();
    const june = within(dialogEl2).getByText('Jun');
    await user.click(june);

    expect(endDate).toHaveValue(
      dateTo.toFormat(DEFAULT_MONTH_MASK_FORMAT.replace('mm', 'MM')),
    );
  });

  it('should update start date and end date when selecting a date earlier than current start date and after than current end date', async () => {
    const { getByTestId, getByRole, queryByRole, user } = setup({
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

    const calendarButton = getByTestId('daterangepicker-button');
    await user.click(calendarButton);
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

    // Check if calendar is still open, if not click button to reopen
    let dialogEl2 = queryByRole('dialog');
    if (!dialogEl2) {
      await user.click(calendarButton);
      dialogEl2 = await waitFor(() => getByRole('dialog'), { timeout: 2000 });
    }
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

  it('should update start date when end date is selected earlier than start date', async () => {
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
    const calendarButton = getByTestId('daterangepicker-button');

    await user.click(endDate);
    await user.click(calendarButton);
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const day10Element = within(dialogEl).getAllByText('10');
    const enabledDay10 = day10Element.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    expect(enabledDay10.length).toBeGreaterThanOrEqual(1);
    await user.click(enabledDay10[0]);

    // When selecting end date earlier than start,
    // the start date is updated to the earlier date and end date is cleared
    expect(startDate).toHaveValue(
      DateTime.now()
        .set({ day: 10 })
        .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );
    expect(endDate).toHaveValue('');
  });

  it('should clear end date when start date is selected later than end date', async () => {
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
    const calendarButton = getByTestId('daterangepicker-button');

    await user.click(startDate);
    await user.click(calendarButton);
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const day25Element = within(dialogEl).getAllByText('25');
    const enabledDay25 = day25Element.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    expect(enabledDay25.length).toBeGreaterThanOrEqual(1);
    await user.click(enabledDay25[0]);

    // When selecting a date when both dates are set and rangeSelectionStep is 'start',
    // it updates the start date to the new value and clears the end date
    // Since we selected 25 as the start date, start becomes 25 and end is cleared
    expect(startDate).toHaveValue(
      DateTime.now()
        .set({ day: 25 })
        .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );
    expect(endDate).toHaveValue('');
  });

  it('should auto-swap dates when allowReverseSelection is true', async () => {
    const { getByTestId, getByRole, queryByRole, user } = setup({
      allowReverseSelection: true,
    });

    const startDate = getByTestId('daterangepicker-input-from');
    const endDate = getByTestId('daterangepicker-input-to');
    const calendarButton = getByTestId('daterangepicker-button');

    // Open calendar and select first date (day 15)
    await user.click(calendarButton);
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const day15Element = within(dialogEl).getAllByText('15');
    const enabledDay15 = day15Element.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    expect(enabledDay15.length).toBeGreaterThanOrEqual(1);
    await user.click(enabledDay15[0]);

    // Calendar should still be open (waiting for end date)
    expect(getByRole('dialog')).toBeInTheDocument();

    // Select an earlier date (day 10) - should auto-swap
    const day10Element = within(dialogEl).getAllByText('10');
    const enabledDay10 = day10Element.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    expect(enabledDay10.length).toBeGreaterThanOrEqual(1);
    await user.click(enabledDay10[0]);

    // When allowReverseSelection is true: dates are auto-swapped when selected in reverse order
    expect(startDate).toHaveValue(
      DateTime.now()
        .set({ day: 10 })
        .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );
    expect(endDate).toHaveValue(
      DateTime.now()
        .set({ day: 15 })
        .toFormat(DEFAULT_MASK_FORMAT.replace('mm', 'MM')),
    );
    // Calendar should be closed after auto-swap
    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should set end date to null when "Present" button is clicked', async () => {
    const { getByTestId, getByRole, user, mockOnChange } = setup({
      showPresentOption: true,
      defaultValue: ['01/15/2025', '01/20/2025'],
    });

    const endDate = getByTestId('daterangepicker-input-to');
    const calendarButton = getByTestId('daterangepicker-button');

    // Open calendar - it always starts with start date selection
    await user.click(calendarButton);
    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    // Select a start date first (this switches to end date selection mode)
    // Calendar stays open after selecting start date
    const day15Element = within(dialogEl).getAllByText('15');
    const enabledDay15 = day15Element.filter(
      (day) => day.getAttribute('aria-disabled') === 'false',
    );
    expect(enabledDay15.length).toBeGreaterThanOrEqual(1);
    await user.click(enabledDay15[0]);

    // Now we're selecting end date, so "Present" button should be enabled
    const presentButton = getByTestId('daterangepicker-present-button');
    expect(presentButton).toBeInTheDocument();
    expect(presentButton).not.toBeDisabled();
    await user.click(presentButton);

    // End date should show "Present"
    await waitFor(() => {
      expect(endDate).toHaveValue('Present');
    });

    // onChange should be called with null for end date
    expect(mockOnChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.any(Date), // start date
        null, // end date (null means "Present")
      ]),
    );
  });

  describe('presets', () => {
    const fixedPreset: DateRangePreset = {
      label: 'Fixed range',
      dateRange: [new Date(2025, 0, 10), new Date(2025, 0, 20)],
    };

    const openCalendar = async (
      user: ReturnType<typeof userEvent.setup>,
      getByTestId: (id: string) => HTMLElement,
    ) => {
      await user.click(getByTestId('daterangepicker-button'));
    };

    it('should not render the presets panel when [presets] is omitted', async () => {
      const { user, getByTestId, queryByTestId } = setup();
      await openCalendar(user, getByTestId);
      expect(queryByTestId('daterangepicker-presets')).not.toBeInTheDocument();
    });

    it('should not render the presets panel for an empty [presets] array', async () => {
      const { user, getByTestId, queryByTestId } = setup({ presets: [] });
      await openCalendar(user, getByTestId);
      expect(queryByTestId('daterangepicker-presets')).not.toBeInTheDocument();
    });

    it('should render one item per preset', async () => {
      const { user, getByTestId, getByRole } = setup({
        presets: DEFAULT_DATE_RANGE_PRESETS,
      });
      await openCalendar(user, getByTestId);

      const panel = getByTestId('daterangepicker-presets');
      expect(panel).toBeVisible();
      expect(within(panel).getAllByRole('button')).toHaveLength(
        DEFAULT_DATE_RANGE_PRESETS.length,
      );
      expect(
        within(getByRole('dialog')).getByText('Current month'),
      ).toBeInTheDocument();
    });

    it('should apply the range to both inputs and emit onChange when a preset is clicked', async () => {
      const { user, getByTestId, mockOnChange } = setup({
        presets: [fixedPreset],
      });
      await openCalendar(user, getByTestId);
      await user.click(getByTestId('daterangepicker-preset-0'));

      await waitFor(() => {
        expect(getByTestId('daterangepicker-input-from')).toHaveValue(
          '01/10/2025',
        );
      });
      expect(getByTestId('daterangepicker-input-to')).toHaveValue('01/20/2025');
      expect(mockOnChange).toHaveBeenCalledWith([
        new Date(2025, 0, 10),
        new Date(2025, 0, 20),
      ]);
    });

    it('should keep the calendar open after applying a preset', async () => {
      const { user, getByTestId } = setup({ presets: [fixedPreset] });
      await openCalendar(user, getByTestId);
      await user.click(getByTestId('daterangepicker-preset-0'));

      expect(getByTestId('daterangepicker-calendar')).toBeVisible();
    });

    it('should mark the matching preset as pressed and unmark the others', async () => {
      const { user, getByTestId } = setup({
        presets: [fixedPreset, todayPreset],
      });
      await openCalendar(user, getByTestId);

      expect(getByTestId('daterangepicker-preset-0')).toHaveAttribute(
        'aria-pressed',
        'false',
      );

      await user.click(getByTestId('daterangepicker-preset-0'));

      await waitFor(() => {
        expect(getByTestId('daterangepicker-preset-0')).toHaveAttribute(
          'aria-pressed',
          'true',
        );
      });
      expect(getByTestId('daterangepicker-preset-1')).toHaveAttribute(
        'aria-pressed',
        'false',
      );
    });

    it('should start a new range when a day is clicked after a preset', async () => {
      const { user, getByTestId, getByRole } = setup({
        presets: [fixedPreset],
      });
      await openCalendar(user, getByTestId);
      await user.click(getByTestId('daterangepicker-preset-0'));

      await waitFor(() => {
        expect(getByTestId('daterangepicker-input-to')).toHaveValue(
          '01/20/2025',
        );
      });

      // The calendar view sits on January 2025 after the preset, so day 5 is
      // the start of a brand-new range rather than the end of the preset one.
      const day5 = within(getByRole('dialog'))
        .getAllByText('5')
        .filter((day) => day.getAttribute('aria-disabled') === 'false');
      await user.click(day5[0]);

      await waitFor(() => {
        expect(getByTestId('daterangepicker-input-from')).toHaveValue(
          '01/05/2025',
        );
      });
      expect(getByTestId('daterangepicker-input-to')).toHaveValue('');
    });

    // Only the day grid labels its cells with a full date, so their presence
    // is what tells the three calendar views apart.
    const dayCells = (dialogEl: HTMLElement) =>
      within(dialogEl).queryAllByLabelText(/^\w+, \w+ \d{1,2}, \d{4}$/);

    it('should return to the day grid when a preset is applied from a drilled-down view', async () => {
      const { user, getByTestId, getByRole } = setup({
        presets: [fixedPreset],
      });
      await openCalendar(user, getByTestId);
      const dialogEl = getByRole('dialog');
      expect(dayCells(dialogEl).length).toBeGreaterThan(0);

      // Drill down into the year grid — the day cells go away with it.
      await user.click(getByTestId('calendar-type-change-button'));
      expect(dayCells(dialogEl)).toHaveLength(0);

      await user.click(getByTestId('daterangepicker-preset-0'));

      // The applied range has to be visible where the user can adjust it.
      await waitFor(() => {
        expect(dayCells(dialogEl).length).toBeGreaterThan(0);
      });
    });

    it('should return to the base view of the picker type, not the day grid', async () => {
      const { user, getByTestId, getByRole } = setup({
        rangePickerType: 'months',
        presets: [fixedPreset],
      });
      await openCalendar(user, getByTestId);
      await user.click(getByTestId('calendar-type-change-button'));

      const dialogEl = getByRole('dialog');
      expect(within(dialogEl).queryByText('Jan')).not.toBeInTheDocument();

      await user.click(getByTestId('daterangepicker-preset-0'));

      // A months picker goes back to its month grid — never to a day grid it
      // does not use.
      await waitFor(() => {
        expect(within(dialogEl).getByText('Jan')).toBeInTheDocument();
      });
      expect(dayCells(dialogEl)).toHaveLength(0);
    });

    it('should swap a reversed preset range', async () => {
      const { user, getByTestId } = setup({
        presets: [
          {
            label: 'Reversed',
            dateRange: [new Date(2025, 0, 20), new Date(2025, 0, 10)],
          },
        ],
      });
      await openCalendar(user, getByTestId);
      await user.click(getByTestId('daterangepicker-preset-0'));

      await waitFor(() => {
        expect(getByTestId('daterangepicker-input-from')).toHaveValue(
          '01/10/2025',
        );
      });
      expect(getByTestId('daterangepicker-input-to')).toHaveValue('01/20/2025');
    });

    it('should clamp a preset range to [dateMin] / [dateMax]', async () => {
      const { user, getByTestId } = setup({
        dateMin: '01/12/2025',
        dateMax: '01/18/2025',
        presets: [fixedPreset],
      });
      await openCalendar(user, getByTestId);
      await user.click(getByTestId('daterangepicker-preset-0'));

      await waitFor(() => {
        expect(getByTestId('daterangepicker-input-from')).toHaveValue(
          '01/12/2025',
        );
      });
      expect(getByTestId('daterangepicker-input-to')).toHaveValue('01/18/2025');
    });

    it('should ignore a preset range that falls entirely outside the bounds', async () => {
      const { user, getByTestId, mockOnChange } = setup({
        dateMin: '01/01/2026',
        dateMax: '12/31/2026',
        presets: [fixedPreset],
      });
      await openCalendar(user, getByTestId);
      await user.click(getByTestId('daterangepicker-preset-0'));

      expect(getByTestId('daterangepicker-input-from')).toHaveValue('');
      expect(getByTestId('daterangepicker-input-to')).toHaveValue('');
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should resolve a function preset at click time', async () => {
      const dateRange = jest.fn(
        () => [new Date(2025, 0, 10), new Date(2025, 0, 20)] as [Date, Date],
      );
      const { user, getByTestId } = setup({
        presets: [{ label: 'Lazy', dateRange }],
      });
      await openCalendar(user, getByTestId);
      expect(dateRange).toHaveBeenCalled();

      await user.click(getByTestId('daterangepicker-preset-0'));
      await waitFor(() => {
        expect(getByTestId('daterangepicker-input-from')).toHaveValue(
          '01/10/2025',
        );
      });
    });
  });

  describe('built-in presets', () => {
    beforeEach(() => {
      // Wednesday, 15 July 2026 — mid-week and mid-month, so week and month
      // boundaries are unambiguous.
      jest.useFakeTimers({ doNotFake: ['nextTick'] });
      jest.setSystemTime(new Date(2026, 6, 15, 12, 0, 0));
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    const resolve = (preset: DateRangePreset) =>
      (typeof preset.dateRange === 'function'
        ? preset.dateRange()
        : preset.dateRange
      ).map((date) => DateTime.fromJSDate(date).toFormat('MM/dd/yyyy'));

    it.each([
      ['Today', todayPreset, ['07/15/2026', '07/15/2026']],
      ['Yesterday', yesterdayPreset, ['07/14/2026', '07/14/2026']],
      ['Current week', currentWeekPreset, ['07/13/2026', '07/19/2026']],
      ['Last week', lastWeekPreset, ['07/06/2026', '07/12/2026']],
      ['Current month', currentMonthPreset, ['07/01/2026', '07/31/2026']],
      ['Last month', lastMonthPreset, ['06/01/2026', '06/30/2026']],
    ])(
      'should resolve "%s" relative to the current date',
      (_label, preset, expected) => {
        expect(resolve(preset)).toEqual(expected);
      },
    );

    it('should normalize both ends to midnight so a preset matches a hand-picked range', () => {
      const [from, to] = (currentMonthPreset.dateRange as () => [Date, Date])();
      [from, to].forEach((date) => {
        expect([
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds(),
        ]).toEqual([0, 0, 0, 0]);
      });
    });
  });
});
