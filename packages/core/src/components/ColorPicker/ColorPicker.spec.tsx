import { ColorPicker } from '@components/ColorPicker';
import { fireEvent, screen } from '../../../customTest';

describe('ColorPicker', () => {
  it('should render with selected format', () => {
    render(<ColorPicker format="rgb" />);

    const dropdown = screen.getByRole('combobox');
    expect(dropdown).toBeInTheDocument();

    expect(dropdown).toHaveTextContent(/RGB/);
  });

  it('should call onChange if color is change', () => {
    const mockOnChange = jest.fn();
    render(<ColorPicker onChange={mockOnChange} />);

    const hexInput = screen.getByRole('textbox');

    fireEvent.change(hexInput, { target: { value: '#00FF00' } });
    fireEvent.blur(hexInput);

    expect(mockOnChange).toHaveBeenLastCalledWith('#00ff00');
  });
});
