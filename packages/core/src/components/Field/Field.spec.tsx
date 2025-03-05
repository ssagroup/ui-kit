import { useRef } from 'react';
import userEvent from '@testing-library/user-event';

import Field from './';

describe('Field', () => {
  it('Render with label and helper text', () => {
    const { getByText, getByRole } = render(
      <Field.Root>
        <Field.Label htmlFor="input-name">Label</Field.Label>
        <Field.Control>
          <input
            id="input-name"
            type="text"
            css={{ width: '100%', height: '44px', border: 0 }}
          />
        </Field.Control>
        <Field.Description>Helper Text</Field.Description>
      </Field.Root>,
    );

    const label = getByText('Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'input-name');

    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'input-name');

    expect(getByText('Helper Text')).toBeInTheDocument();
  });

  it('Render with constructor', () => {
    const { getByText, getByRole } = render(
      <Field.Root disabled>
        <Field.Label htmlFor="input-name">Label</Field.Label>
        <Field.Control>
          {({ disabled }) => (
            <input
              disabled={disabled}
              id="input-name"
              type="text"
              css={{ width: '100%', height: '44px', border: 0 }}
            />
          )}
        </Field.Control>
        <Field.Description>Helper Text</Field.Description>
      </Field.Root>,
    );

    const label = getByText('Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'input-name');

    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'input-name');
    expect(input).toBeDisabled();
  });

  it('Render with error message', () => {
    const { getByText, queryByText } = render(
      <Field.Root status="error">
        <Field.Label htmlFor="input-name">Label</Field.Label>
        <Field.Control>
          <input
            id="input-name"
            type="text"
            css={{ width: '100%', height: '44px', border: 0 }}
          />
        </Field.Control>
        <Field.Description>Helper Text</Field.Description>
        <Field.Error>Error message</Field.Error>
        <Field.Success>Success message</Field.Success>
      </Field.Root>,
    );

    expect(getByText('Error message')).toBeInTheDocument();
    expect(queryByText('Success message')).not.toBeInTheDocument();
    expect(queryByText('Helper Text')).not.toBeInTheDocument();
  });

  it('Render with success message', () => {
    const { getByText, queryByText } = render(
      <Field.Root status="success">
        <Field.Label htmlFor="input-name">Label</Field.Label>
        <Field.Control>
          <input
            id="input-name"
            type="text"
            css={{ width: '100%', height: '44px', border: 0 }}
          />
        </Field.Control>
        <Field.Description>Helper Text</Field.Description>
        <Field.Error>Error message</Field.Error>
        <Field.Success>Success message</Field.Success>
      </Field.Root>,
    );

    expect(getByText('Success message')).toBeInTheDocument();
    expect(queryByText('Error message')).not.toBeInTheDocument();
    expect(queryByText('Helper Text')).not.toBeInTheDocument();
  });

  it('Render with ReactNode as children', async () => {
    const user = userEvent.setup();

    const { getByRole, getByTestId } = render(
      <Field.Root>
        <Field.Label htmlFor="input-name">Label</Field.Label>
        <Field.Control data-testid="field-control">
          <span>Custom Input</span>
          <input
            id="input-name"
            type="text"
            css={{ width: '100%', height: '44px', border: 0 }}
          />
        </Field.Control>
        <Field.Description>Helper Text</Field.Description>
      </Field.Root>,
    );

    await user.click(getByTestId('field-control'));
    expect(getByRole('textbox')).not.toHaveFocus();
  });

  it('Render with ReactNode as children with controlRef', async () => {
    const user = userEvent.setup();

    const Component = () => {
      const inputRef = useRef<HTMLInputElement | null>(null);
      return (
        <Field.Root>
          <Field.Label htmlFor="input-name">Label</Field.Label>
          <Field.Control data-testid="field-control" controlRef={inputRef}>
            <span>Custom Input</span>
            <input
              ref={inputRef}
              id="input-name"
              type="text"
              css={{ width: '100%', height: '44px', border: 0 }}
            />
          </Field.Control>
          <Field.Description>Helper Text</Field.Description>
        </Field.Root>
      );
    };

    const { getByRole, getByTestId } = render(<Component />);

    await user.click(getByTestId('field-control'));
    expect(getByRole('textbox')).toHaveFocus();
  });

  it('Should forward focus to ReactElement with defaultRef', async () => {
    const user = userEvent.setup();

    const Component = () => {
      const inputRef = useRef<HTMLInputElement | null>(null);
      return (
        <Field.Root>
          <Field.Label htmlFor="input-name">Label</Field.Label>
          <Field.Control data-testid="field-control">
            <input
              ref={inputRef}
              id="input-name"
              type="text"
              css={{ width: '100%', height: '44px', border: 0 }}
            />
          </Field.Control>
          <Field.Description>Helper Text</Field.Description>
        </Field.Root>
      );
    };

    const { getByRole, getByTestId } = render(<Component />);

    await user.click(getByTestId('field-control'));
    expect(getByRole('textbox')).toHaveFocus();
  });

  it('Should forward focus to ReactElement without defaultRef', async () => {
    const user = userEvent.setup();

    const { getByRole, getByTestId } = render(
      <Field.Root>
        <Field.Label htmlFor="input-name">Label</Field.Label>
        <Field.Control data-testid="field-control">
          <input
            id="input-name"
            type="text"
            css={{ width: '100%', height: '44px', border: 0 }}
          />
        </Field.Control>
        <Field.Description>Helper Text</Field.Description>
      </Field.Root>,
    );

    await user.click(getByTestId('field-control'));
    expect(getByRole('textbox')).toHaveFocus();
  });

  it('Should disable focus forwarding', async () => {
    const user = userEvent.setup();

    const { getByRole, getByTestId } = render(
      <Field.Root forwardFocus={false}>
        <Field.Label htmlFor="input-name">Label</Field.Label>
        <Field.Control data-testid="field-control">
          <input
            id="input-name"
            type="text"
            css={{ width: '100%', height: '44px', border: 0 }}
          />
        </Field.Control>
        <Field.Description>Helper Text</Field.Description>
      </Field.Root>,
    );

    await user.click(getByTestId('field-control'));
    expect(getByRole('textbox')).not.toHaveFocus();
  });
});
