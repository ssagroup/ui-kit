import { type StoryObj, type Meta } from '@storybook/react-webpack5';
import { useToggle } from '@ssa-ui-kit/hooks';

import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import Input from '@components/Input';
import { Field } from '@components/Field';

const meta = {
  title: 'Components/Field',
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [status, toggleStatus] = useToggle([
      'error',
      'success',
      'basic',
    ] as const);

    const [disabled, toggleDisabled] = useToggle();

    return (
      <div>
        <Button onClick={() => toggleStatus()}>Toggle status</Button>
        <Button onClick={() => toggleDisabled()}>Toggle disabled</Button>
        <Field.Root
          css={{ marginTop: '10px' }}
          status={status}
          disabled={disabled}>
          <Field.Label htmlFor="formElement-input-name">Label</Field.Label>
          <Field.Control>
            <Input
              disabled={disabled}
              name="input-name"
              css={{ width: '100%', border: '0 !important' }}
              placeholder="Placeholder"
            />
          </Field.Control>
          <Field.Description>Description</Field.Description>
          <Field.Error>Error message</Field.Error>
          <Field.Success>Success message</Field.Success>
        </Field.Root>
      </div>
    );
  },
};

export const WithConstructor: Story = {
  render: () => {
    return (
      <Field.Root css={{ marginTop: '10px' }} disabled>
        <Field.Label htmlFor="formElement-input-name">Label</Field.Label>
        <Field.Control>
          {({ disabled }) => (
            <Input
              disabled={disabled}
              name="input-name"
              css={{
                width: '100%',
                border: '0 !important',
              }}
              placeholder="Placeholder"
            />
          )}
        </Field.Control>
        <Field.Description>Description</Field.Description>
        <Field.Error>Error message</Field.Error>
        <Field.Success>Success message</Field.Success>
      </Field.Root>
    );
  },
};

export const WithMultipleErrors: Story = {
  render: () => {
    const errorMessages = [
      'Error message 1',
      <span key="2" css={{ color: 'orange' }}>
        Error message 2
      </span>,
    ];
    const separator = ', ';

    return (
      <Field.Root css={{ marginTop: '10px' }} status="error">
        <Field.Label htmlFor="formElement-input-name">Label</Field.Label>
        <Field.Control>
          <Input
            name="input-name"
            css={{ width: '100%', border: '0 !important' }}
            placeholder="Placeholder"
          />
        </Field.Control>
        <Wrapper>
          <Field.Error>
            {errorMessages.map((message, index) => (
              <>
                {message}
                {index < errorMessages.length - 1 ? separator : null}
              </>
            ))}
          </Field.Error>
        </Wrapper>
      </Field.Root>
    );
  },
};
