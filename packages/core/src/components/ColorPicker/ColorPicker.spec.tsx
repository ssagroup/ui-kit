import userEvent from '@testing-library/user-event';
import { ColorPicker } from '@components/ColorPicker';
import { screen } from '../../../customTest';

describe('ColorPicker', () => {
  it('should render with selected format', async () => {
    const user = userEvent.setup();
    render(<ColorPicker format="rgb" />);

    await user.click(screen.getByTestId('color-picker-trigger'));
    await user.click(screen.getByRole('tab', { name: 'Custom' }));
    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();

    expect(dropdown).toHaveTextContent(/RGB/);
  });

  it('should call onChange if color is change', async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();
    render(<ColorPicker onChange={mockOnChange} />);

    await user.click(screen.getByTestId('color-picker-trigger'));
    await user.click(screen.getByRole('tab', { name: 'Custom' }));
    const hexInput = screen.getByRole('textbox');

    await user.clear(hexInput);
    await user.type(hexInput, '#00FF00');
    await user.tab(); // Triggers blur

    expect(mockOnChange).toHaveBeenLastCalledWith('#00ff00');
  });
});
