import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import { DateTime } from 'luxon';

import { within } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { DatePickerProps } from './types';

import { DatePicker } from '.';

const ResponsivePieMock = () => <div data-testid="responsive-pie"></div>;

jest.mock('@nivo/pie', () => ({
  PieCustomLayerProps: {},
  ResponsivePie: ResponsivePieMock,
}));

describe('DatePicker', () => {
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
    const scrollIntoViewFn = window.HTMLElement.prototype.scrollIntoView;
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
    const { user, mockOnYearChange, getByRole, getByTestId } = setup();

    const buttonEl = getByTestId('datepicker-button');
    await user.click(buttonEl);

    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const calendarTypeChangeButton = within(dialogEl).getByTestId(
      'calendar-type-change-button',
    );
    expect(calendarTypeChangeButton.textContent).toEqual('January 2025');

    await user.click(calendarTypeChangeButton);

    const year2026 = within(dialogEl).getByText('2026');
    await user.click(year2026);

    const monthFeb = within(dialogEl).getByText('Feb', { exact: true });
    await user.click(monthFeb);

    const inputEl = getByTestId('datepicker-input');
    expect(inputEl).toHaveValue('02/15/2026');

    expect(mockOnYearChange).toHaveBeenCalledTimes(1);
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewFn;
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
});
