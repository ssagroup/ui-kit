import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { FieldError, useForm } from 'react-hook-form';

import Button from '@components/Button';
import Icon from '@components/Icon';
import { IconButton } from '@components/IconButton';
import TextField from './TextField';
import { TextFieldProps } from './types';

type Args = TextFieldProps;

const column = { display: 'flex', flexDirection: 'column', gap: 16 } as const;

export default {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    status: { table: { disable: true } },
    type: { control: 'text' },
    register: { control: false },
    control: { control: false },
    setValue: { control: false },
    validationSchema: { control: false },
    errors: { control: false },
    inputProps: { control: false },
    startElement: { control: false },
    endElement: { control: false },
    onKeyUp: { control: false },
    as: { control: false },
    css: { control: false },
    onStartElementClick: { control: false },
    onEndElementClick: { control: false },
  },
  parameters: {
    // Show each story's own source rather than the rendered element tree.
    docs: { source: { type: 'code' } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<Args>;

/**
 * TextField is a complete text field: a label, an `Input` (or a `Textarea`
 * with `multirow`) and a helper row underneath. It takes every `Input` prop;
 * `register` and `validationSchema` work the same way.
 *
 * The label points at the control's id, `formElement-{name}`. The helper row
 * always renders: it shows `helperText`, or the message of `errors` when that
 * is set, and a `count / maxLength` counter when `maxLength` is set.
 *
 * The label, control and helper row are rendered as siblings, with no wrapping
 * element: in a grid or flex layout, wrap each TextField in its own element.
 *
 * Every prop in the Controls panel applies here.
 */
export const Default: StoryObj<Args> = {
  args: {
    name: 'username',
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Letters, numbers and dots only',
    success: false,
    disabled: false,
    multirow: false,
  },
  render: function Render(args) {
    const { register } = useForm();
    return <TextField {...args} register={register} />;
  },
};

/**
 * The status comes from two props, not from `status`:
 *
 * - `errors` (a react-hook-form `FieldError`) colours the field red and shows
 *   its message in place of `helperText`;
 * - `success` colours the field and the helper text green. When both are set,
 *   `success` wins and the error message shows in green.
 *
 * Unlike a bare `Input`, the single-line field shows no status icon.
 * `disabled` mutes the label, the field and the helper text.
 */
export const States: StoryObj<Args> = {
  render: function Render(args) {
    const { register } = useForm();
    return (
      <div style={column}>
        <div>
          <TextField
            {...args}
            name="basic"
            label="Basic"
            placeholder="Basic"
            register={register}
            helperText="Helper text"
          />
        </div>
        <div>
          <TextField
            {...args}
            name="error"
            label="Error"
            placeholder="Error"
            register={register}
            errors={{ type: 'required', message: 'This field is required' }}
          />
        </div>
        <div>
          <TextField
            {...args}
            name="success"
            label="Success"
            placeholder="Success"
            register={register}
            success
            helperText="Username is available"
          />
        </div>
        <div>
          <TextField
            {...args}
            name="disabled"
            label="Disabled"
            placeholder="Disabled"
            register={register}
            disabled
            helperText="You can't change this"
          />
        </div>
      </div>
    );
  },
};

/**
 * `startElement` and `endElement` work as on `Input` (single-line only): any
 * element inside the field, with the text padded so it doesn't run
 * underneath. Make interactive elements real buttons with an accessible name.
 */
export const WithElements: StoryObj<Args> = {
  render: function Render(args) {
    const { register } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div style={column}>
        <div>
          <TextField
            {...args}
            name="search"
            label="Search"
            placeholder="Search people"
            register={register}
            startElement={<Icon name="search" size={16} />}
          />
        </div>
        <div>
          <TextField
            {...args}
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            register={register}
            startElement={<Icon name="lock" size={16} />}
            endElement={
              <IconButton
                icon={showPassword ? 'invisible' : 'visible'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((shown) => !shown)}
                transparent
              />
            }
          />
        </div>
      </div>
    );
  },
};

/**
 * `multirow` renders a `Textarea` instead of an `Input`; `rows` sets its
 * height (default 10). The textarea's resize handle and other textarea
 * options are covered on the Textarea page.
 *
 * `maxLength` adds the `count / max` counter and, on a multirow field, also
 * stops typing at the limit (a single-line field only counts). The counter
 * starts at 0 for a prefilled value.
 */
export const Multiline: StoryObj<Args> = {
  render: function Render(args) {
    const { register } = useForm();
    return (
      <TextField
        {...args}
        name="summary"
        label="Summary"
        placeholder="A few sentences about the candidate"
        register={register}
        multirow
        rows={4}
        maxLength={300}
        helperText="Shown on the candidate card"
      />
    );
  },
};

/**
 * `labelBadge` adds a status pill to the right of the label: a Chip colour
 * (`primary`, `warning`, …), any theme colour key or a CSS colour. A field
 * with a badge stays aligned with one without. The badge is announced as the
 * field's description, not as part of its name, and needs a `label`.
 */
export const WithLabelBadge: StoryObj<Args> = {
  render: function Render(args) {
    const { register } = useForm();
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <TextField
            {...args}
            name="firstName"
            label="First name"
            placeholder="Sofia"
            register={register}
            labelBadge={{ text: 'mapped', color: 'primary' }}
          />
        </div>
        <div>
          <TextField
            {...args}
            name="location"
            label="Location"
            placeholder="Kyiv, Ukraine"
            register={register}
          />
        </div>
        <div>
          <TextField
            {...args}
            name="linkedin"
            label="LinkedIn URL"
            placeholder="linkedin.com/in/name"
            register={register}
            labelBadge={{ text: 'not in the CV', color: 'warning' }}
          />
        </div>
        <div>
          <TextField
            {...args}
            name="hex"
            label="Custom colour"
            register={register}
            labelBadge={{ text: '#14b8a6', color: '#14b8a6' }}
          />
        </div>
      </div>
    );
  },
  decorators: [
    (Story) => (
      <div style={{ width: 560 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * TextField does not read form state: pass `formState.errors.x` as `errors`.
 * `register` is typed for an untyped `useForm()`, whose error entries need
 * `as FieldError`. Submit the empty form to see the errors.
 */
export const ReactHookForm: StoryObj<Args> = {
  render: function Render(args) {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    return (
      <form style={column} onSubmit={handleSubmit(() => {})}>
        <div>
          <TextField
            {...args}
            name="email"
            label="Email"
            type="email"
            register={register}
            validationSchema={{
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
            }}
            errors={errors.email as FieldError}
            helperText="We'll send the invite here"
          />
        </div>
        <div>
          <TextField
            {...args}
            name="note"
            label="Note"
            register={register}
            validationSchema={{ required: 'Add a note for the invitee' }}
            errors={errors.note as FieldError}
            multirow
            rows={3}
            maxLength={100}
          />
        </div>
        <Button type="submit" variant="primary" text="Send invite" />
      </form>
    );
  },
};
