import { ColorPicker } from '@components/ColorPicker';

import { fireEvent, screen } from '../../../customTest';

describe('ColorPicker', () => {
  it('should render with selected format', async () => {
    render(<ColorPicker format="rgb" />);

    await screen.getByTestId('color-picker-trigger').click();
    await screen.getByRole('tab', { name: 'Custom' }).click();
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();

    expect(dropdown).toHaveTextContent(/RGB/);
  });

  it('should call onChange if color is change', async () => {
    const mockOnChange = jest.fn();
    render(<ColorPicker onChange={mockOnChange} />);

    await screen.getByTestId('color-picker-trigger').click();
    await screen.getByRole('tab', { name: 'Custom' }).click();
    const hexInput = screen.getByRole('textbox');

    fireEvent.change(hexInput, { target: { value: '#00FF00' } });
    fireEvent.blur(hexInput);

    expect(mockOnChange).toHaveBeenLastCalledWith('#00ff00');
  });
});
