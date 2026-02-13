import { screen, fireEvent, mockUseForm } from '../../../customTest';

import Textarea from '@components/Textarea';

const { register } = mockUseForm();

describe('Textarea', () => {
  it('Render textarea', () => {
    const countChar = jest.fn();

    render(
      <Textarea
        placeholder="Field"
        name="field"
        register={register}
        maxLength={100}
        setCountChar={countChar}
      />,
    );

    const textarea = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(textarea, { target: { value: 'rock n roll' } });

    expect(textarea.value).toBe('rock n roll');
    expect(textarea).toHaveProperty('rows', 10);
    expect(textarea).toHaveProperty('maxLength', 100);
    expect(textarea).toHaveProperty('id', 'formElement-field');
    expect(countChar).toHaveBeenCalled();
  });

  it('Render textarea disabled', () => {
    render(
      <Textarea
        placeholder="Field"
        name="field"
        register={register}
        disabled={true}
      />,
    );

    const textarea = screen.getByRole('textbox') as HTMLInputElement;

    expect(textarea).toHaveProperty('disabled', true);
  });

  it('Throw warning when without register', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<Textarea placeholder="Field" name="field" disabled={true} />);
    expect(warnSpy).toBeCalledWith(
      'Textarea component should be used with React Hook Form register for validation support',
    );
  });
});
