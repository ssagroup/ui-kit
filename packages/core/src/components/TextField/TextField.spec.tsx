import { screen, fireEvent, mockUseForm } from '../../../customTest';
import { FieldError } from 'react-hook-form';

import TextField from '@components/TextField';
import Button from '@components/Button';
import Icon from '@components/Icon';

const mockError: FieldError = {
  type: 'required',
  message: 'Required field',
};

const { register } = mockUseForm();

describe('TextField', () => {
  it('Render textarea with label and helper text', () => {
    render(
      <TextField
        multirow={true}
        placeholder="Field"
        label="field"
        name="field"
        register={register}
        validationSchema={{
          required: 'Required',
        }}
        helperText={'some nice text'}
      />,
    );

    const textarea = screen.getByRole('textbox') as HTMLInputElement;
    const helperText = screen.getByRole('status');

    fireEvent.change(textarea, { target: { value: 'rock n roll' } });

    expect(textarea.value).toBe('rock n roll');
    expect(helperText.innerHTML).toBe('some nice text');
  });

  it('Render textarea with limit char', () => {
    render(
      <TextField
        multirow={true}
        placeholder="Field"
        label="field"
        name="field"
        register={register}
        helperText={'some nice text'}
        maxLength={100}
      />,
    );

    const textarea = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(textarea, { target: { value: 'rock n roll' } });

    const meter = screen.getByRole('meter');

    expect(textarea.value).toBe('rock n roll');
    expect(meter.innerHTML).toBe('11 / 100');
  });

  it('Render input with label and helper text', () => {
    render(
      <TextField
        placeholder="Field"
        label="field"
        name="field"
        register={register}
        helperText={'some nice text'}
      />,
    );

    const input = screen.getByLabelText(/Field/i) as HTMLInputElement;
    const helperText = screen.getByRole('status');

    fireEvent.change(input, { target: { value: 'rock n roll' } });

    expect(input.value).toBe('rock n roll');
    expect(input).toBeInTheDocument();
    expect(helperText).toBeInTheDocument();
  });

  it('Render input disabled', () => {
    render(
      <TextField
        placeholder="Field"
        label="field disabled"
        name="field"
        register={register}
        disabled={true}
      />,
    );

    const input = screen.getByLabelText(/field disabled/i) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input).toHaveProperty('disabled', true);
  });

  it('Render input with status of success without status icon', () => {
    render(
      <TextField
        placeholder="Field"
        label="field"
        name="field"
        register={register}
        success={true}
      />,
    );

    const input = screen.getByLabelText(/Field/i);
    const icon = screen.queryByTitle('Check');

    expect(input).toBeInTheDocument();
    expect(icon).not.toBeInTheDocument();
  });

  it('Render input with status of error without status icon', () => {
    render(
      <TextField
        placeholder="Field"
        label="field"
        name="field"
        register={register}
        validationSchema={{
          required: 'Required',
        }}
        errors={mockError}
      />,
    );

    const input = screen.getByLabelText(/Field/i);
    const errorText = screen.getByRole('status');
    const icon = screen.queryByTitle('Union');

    expect(input).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
    expect(icon).not.toBeInTheDocument();
  });

  it('Render input without status icon when with an append element', async () => {
    render(
      <TextField
        placeholder="Field"
        label="field"
        name="field"
        register={register}
        validationSchema={{
          required: 'Required',
        }}
        endElement={
          <Button
            variant="tertiary"
            endIcon={<Icon name="visible" />}
            onClick={jest.fn()}
          />
        }
        errors={mockError}
      />,
    );

    const input = screen.getByLabelText(/Field/i);
    const errorText = screen.getByRole('status');
    const icon = await screen.queryByTitle('Union');

    expect(input).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
    expect(icon).not.toBeInTheDocument();
  });
});

describe('TextField labelBadge', () => {
  it('shows the badge and describes the input with it', () => {
    render(
      <TextField
        label="Email"
        name="email"
        register={register}
        labelBadge={{ text: 'mapped', color: 'primary' }}
        inputProps={{ 'aria-describedby': 'hint' }}
      />,
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAccessibleName('Email');
    expect(input).toHaveAttribute(
      'aria-describedby',
      'hint formElement-email-badge',
    );
  });

  it('describes the textarea in multirow mode', () => {
    render(
      <TextField
        multirow
        label="Bio"
        name="bio"
        register={register}
        labelBadge={{ text: 'not present in the CV', color: '#ff8a00' }}
      />,
    );

    expect(screen.getByRole('textbox')).toHaveAccessibleDescription(
      'not present in the CV',
    );
  });

  it('renders no badge without a label', () => {
    render(
      <TextField
        name="x"
        register={register}
        labelBadge={{ text: 'mapped' }}
      />,
    );

    expect(screen.queryByText('mapped')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-describedby');
  });
});
