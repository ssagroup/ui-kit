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
    // const mockOnClose = () => {
    //   console.log('>>>close');
    // };
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

  it('Open and close events must be called', async () => {
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

    // let dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    // expect(dropdownToggleEl).toHaveTextContent('Select something');
    // expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'false');
    // expect(dropdownToggleEl).toHaveAttribute('aria-haspopup', 'listbox');
    // expect(dropdownToggleEl).toHaveAttribute('aria-controls');
    // expect(dropdownToggleEl).toHaveAttribute('aria-labelledby');
    // findByTitle('Carrot down');

    // let listboxEl = queryByRole('listbox');
    // expect(listboxEl).not.toBeInTheDocument();

    // await user.click(dropdownToggleEl);

    // listboxEl = getByRole('listbox');
    // const listItemEls = within(listboxEl).getAllByRole('listitem');
    // expect(listItemEls.length).toBe(items.length);

    // dropdownToggleEl = within(dropdownEl).getByRole('combobox');
    // expect(dropdownToggleEl).toHaveFocus();
    // expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'true');
    // findByTitle('Carrot up');

    // for (let i = 0; i < items.length; ++i) {
    //   const listItem = items[i];
    //   const listItemEl = listItemEls[i];

    //   expect(listItemEl).toHaveAttribute('aria-selected', 'false');
    //   const itemListValue = getListItemValue(listItem);
    //   expect(within(listItemEl).getByRole('button')).toHaveTextContent(
    //     itemListValue,
    //   );
    //   await within(listItemEl).findByText(itemListValue);
    // }
  });

  //   const selectedItem = items[2];
  //   const { user, mockOnChange, getByRole, queryByRole, getByTestId } = setup({
  //     selectedItem,
  //   });

  //   expect(mockOnChange).not.toBeCalled();

  //   const dropdownEl = getByTestId('dropdown');

  //   let dropdownToggleEl = within(dropdownEl).getByRole('combobox');
  //   expect(dropdownToggleEl).toHaveTextContent(getListItemValue(selectedItem));
  //   expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'false');
  //   expect(dropdownToggleEl).toHaveAttribute('aria-haspopup', 'listbox');
  //   expect(dropdownToggleEl).toHaveAttribute('aria-controls');
  //   expect(dropdownToggleEl).toHaveAttribute('aria-labelledby');
  //   await within(dropdownToggleEl).findByTitle('Carrot down');

  //   let listboxEl = queryByRole('listbox');
  //   expect(listboxEl).not.toBeInTheDocument();

  //   await user.click(dropdownToggleEl);

  //   listboxEl = getByRole('listbox');
  //   const listItemEls = within(listboxEl).getAllByRole('listitem');
  //   expect(listItemEls.length).toBe(items.length);

  //   dropdownToggleEl = within(dropdownEl).getByRole('combobox');

  //   expect(dropdownToggleEl).toHaveFocus();
  //   expect(dropdownToggleEl).toHaveAttribute('aria-expanded', 'true');
  //   await within(dropdownToggleEl).findByTitle('Carrot up');

  //   for (let i = 0; i < items.length; ++i) {
  //     const listItem = items[i];
  //     const listItemEl = listItemEls[i];

  //     const itemListValue = getListItemValue(listItem);

  //     await within(listItemEl).findByText(itemListValue);
  //     expect(within(listItemEl).getByRole('button')).toHaveTextContent(
  //       itemListValue,
  //     );

  //     if (listItem.id === selectedItem.id) {
  //       expect(listItemEl).toHaveAttribute('aria-selected', 'true');
  //       expect(listItemEl).toHaveStyle('background: #DEE1EC');
  //     } else {
  //       expect(listItemEl).toHaveAttribute('aria-selected', 'false');
  //     }
  //   }
  // });
});
