import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useForm } from 'react-hook-form';

import Button from '@components/Button';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import { Field } from '@components/Field';
import { FieldRootProps } from './FieldRoot';

type Args = FieldRootProps;

// Field.Control draws the border, so the control inside drops its own.
const bare = { width: '100%', border: '0 !important' } as const;

export default {
  title: 'Components/Field',
  component: Field.Root,
  subcomponents: {
    'Field.Label': Field.Label,
    'Field.Control': Field.Control,
    'Field.Description': Field.Description,
    'Field.Error': Field.Error,
    'Field.Success': Field.Success,
  },
  args: {
    status: 'basic',
    disabled: false,
    forwardFocus: true,
  },
  argTypes: {
    status: {
      control: 'inline-radio',
      options: ['basic', 'error', 'success'],
    },
    asChild: { control: false },
    children: { control: false },
  },
  parameters: {
    // Show each story's own source rather than the rendered element tree.
    docs: { source: { type: 'code' } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<Args>;

/**
 * Field is a set of layout parts for building a labelled form field around
 * any control: `Field.Root` holds the state, `Field.Label` and
 * `Field.Control` frame the control, and `Field.Description`, `Field.Error`
 * and `Field.Success` sit underneath. For a ready-made text field use
 * `TextField`.
 *
 * `Field.Root` passes `status` and `disabled` down through context:
 *
 * - `status` colours the control's border and picks the message: the
 *   description shows only for `basic`, the error only for `error`, the
 *   success message only for `success`. Render all three and let `status`
 *   choose.
 * - `disabled` greys out the label and the control box, but it does not
 *   disable the control itself: pass `disabled` to the control too.
 * - With `forwardFocus` (on by default), clicking anywhere in the control box
 *   focuses the control.
 *
 * The kit's `Input` gets `id="formElement-{name}"`, so point `Field.Label`'s
 * `htmlFor` at that id.
 */
export const Default: StoryObj<Args> = {
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label htmlFor="formElement-username">Username</Field.Label>
      <Field.Control>
        <Input
          name="username"
          placeholder="e.g. amelia.clarke"
          disabled={args.disabled}
          css={bare}
        />
      </Field.Control>
      <Field.Description>Letters, numbers and dots</Field.Description>
      <Field.Error>This username is taken</Field.Error>
      <Field.Success>This username is available</Field.Success>
    </Field.Root>
  ),
};

/**
 * `Field.Control` also takes a function as its child. It receives the
 * field's context (`status`, `disabled`, `forwardFocus`), so the control can
 * follow `Field.Root` without repeating its props. Toggle `disabled` and
 * `status` in the Controls panel to see the control follow.
 */
export const ContextInControl: StoryObj<Args> = {
  args: { disabled: true },
  render: (args) => (
    <Field.Root {...args}>
      <Field.Label htmlFor="formElement-team">Team</Field.Label>
      <Field.Control>
        {({ disabled, status }) => (
          <Input
            name="team"
            disabled={disabled}
            placeholder={
              disabled
                ? 'Locked by your admin'
                : status === 'error'
                  ? 'Pick a team first'
                  : 'Team name'
            }
            css={bare}
          />
        )}
      </Field.Control>
      <Field.Description>Shown on your profile</Field.Description>
      <Field.Error>Choose a team</Field.Error>
    </Field.Root>
  ),
};

/**
 * Field has no validation of its own: work out `status` from the value and
 * pass it to `Field.Root`. Here the email is checked as you type. Without
 * `register`, `Input` takes `value` and `onChange` through `inputProps`.
 */
export const LiveValidation: StoryObj<Args> = {
  render: function Render(args) {
    const [email, setEmail] = useState('');
    const status =
      email === ''
        ? 'basic'
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? 'success'
          : 'error';
    return (
      <Field.Root {...args} status={status}>
        <Field.Label htmlFor="formElement-email">Email</Field.Label>
        <Field.Control>
          <Input
            name="email"
            placeholder="name@company.com"
            css={bare}
            inputProps={{
              value: email,
              onChange: (event) => setEmail(event.target.value),
            }}
          />
        </Field.Control>
        <Field.Description>We send the invite here</Field.Description>
        <Field.Error>Enter an email like name@company.com</Field.Error>
        <Field.Success>Looks good</Field.Success>
      </Field.Root>
    );
  },
};

/**
 * Field works around other controls too. Here it frames a `Textarea`
 * registered with react-hook-form; the error message comes from the form's
 * validation. Submit the empty form to see it.
 */
export const WithTextarea: StoryObj<Args> = {
  render: function Render(args) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    return (
      <form onSubmit={handleSubmit(() => undefined)}>
        <Field.Root {...args} status={errors.notes ? 'error' : args.status}>
          <Field.Label htmlFor="formElement-notes">Notes</Field.Label>
          <Field.Control>
            <Textarea
              name="notes"
              rows={3}
              placeholder="Anything we should know?"
              register={register}
              validationSchema={{ required: 'Add a note before sending' }}
              css={bare}
            />
          </Field.Control>
          <Field.Description>Visible to your team only</Field.Description>
          <Field.Error>{String(errors.notes?.message ?? '')}</Field.Error>
        </Field.Root>
        <Button
          type="submit"
          variant="primary"
          text="Send"
          css={{ marginTop: 12 }}
        />
      </form>
    );
  },
};
