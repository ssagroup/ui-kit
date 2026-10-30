import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { fn } from 'storybook/test';
import { FieldError, useForm } from 'react-hook-form';

import Button from '@components/Button';
import Icon from '@components/Icon';
import { IconButton } from '@components/IconButton';
import Input from './Input';
import { InputProps } from './types';

type Args = InputProps;

const column = { display: 'flex', flexDirection: 'column', gap: 16 } as const;

export default {
  title: 'Components/Input',
  component: Input,
  args: {
    onKeyUp: fn(),
  },
  argTypes: {
    status: {
      control: 'inline-radio',
      options: ['basic', 'error', 'success', 'custom'],
    },
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
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<Args>;

/**
 * Input is the bare field: a bordered `<input>` with an optional status icon,
 * start / end elements and a helper row. It has no label; for a labelled field
 * use `TextField`, or compose one with `Field`.
 *
 * Pass `register` from react-hook-form and the input registers itself under
 * `name` with `validationSchema` as its rules. The `<input>` gets
 * `id="formElement-{name}"`; set `inputProps.id` to use another id.
 *
 * Every prop in the Controls panel applies here. `status` only styles the
 * field: `error` and `success` colour the border and show an icon (with
 * `errorTooltip` / `successTooltip` on hover), `custom` drops the status
 * styling. `showHelperText` adds the helper row, which shows `helperText`.
 *
 * Input renders the field and the helper row as siblings, with no wrapping
 * element: in a grid or flex layout, wrap each Input in its own element.
 */
export const Default: StoryObj<Args> = {
  args: {
    name: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    inputProps: { 'aria-label': 'Email' },
    status: 'basic',
    disabled: false,
    showHelperText: false,
    helperText: 'We never share your email',
    showStatusIcon: true,
    showBorders: true,
    errorTooltip: 'Enter a valid email',
    successTooltip: 'Looks good',
  },
  render: function Render(args) {
    const { register } = useForm();
    return <Input {...args} register={register} />;
  },
};

/**
 * `status` sets the border colour and the status icon. With `showHelperText`,
 * the helper row shows `helperText`, or the message of `errors` (a
 * react-hook-form `FieldError`) when that is set — coloured by `status`.
 *
 * `disabled` mutes the field and its helper text and hides the status icon.
 */
export const Statuses: StoryObj<Args> = {
  render: function Render(args) {
    const { register } = useForm();
    return (
      <div style={column}>
        <div>
          <Input
            {...args}
            name="basic"
            placeholder="Basic"
            inputProps={{ 'aria-label': 'Basic' }}
            register={register}
            showHelperText
            helperText="Helper text"
          />
        </div>
        <div>
          <Input
            {...args}
            name="error"
            placeholder="Error"
            inputProps={{ 'aria-label': 'Error' }}
            register={register}
            status="error"
            showHelperText
            errors={{ type: 'required', message: 'This field is required' }}
          />
        </div>
        <div>
          <Input
            {...args}
            name="success"
            placeholder="Success"
            inputProps={{ 'aria-label': 'Success' }}
            register={register}
            status="success"
            showHelperText
            helperText="Username is available"
          />
        </div>
        <div>
          <Input
            {...args}
            name="disabled"
            placeholder="Disabled success"
            inputProps={{ 'aria-label': 'Disabled success' }}
            register={register}
            status="success"
            disabled
            showHelperText
            helperText="Disabled fields hide the status icon"
          />
        </div>
      </div>
    );
  },
};

/**
 * `startElement` and `endElement` place any element inside the field, 14px
 * from its edge, and pad the text to 40px so it doesn't run underneath. Keep
 * them icon-sized.
 *
 * An `endElement` replaces the status icon. Make interactive elements real
 * buttons with their own `onClick` and an accessible name, as with the
 * show-password toggle here.
 */
export const WithElements: StoryObj<Args> = {
  render: function Render(args) {
    const { register } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div style={column}>
        <Input
          {...args}
          name="search"
          placeholder="Search"
          inputProps={{ 'aria-label': 'Search' }}
          register={register}
          startElement={<Icon name="search" size={16} />}
        />
        <Input
          {...args}
          name="password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          inputProps={{ 'aria-label': 'Password' }}
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
    );
  },
};

/**
 * With `showHelperText`, `maxLength` adds a `count / max` counter at the
 * right of the helper row.
 *
 * The counter is display-only: `maxLength` is not set on the `<input>`, so it
 * does not stop typing past the limit. The count updates on key-up, so it
 * starts at 0 for a prefilled value.
 */
export const CharacterCounter: StoryObj<Args> = {
  render: function Render(args) {
    const { register } = useForm();
    return (
      <Input
        {...args}
        name="bio"
        placeholder="Tell us about yourself"
        inputProps={{ 'aria-label': 'Bio' }}
        register={register}
        showHelperText
        helperText="Shown on your profile"
        maxLength={60}
      />
    );
  },
};

/**
 * Input does not read form state: map `formState.errors` to `status` and
 * `errors` yourself, and turn on `showHelperText` to show the message.
 * `register` is typed for an untyped `useForm()`, whose error entries need
 * `as FieldError`.
 * `validationSchema` takes react-hook-form register rules (`required`,
 * `pattern`, `minLength`, …). Submit the empty form to see the errors.
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
          <Input
            {...args}
            name="name"
            placeholder="Full name"
            inputProps={{ 'aria-label': 'Full name' }}
            register={register}
            validationSchema={{ required: 'Name is required' }}
            status={errors.name ? 'error' : 'basic'}
            errors={errors.name as FieldError}
            showHelperText
          />
        </div>
        <div>
          <Input
            {...args}
            name="email"
            type="email"
            placeholder="Email"
            inputProps={{ 'aria-label': 'Email' }}
            register={register}
            validationSchema={{
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
            }}
            status={errors.email ? 'error' : 'basic'}
            errors={errors.email as FieldError}
            showHelperText
            showStatusIcon={false}
            endElement={<Icon name="email" size={16} />}
          />
        </div>
        <Button type="submit" variant="primary" text="Submit" />
      </form>
    );
  },
};

/**
 * Without `register`, Input has no `value` or `onChange` props of its own:
 * pass them through `inputProps`, which go straight to the `<input>`. `name`
 * only reaches the `<input>` through `register`, so set `inputProps.name` too
 * if a native form submit needs it. Input logs a console warning when
 * `register` is missing.
 */
export const WithoutReactHookForm: StoryObj<Args> = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <div style={column}>
        <Input
          {...args}
          name="query"
          placeholder="Type something"
          inputProps={{
            value,
            onChange: (event) => setValue(event.target.value),
            'aria-label': 'Query',
          }}
        />
        <span>Value: {value || '—'}</span>
      </div>
    );
  },
};
