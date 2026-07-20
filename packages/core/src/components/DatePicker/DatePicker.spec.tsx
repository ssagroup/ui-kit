import { DateTime } from 'luxon';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import { DatePicker } from '.';
import { DatePickerProps } from './types';
import { PICKER_TYPE } from './constants';

const ResponsivePieMock = () => <div data-testid="responsive-pie"></div>;

jest.mock('@nivo/pie', () => ({
  PieCustomLayerProps: {},
  ResponsivePie: ResponsivePieMock,
}));

describe('DatePicker', () => {
  beforeAll(() => {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  function setup(props: Partial<DatePickerProps> = {}) {
    const mockOnChange = jest.fn();
    const mockOnOpen = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnError = jest.fn();
    const mockOnMonthChange = jest.fn();
    const mockOnYearChange = jest.fn();
    const mockOnBlur = jest.fn();

    const DatePickerFormProvider = ({ children }: React.PropsWithChildren) => {
      const storyDate = DateTime.fromFormat(
        '2025-01-15',
        'yyyy-MM-dd',
      ).toFormat('MM/dd/yyyy');
      const useFormResult = useForm<FieldValues>({
        defaultValues: {
          field1: storyDate,
        },
      });
      return <FormProvider {...useFormResult}>{children}</FormProvider>;
    };

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
        <DatePickerFormProvider>
          <DatePicker
            name="field1"
            label="Field"
            onChange={mockOnChange}
            onBlur={mockOnBlur}
            onClose={mockOnClose}
            onError={mockOnError}
            onMonthChange={mockOnMonthChange}
            onOpen={mockOnOpen}
            onYearChange={mockOnYearChange}
            {...props}
          />
        </DatePickerFormProvider>,
      ),
    };
  }

  it('Does not render the time panel unless [showTimePicker] is set', async () => {
    const { user, getByTestId, queryByTestId } = setup();

    await user.click(getByTestId('datepicker-button'));

    expect(queryByTestId('datepicker-time-panel')).not.toBeInTheDocument();
    expect(getByTestId('datepicker-input')).toHaveAttribute(
      'placeholder',
      'mm/dd/yyyy',
    );
  });

  it('Appends HH:mm to the mask and keeps the time on the emitted date', async () => {
    const { user, getByRole, getByTestId, mockOnChange } = setup({
      showTimePicker: true,
      minuteStep: 15,
      // Once time is on, values must carry it — a bare date no longer matches
      // the mask length and would not parse.
      defaultValue: '01/15/2025 08:00',
    });

    const inputEl = getByTestId('datepicker-input');
    expect(inputEl).toHaveAttribute('placeholder', 'mm/dd/yyyy HH:mm');
    expect(inputEl).toHaveValue('01/15/2025 08:00');

    await user.click(getByTestId('datepicker-button'));
    const dialogEl = getByRole('dialog');

    // Picking a day must NOT close the popover, or the time panel would be
    // unreachable. Matched by aria-label because the time panel's hour cells
    // render the same bare numbers as the day cells.
    await user.click(within(dialogEl).getByLabelText(/January 21, 2025/));
    expect(getByTestId('datepicker-time-panel')).toBeInTheDocument();

    await user.click(within(dialogEl).getByLabelText('09 hours'));
    await user.click(within(dialogEl).getByLabelText('45 minutes'));

    expect(inputEl).toHaveValue('01/21/2025 09:45');

    const emitted = mockOnChange.mock.calls.at(-1)?.[0] as Date;
    expect(emitted.getHours()).toBe(9);
    expect(emitted.getMinutes()).toBe(45);
  });

  it('Honours [minuteStep] when building the minutes column', async () => {
    const { user, getByRole, getByTestId, queryByLabelText } = setup({
      showTimePicker: true,
      minuteStep: 30,
    });

    await user.click(getByTestId('datepicker-button'));
    const dialogEl = getByRole('dialog');

    expect(within(dialogEl).getByLabelText('00 minutes')).toBeInTheDocument();
    expect(within(dialogEl).getByLabelText('30 minutes')).toBeInTheDocument();
    expect(queryByLabelText('15 minutes')).not.toBeInTheDocument();
  });

  it('Does not render the clear button unless [showClearButton] is set', () => {
    const { queryByTestId } = setup();

    expect(queryByTestId('datepicker-clear-button')).not.toBeInTheDocument();
  });

  it('Clear button empties the field when there is no [defaultValue]', async () => {
    const { user, getByTestId, queryByTestId, mockOnChange } = setup({
      showClearButton: true,
    });

    // The form seeds field1 with 01/15/2025, so the field starts dirty.
    const inputEl = getByTestId('datepicker-input');
    expect(inputEl).toHaveValue('01/15/2025');

    await user.click(getByTestId('datepicker-clear-button'));

    expect(inputEl).toHaveValue('');
    expect(mockOnChange).toHaveBeenCalledWith(undefined);
    // Nothing left to undo, so the button hides again.
    expect(queryByTestId('datepicker-clear-button')).not.toBeInTheDocument();
  });

  it('Clear button restores [defaultValue] and then hides', async () => {
    const { user, getByRole, getByTestId, queryByTestId } = setup({
      showClearButton: true,
      defaultValue: '03/20/2025',
    });

    const inputEl = getByTestId('datepicker-input');
    expect(inputEl).toHaveValue('03/20/2025');
    // Value matches the default, so there is nothing to reset.
    expect(queryByTestId('datepicker-clear-button')).not.toBeInTheDocument();

    // Pick a different day from the calendar to make the field dirty.
    await user.click(getByTestId('datepicker-button'));
    await user.click(within(getByRole('dialog')).getByText(21));
    expect(inputEl).toHaveValue('03/21/2025');

    await user.click(getByTestId('datepicker-clear-button'));

    expect(inputEl).toHaveValue('03/20/2025');
    expect(queryByTestId('datepicker-clear-button')).not.toBeInTheDocument();
  });

  it('Renders helper text in the success state when [success] is set', () => {
    const { getByRole } = setup({
      success: true,
      helperText: 'Looks good',
    });

    const helperEl = getByRole('status');
    expect(helperEl).toHaveTextContent('Looks good');
    // palette.success.dark
    expect(helperEl).toHaveStyle('color: rgb(36, 135, 72)');
  });

  it('Renders helper text in the basic state when [success] is not set', () => {
    const { getByRole } = setup({ helperText: 'Pick a date' });

    const helperEl = getByRole('status');
    expect(helperEl).toHaveTextContent('Pick a date');
    // colors.greyDarker80
    expect(helperEl).toHaveStyle('color: rgba(43, 45, 49, 0.8)');
  });

  it('Renders with a default placeholder', () => {
    const {
      mockOnBlur,
      mockOnClose,
      mockOnMonthChange,
      mockOnOpen,
      mockOnYearChange,
      getByTestId,
    } = setup();

    expect(mockOnBlur).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
    expect(mockOnMonthChange).not.toHaveBeenCalled();
    expect(mockOnOpen).not.toHaveBeenCalled();
    expect(mockOnYearChange).not.toHaveBeenCalled();

    const inputEl = getByTestId('datepicker-input');
    expect(inputEl).toHaveAttribute('placeholder', 'mm/dd/yyyy');
    expect(inputEl).toHaveValue('01/15/2025');
  });

  it('Open, close, and change events must be called', async () => {
    const {
      user,
      mockOnClose,
      mockOnOpen,
      mockOnChange,
      getByRole,
      queryByRole,
      getByTestId,
    } = setup();

    const inputEl = getByTestId('datepicker-input');
    expect(inputEl).toHaveAttribute('placeholder', 'mm/dd/yyyy');
    expect(inputEl).toHaveValue('01/15/2025');

    await user.click(inputEl);
    expect(mockOnOpen).not.toHaveBeenCalled();

    const buttonEl = getByTestId('datepicker-button');
    await user.click(buttonEl);
    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    expect(mockOnClose).not.toHaveBeenCalled();

    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const dayEl = within(dialogEl).getByText(15);
    await user.click(dayEl);

    const dialogEl2 = queryByRole('dialog');
    expect(dialogEl2).toBeNull();

    expect(mockOnOpen).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('Month change event must be called', async () => {
    const { user, mockOnMonthChange, getByRole, getByTestId } = setup();

    const buttonEl = getByTestId('datepicker-button');
    await user.click(buttonEl);

    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const calendarTypeChangeButton = within(dialogEl).getByTestId(
      'calendar-type-change-button',
    );
    expect(calendarTypeChangeButton.textContent).toEqual('January 2025');

    const previousMonthButton = within(dialogEl).getByTestId('previous-month');
    await user.click(previousMonthButton);
    expect(
      within(dialogEl).getByTestId('calendar-type-change-button').textContent,
    ).toEqual('December 2024');

    const nextMonthButton = within(dialogEl).getByTestId('next-month');
    await user.click(nextMonthButton);
    expect(
      within(dialogEl).getByTestId('calendar-type-change-button').textContent,
    ).toEqual('January 2025');

    expect(mockOnMonthChange).toHaveBeenCalledTimes(2);
  });

  it('Year change event must be called', async () => {
    const { user, mockOnYearChange, getByRole, getByTestId } = setup();

    const buttonEl = getByTestId('datepicker-button');
    await user.click(buttonEl);

    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const calendarTypeChangeButton = within(dialogEl).getByTestId(
      'calendar-type-change-button',
    );
    expect(calendarTypeChangeButton.textContent).toEqual('January 2025');

    // First click: days -> months
    await user.click(calendarTypeChangeButton);
    expect(
      within(dialogEl).queryByText('Jan', { exact: true }),
    ).toBeInTheDocument();

    // Second click: months -> years
    await user.click(calendarTypeChangeButton);

    const year2026 = within(dialogEl).getByText('2026');
    await user.click(year2026);

    // After selecting year, it returns to months view
    const monthFeb = within(dialogEl).getByText('Feb', { exact: true });
    await user.click(monthFeb);

    // After selecting month, it returns to days view
    const day15 = within(dialogEl).getByText('15');
    await user.click(day15);

    const inputEl = getByTestId('datepicker-input');
    expect(inputEl).toHaveValue('02/15/2026');

    expect(mockOnYearChange).toHaveBeenCalledTimes(1);
  });

  // it('Error event must be called', () => {
  //   const { user, mockOnError, getByTestId } = setup();

  //   const inputEl = getByTestId('datepicker-input');
  //   expect(inputEl).toHaveValue('01/15/2025');

  //   user.type(inputEl, '02/31/2025');
  //   user.tab();

  //   expect(mockOnError).toHaveBeenCalledTimes(1);
  // });

  it('Events must not be called [disabled]', async () => {
    const { user, mockOnOpen, getByTestId } = setup({
      disabled: true,
    });
    const buttonEl = getByTestId('datepicker-button');
    await user.click(buttonEl);
    expect(mockOnOpen).toHaveBeenCalledTimes(0);
  });

  it('Month view: shows months and closes calendar on month selection', async () => {
    const {
      user,
      mockOnChange,
      mockOnMonthChange,
      getByRole,
      queryByRole,
      getByTestId,
    } = setup({
      pickerType: PICKER_TYPE.MONTHS,
      defaultValue: '04/2025',
    });

    const inputEl = getByTestId('datepicker-input');
    expect(inputEl).toHaveAttribute('placeholder', 'mm/yyyy');

    const buttonEl = getByTestId('datepicker-button');
    await user.click(buttonEl);

    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    // Should show months view
    const monthEl = within(dialogEl).getByText('May', { exact: true });
    await user.click(monthEl);

    // Calendar should close after selecting a month
    const dialogEl2 = queryByRole('dialog');
    expect(dialogEl2).toBeNull();

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnMonthChange).toHaveBeenCalled();
  });

  it('Month view: navigates between months and years', async () => {
    const { user, getByRole, getByTestId } = setup({
      pickerType: PICKER_TYPE.MONTHS,
      defaultValue: '04/2025',
    });

    const buttonEl = getByTestId('datepicker-button');
    await user.click(buttonEl);

    const dialogEl = getByRole('dialog');
    const calendarTypeChangeButton = within(dialogEl).getByTestId(
      'calendar-type-change-button',
    );

    // Should show month and year
    expect(calendarTypeChangeButton.textContent).toContain('2025');

    // Click to go to years view
    await user.click(calendarTypeChangeButton);
    expect(calendarTypeChangeButton.textContent).toBe('2025');

    // Click again to go back to months view
    await user.click(calendarTypeChangeButton);
    expect(calendarTypeChangeButton.textContent).toContain('2025');
  });

  it('Year view: shows years and closes calendar on year selection', async () => {
    const {
      user,
      mockOnChange,
      mockOnYearChange,
      getByRole,
      queryByRole,
      getByTestId,
    } = setup({
      pickerType: PICKER_TYPE.YEARS,
      defaultValue: '2025',
    });

    const inputEl = getByTestId('datepicker-input');
    expect(inputEl).toHaveAttribute('placeholder', 'yyyy');

    const buttonEl = getByTestId('datepicker-button');
    await user.click(buttonEl);

    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    // Should show years view
    const yearEl = within(dialogEl).getByText('2026');
    await user.click(yearEl);

    // Calendar should close after selecting a year
    const dialogEl2 = queryByRole('dialog');
    expect(dialogEl2).toBeNull();

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnYearChange).toHaveBeenCalled();
  });
});
