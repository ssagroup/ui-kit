import userEvent from '@testing-library/user-event';

import { NumberField, NumberFieldProps } from '@components/NumberField';

describe('NumberField', () => {
  const setup = (props: Partial<NumberFieldProps> = {}) =>
    render(<NumberField name="field" register={jest.fn()} {...props} />);

  it('Should call onChange', async () => {
    const onChange = jest.fn();

    const { getByRole } = setup({ onChange });

    const input = getByRole('textbox') as HTMLInputElement;
    await userEvent.type(input, '9');

    expect(onChange).toHaveBeenCalledWith(9);
    expect(input.value).toBe('9');
  });

  it('Placeholder text should be displayed', () => {
    const { getByPlaceholderText } = setup({ placeholder: 'Placeholder' });
    expect(getByPlaceholderText('Placeholder')).toBeInTheDocument();
  });

  it('Helper text should be displayed', () => {
    const { getByText } = setup({ description: 'Helper text' });
    expect(getByText('Helper text')).toBeInTheDocument();
  });

  it('Error text should be displayed', () => {
    const { getByText } = setup({ status: 'error', error: 'Error text' });
    expect(getByText('Error text')).toBeInTheDocument();
  });

  it('Success text should be displayed', () => {
    const { getByText } = setup({ status: 'success', success: 'Success text' });
    expect(getByText('Success text')).toBeInTheDocument();
  });

  it('marks the input [required] with aria-required and the label with a *', () => {
    const { getByRole, getByTestId } = setup({
      label: 'Amount',
      required: true,
    });

    expect(getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    expect(getByTestId('label-required-mark')).toBeInTheDocument();
  });

  it('keeps value handling and aria-required when inputProps are passed', async () => {
    const onChange = jest.fn();
    const { getByRole } = setup({
      required: true,
      onChange,
      inputProps: { 'data-testid': 'amount' } as NumberFieldProps['inputProps'],
    });

    const input = getByRole('textbox');
    await userEvent.type(input, '7');
    expect(input).toHaveValue('7');
    expect(onChange).toHaveBeenLastCalledWith(7);
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('data-testid', 'amount');
  });
});
