import { screen, fireEvent, mockUseForm } from '../../../customTest';
import Input from '@components/Input';

const { register } = mockUseForm();

describe('Inputs', () => {
  it('Render input with label and helper text', () => {
    render(<Input placeholder="Field" name="field" register={register} />);

    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'rock n roll' } });

    expect(input.value).toBe('rock n roll');
    expect(input).toBeInTheDocument();
  });

  it('Throw warning when without register', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    render(<Input placeholder="Field" name="field" disabled={true} />);
    expect(warnSpy).toBeCalledWith(
      'Input component should be used with React Hook Form register for validation support',
    );
  });

  it('Render input disabled', () => {
    render(
      <Input
        placeholder="Field"
        name="field"
        register={register}
        disabled={true}
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input).toHaveProperty('disabled', true);
  });

  it('Render input with status of success', () => {
    const { container } = render(
      <Input
        placeholder="Field"
        name="field"
        register={register}
        status="success"
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const icon = container.querySelector('svg');

    expect(input).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('Render input with status of error', () => {
    const { container } = render(
      <Input
        placeholder="Field"
        name="field"
        register={register}
        validationSchema={{
          required: 'Required',
        }}
        status="error"
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const icon = container.querySelector('svg');

    expect(input).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('Render input with startElement and endElement', () => {
    render(
      <Input
        placeholder="Field"
        name="field"
        register={register}
        startElement={<span data-testid="startElement">+</span>}
        endElement={<span data-testid="endElement">-</span>}
      />,
    );

    expect(screen.getByTestId('startElement')).toBeInTheDocument();
    expect(screen.getByTestId('endElement')).toBeInTheDocument();
  });

  it('Keeps 40px padding for icon-sized slots', () => {
    render(
      <Input
        placeholder="Field"
        name="field"
        register={register}
        startElement={<span>+</span>}
        endElement={<span>-</span>}
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input.style.getPropertyValue('--input-slot-start')).toBe('40px');
    expect(input.style.getPropertyValue('--input-slot-end')).toBe('40px');
  });

  it('Grows the padding to fit a wide end element', () => {
    const spy = jest
      .spyOn(HTMLElement.prototype, 'offsetWidth', 'get')
      .mockReturnValue(90);

    render(
      <Input
        placeholder="Field"
        name="field"
        register={register}
        endElement={<button type="button">Resend code</button>}
      />,
    );

    // 14px slot offset + 90px content + 8px gap
    expect(
      screen.getByRole('textbox').style.getPropertyValue('--input-slot-end'),
    ).toBe('112px');
    spy.mockRestore();
  });

  it('Calls onStartElementClick and onEndElementClick', () => {
    const onStart = jest.fn();
    const onEnd = jest.fn();
    render(
      <Input
        placeholder="Field"
        name="field"
        register={register}
        startElement={<button type="button">start</button>}
        endElement={<button type="button">end</button>}
        onStartElementClick={onStart}
        onEndElementClick={onEnd}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'start' }));
    expect(onStart).toHaveBeenCalledTimes(1);
    expect(onEnd).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'end' }));
    expect(onEnd).toHaveBeenCalledTimes(1);
  });

  it('Ignores slot clicks when disabled', () => {
    const onStart = jest.fn();
    const onEnd = jest.fn();
    render(
      <Input
        placeholder="Field"
        name="field"
        register={register}
        disabled
        startElement={<span data-testid="start">+</span>}
        endElement={<span data-testid="end">-</span>}
        onStartElementClick={onStart}
        onEndElementClick={onEnd}
      />,
    );

    fireEvent.click(screen.getByTestId('start'));
    fireEvent.click(screen.getByTestId('end'));
    expect(onStart).not.toHaveBeenCalled();
    expect(onEnd).not.toHaveBeenCalled();
  });
});
