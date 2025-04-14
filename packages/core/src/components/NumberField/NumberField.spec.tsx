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
});
