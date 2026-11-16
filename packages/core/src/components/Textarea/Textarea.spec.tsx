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

describe('Textarea label', () => {
  it('renders no label without [label]', () => {
    const { container } = render(<Textarea name="notes" register={register} />);

    expect(container.querySelector('label')).toBeNull();
    expect(container.firstElementChild?.tagName).toBe('TEXTAREA');
  });

  it('names the textarea with [label]', () => {
    render(<Textarea name="notes" label="Notes" register={register} />);

    const label = screen.getByText('Notes');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('for', 'formElement-notes');
    expect(screen.getByRole('textbox')).toHaveAccessibleName('Notes');
  });

  it('points the label at a custom [id]', () => {
    render(
      <Textarea name="notes" id="custom" label="Notes" register={register} />,
    );

    expect(screen.getByLabelText('Notes')).toHaveAttribute('id', 'custom');
  });

  it('marks the field [required] with a * and aria-required', () => {
    render(
      <Textarea name="notes" label="Notes" required register={register} />,
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-required', 'true');
    expect(textarea).not.toHaveAttribute('required');
    expect(textarea).toHaveAccessibleName('Notes');
    expect(screen.getByTestId('label-required-mark')).toBeInTheDocument();
  });

  it('sets aria-required without a label too', () => {
    render(<Textarea name="notes" required register={register} />);

    expect(screen.getByRole('textbox')).toHaveAttribute(
      'aria-required',
      'true',
    );
    expect(screen.queryByTestId('label-required-mark')).toBeNull();
  });

  it('describes the textarea with [labelBadge], keeping its own describedby', () => {
    render(
      <>
        <Textarea
          name="notes"
          label="Notes"
          labelBadge={{ text: 'mapped' }}
          aria-describedby="hint"
          register={register}
        />
        <span id="hint">Max 500</span>
      </>,
    );

    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
      'Max 500 mapped',
    );
  });

  it('greys the label out when [disabled]', () => {
    const enabled = render(
      <Textarea name="notes" label="Notes" register={register} />,
    );
    const enabledColor = getComputedStyle(enabled.getByText('Notes')).color;
    enabled.unmount();

    render(
      <Textarea name="notes" label="Notes" disabled register={register} />,
    );

    expect(getComputedStyle(screen.getByText('Notes')).color).not.toBe(
      enabledColor,
    );
  });
});
