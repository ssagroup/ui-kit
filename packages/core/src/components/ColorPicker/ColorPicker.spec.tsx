import { fireEvent, screen } from '../../../customTest';
import ColorPicker from '@components/ColorPicker';

describe('ColorPicker', () => {
  it('Return the correct color onChange', async () => {
    const mockOnChange = jest.fn();

    render(<ColorPicker onChange={mockOnChange} />);

    const [
      btnPink,
      btnYellow,
      btnGreen,
      btnTurquoise,
      btnBlueLight,
      btnBlue,
      btnPurple,
    ] = await screen.queryAllByRole('button');

    fireEvent.click(btnPink);

    expect(mockOnChange).toBeCalledWith('pink');

    fireEvent.click(btnYellow);

    expect(mockOnChange).toBeCalledWith('yellow');

    fireEvent.click(btnGreen);

    expect(mockOnChange).toBeCalledWith('green');

    fireEvent.click(btnTurquoise);

    expect(mockOnChange).toBeCalledWith('turquoise');

    fireEvent.click(btnBlueLight);

    expect(mockOnChange).toBeCalledWith('blueLight');

    fireEvent.click(btnBlue);

    expect(mockOnChange).toBeCalledWith('blue');

    fireEvent.click(btnPurple);

    expect(mockOnChange).toBeCalledWith('purple');
  });

  it('Return the correct init color', async () => {
    const mockOnChange = jest.fn();

    render(<ColorPicker onChange={mockOnChange} initColor="green" />);

    const [, , btnGreen] = await screen.queryAllByRole('button');

    expect(btnGreen).toHaveStyleRule('border', '1.4px solid #fff');
  });
});
