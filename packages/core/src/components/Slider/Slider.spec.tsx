import { Slider } from './index';
import { fireEvent, screen } from '../../../customTest';

describe('Slider', () => {
  describe('Rendering', () => {
    it('Renders with label', () => {
      render(<Slider label="Price range" defaultValue={[20, 80]} />);

      expect(screen.getByText('Price range')).toBeInTheDocument();
    });

    it('Renders two range inputs (sliders) with correct min/max', () => {
      render(
        <Slider label="Range" min={0} max={100} defaultValue={[25, 75]} />,
      );

      const sliders = screen.getAllByRole('slider');
      expect(sliders).toHaveLength(2);
      const [minSlider, maxSlider] = sliders;
      expect(minSlider).toHaveAttribute('aria-label', 'Minimum value');
      expect(maxSlider).toHaveAttribute('aria-label', 'Maximum value');
      expect(minSlider).toHaveAttribute('min', '0');
      expect(minSlider).toHaveAttribute('max', '100');
      expect(maxSlider).toHaveAttribute('min', '0');
      expect(maxSlider).toHaveAttribute('max', '100');
      expect(minSlider).toHaveValue('25');
      expect(maxSlider).toHaveValue('75');
    });
  });

  describe('Disabled state', () => {
    it('Renders disabled when disabled prop is true', () => {
      render(<Slider label="Disabled" defaultValue={[30, 70]} disabled />);

      const sliders = screen.getAllByRole('slider');
      expect(sliders).toHaveLength(2);
      expect(sliders[0]).toBeDisabled();
      expect(sliders[1]).toBeDisabled();
    });
  });

  describe('Marks', () => {
    it('Renders marks with labels when marks prop is provided', () => {
      render(
        <Slider
          label="With marks"
          min={0}
          max={100}
          defaultValue={[20, 80]}
          marks={[
            { value: 0, label: '0' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
          ]}
        />,
      );

      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  describe('With inputs', () => {
    it('Renders two number inputs when withInputs is true', () => {
      render(
        <Slider
          label="Budget"
          min={0}
          max={1000}
          defaultValue={[100, 500]}
          withInputs
        />,
      );

      const minInput = screen.getByRole('spinbutton', {
        name: 'Minimum value',
      });
      const maxInput = screen.getByRole('spinbutton', {
        name: 'Maximum value',
      });
      expect(minInput).toHaveAttribute('type', 'number');
      expect(maxInput).toHaveAttribute('type', 'number');
      expect((minInput as HTMLInputElement).value).toBe('100');
      expect((maxInput as HTMLInputElement).value).toBe('500');
    });
  });

  describe('onChange', () => {
    it('Calls onChange when slider value changes', () => {
      const mockOnChange = jest.fn();

      render(
        <Slider
          label="Controlled"
          min={0}
          max={100}
          value={[20, 80]}
          onChange={mockOnChange}
        />,
      );

      const sliders = screen.getAllByRole('slider');
      const minSlider = sliders[0] as HTMLInputElement;

      fireEvent.change(minSlider, { target: { value: '30' } });

      expect(mockOnChange).toHaveBeenCalledWith([30, 80]);
    });
  });
});
