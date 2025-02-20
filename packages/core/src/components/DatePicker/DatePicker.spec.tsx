import { DateTime } from 'luxon';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import { DatePicker } from '.';

const ResponsivePieMock = () => <div data-testid="responsive-pie"></div>;

jest.mock('@nivo/pie', () => ({
  PieCustomLayerProps: {},
  ResponsivePie: ResponsivePieMock,
}));

describe('DatePicker', () => {
  function setup(props = {}) {
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
      mockOnChange,
      mockOnBlur,
      mockOnClose,
      mockOnError,
      mockOnMonthChange,
      mockOnOpen,
      mockOnYearChange,
      getByTestId,
    } = setup();

    expect(mockOnChange).not.toBeCalled();
    expect(mockOnBlur).not.toBeCalled();
    expect(mockOnClose).not.toBeCalled();
    expect(mockOnError).not.toBeCalled();
    expect(mockOnMonthChange).not.toBeCalled();
    expect(mockOnOpen).not.toBeCalled();
    expect(mockOnYearChange).not.toBeCalled();

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
      // mockOnBlur,
      // mockOnError,
      // mockOnMonthChange,
      // mockOnYearChange,
      getByRole,
      // getByDisplayValue,
      // getByLabelText,
      queryByRole,
      getByTestId,
      // findByTitle,
    } = setup();

    // expect(mockOnChange).not.toBeCalled();
    // expect(mockOnBlur).not.toBeCalled();
    // expect(mockOnError).not.toBeCalled();
    // expect(mockOnMonthChange).not.toBeCalled();
    // expect(mockOnYearChange).not.toBeCalled();

    const inputEl = getByTestId('datepicker-input');
    expect(inputEl).toHaveAttribute('placeholder', 'mm/dd/yyyy');
    expect(inputEl).toHaveValue('01/15/2025');

    await user.click(inputEl);
    expect(mockOnOpen).not.toBeCalled();

    const buttonEl = getByTestId('datepicker-button');
    await user.click(buttonEl);
    expect(mockOnOpen).toBeCalledTimes(1);
    expect(mockOnClose).not.toBeCalled();

    const dialogEl = getByRole('dialog');
    expect(dialogEl).toBeInTheDocument();

    const dayEl = within(dialogEl).getByText(15);
    await user.click(dayEl);

    const dialogEl2 = queryByRole('dialog');
    expect(dialogEl2).toBeNull();

    expect(mockOnOpen).toBeCalledTimes(1);
    expect(mockOnClose).toBeCalledTimes(1);
    expect(mockOnChange).toBeCalled();
  });
});
