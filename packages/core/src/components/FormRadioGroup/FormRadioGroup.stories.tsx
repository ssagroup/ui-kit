import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useForm } from 'react-hook-form';
import Button from '@components/Button';
import FormHelperText from '@components/FormHelperText';
import Radio from '@components/Radio';
import Typography from '@components/Typography';
import FormRadioGroup from './FormRadioGroup';
import { FormRadioGroupProps } from './types';

type DemoForm = { tree: string };
type Args = FormRadioGroupProps<DemoForm>;

const fieldsetStyle = { border: 0, margin: 0, padding: 0 };
const legendStyle = { padding: 0, marginBottom: 8, fontWeight: 500 };

export default {
  title: 'Components/Radio Buttons/FormRadioGroup',
  component: FormRadioGroup,
  argTypes: {
    color: {
      options: ['primary', 'success', 'custom'],
      control: { type: 'select' },
    },
    control: { control: false },
    children: { control: false },
    className: { control: false },
    value: { table: { disable: true } },
    externalState: { table: { disable: true } },
  },
  parameters: {
    docs: { source: { type: 'code' } },
  },
} as Meta<typeof FormRadioGroup>;

/**
 * Pass the form's `control` and a field `name`; every pick is written into
 * the form. `isRequired` adds a `required` rule, so submitting with nothing
 * picked fails validation — but FormRadioGroup shows no message itself. Read
 * `formState.errors` and render one, as here.
 *
 * `isRequired` also sets the native `required` attribute, so the browser's
 * own validation blocks the submit before react-hook-form runs. Add
 * `noValidate` to the `<form>` to get your message instead of the browser's.
 *
 * Wrap the group in a `<fieldset>` with a `<legend>` to give it a name.
 */
export const Default: StoryObj<Args> = {
  args: {
    name: 'tree',
    isRequired: true,
    color: 'primary',
  },
  render: function Render(args) {
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm<DemoForm>();
    const [submitted, setSubmitted] = useState<DemoForm>();

    return (
      <form noValidate onSubmit={handleSubmit(setSubmitted)}>
        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Favourite tree</legend>
          <FormRadioGroup
            {...args}
            control={control}
            css={{ display: 'flex', gap: 24 }}>
            <Radio id="tree-oak" value="oak" text="Oak" />
            <Radio id="tree-spruce" value="spruce" text="Spruce" />
            <Radio
              id="tree-chestnut"
              value="chestnut"
              text="Chestnut"
              disabled
            />
          </FormRadioGroup>
          {errors.tree && (
            <FormHelperText status="error" role="alert">
              Pick a tree
            </FormHelperText>
          )}
        </fieldset>
        <div
          style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            marginTop: 12,
          }}>
          <Button type="submit" variant="primary" size="small" text="Submit" />
          {submitted && (
            <Typography variant="body1">
              Submitted: {JSON.stringify(submitted)}
            </Typography>
          )}
        </div>
      </form>
    );
  },
};

/**
 * The group does not read the form value back: `defaultValues`, `reset()`
 * and `setValue()` set the form but not the radios. To start with a
 * selection, give the form its `defaultValues` and pass the same value as the
 * group's `defaultValue`.
 */
export const WithDefaultValue: StoryObj<Args> = {
  args: {
    name: 'tree',
  },
  render: function Render(args) {
    const { control, handleSubmit } = useForm<DemoForm>({
      defaultValues: { tree: 'spruce' },
    });
    const [submitted, setSubmitted] = useState<DemoForm>();

    return (
      <form onSubmit={handleSubmit(setSubmitted)}>
        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Favourite tree</legend>
          <FormRadioGroup
            {...args}
            control={control}
            defaultValue="spruce"
            css={{ display: 'flex', gap: 24 }}>
            <Radio id="default-oak" value="oak" text="Oak" />
            <Radio id="default-spruce" value="spruce" text="Spruce" />
            <Radio id="default-chestnut" value="chestnut" text="Chestnut" />
          </FormRadioGroup>
        </fieldset>
        <div
          style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            marginTop: 12,
          }}>
          <Button type="submit" variant="primary" size="small" text="Submit" />
          {submitted && (
            <Typography variant="body1">
              Submitted: {JSON.stringify(submitted)}
            </Typography>
          )}
        </div>
      </form>
    );
  },
};
