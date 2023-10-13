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

  it('Trow error when without register', () => {
    jest.spyOn(console, 'error').mockImplementation();

    expect(() =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render(<Input placeholder="Field" name="field" disabled={true} />),
    ).toThrow('Input component must be used within a Form component');
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

  it('Render input with status of success', async () => {
    render(
      <Input
        placeholder="Field"
        name="field"
        register={register}
        status="success"
      />,
    );

    const input = screen.getByRole('textbox') as HTMLInputElement;
    const icon = await screen.findByTitle('Check');

    expect(input).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('Render input with status of error', async () => {
    render(
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
    const icon = await screen.findByTitle('Union');

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
});
