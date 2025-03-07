import { DateTime } from 'luxon';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import { DateRangePicker } from '.';
import { DateRangePickerProps } from './types';

const ResponsivePieMock = () => <div data-testid="responsive-pie"></div>;

jest.mock('@nivo/pie', () => ({
  PieCustomLayerProps: {},
  ResponsivePie: ResponsivePieMock,
}));

describe('DateRangePicker', () => {
  function setup(props: Partial<DateRangePickerProps> = {}) {
    const mockOnChange = jest.fn();
    const mockOnOpen = jest.fn();
    const mockOnClose = jest.fn();
    const mockOnError = jest.fn();
    const mockOnMonthChange = jest.fn();
    const mockOnYearChange = jest.fn();
    const mockOnBlur = jest.fn();

    const DateRangePickerFormProvider = ({
      children,
    }: React.PropsWithChildren) => {
      // TODO: change the story date
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
        <DateRangePickerFormProvider>
          <DateRangePicker
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
        </DateRangePickerFormProvider>,
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

    expect(mockOnBlur).not.toBeCalled();
    expect(mockOnClose).not.toBeCalled();
    expect(mockOnMonthChange).not.toBeCalled();
    expect(mockOnOpen).not.toBeCalled();
    expect(mockOnYearChange).not.toBeCalled();

    const inputEl = getByTestId('datepicker-input');
    expect(inputEl).toHaveAttribute('placeholder', 'mm/dd/yyyy');
    expect(inputEl).toHaveValue('01/15/2025');
  });
});
