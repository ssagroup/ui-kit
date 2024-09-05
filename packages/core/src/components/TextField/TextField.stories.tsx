import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FieldError, FieldValues } from 'react-hook-form';

import TextField from '@components/TextField';
import Icon from '@components/Icon';
import Form from '@components/Form';
import FormGroup from '@components/FormGroup';

type Args = Parameters<typeof TextField>[0];

export default {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    validationSchema: {
      control: {
        disable: true,
      },
    },
    register: {
      control: {
        disable: true,
      },
    },
    setCountChar: {
      control: {
        disable: true,
      },
    },
    endElement: {
      control: {
        disable: true,
      },
    },
    type: {
      description: 'input HTML valid type',
    },
  },
  decorators: [
    (Story, context) => {
      const useFormResult = useForm<FieldValues>();
      return (
        <Form
          onSubmit={useFormResult.handleSubmit((data) => {
            console.log('>>>onSubmit', data);
          })}>
          <FormGroup>
            {Story({
              args: {
                ...context.args,
                register: useFormResult.register,
              },
            })}
          </FormGroup>
        </Form>
      );
    },
  ],
} as Meta<typeof TextField>;

const mockError: FieldError = {
  type: 'required',
  message: 'Required field',
};

export const Basic: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} register={args.register} />;
};
Basic.args = {
  placeholder: 'Field',
  label: 'Field',
  name: 'field1',
  validationSchema: {
    required: 'Required',
  },
  helperText: 'some nice text',
};

export const WithError: StoryObj<typeof TextField> = (args: Args) => {
  return (
    <TextField
      placeholder="Field error"
      label="Field"
      name="field2"
      register={args.register}
      validationSchema={{
        required: 'Required',
      }}
      errors={mockError}
    />
  );
};
WithError.args = {};

export const WithSuccess: StoryObj<typeof TextField> = (args: Args) => {
  return (
    <TextField
      placeholder="Field success"
      label="Field"
      name="field3"
      register={args.register}
      validationSchema={{
        required: 'Required',
      }}
      success={true}
      helperText="some nice text"
    />
  );
};
WithSuccess.args = {};

export const Disabled: StoryObj<typeof TextField> = (args: Args) => {
  return (
    <TextField
      placeholder="Field disabled"
      label="Field"
      name="field4"
      register={args.register}
      helperText="some nice text"
      disabled={true}
      endElement={<Icon name="visible" size={16} />}
    />
  );
};
Disabled.args = {};

export const WithStatusDisabled: StoryObj<typeof TextField> = (args: Args) => {
  return (
    <TextField
      placeholder="Field success disabled"
      label="Field"
      name="field5"
      register={args.register}
      helperText="some nice text"
      disabled={true}
      success={true}
    />
  );
};
WithStatusDisabled.args = {};

export const WithAction: StoryObj<typeof TextField> = (args: Args) => {
  return (
    <TextField
      type="password"
      placeholder="Field"
      label="Field"
      name="field6"
      register={args.register}
      helperText="some nice text"
      endElement={
        <button
          type="submit"
          onClick={(event) => {
            console.log('>>>action...');
            event.preventDefault();
          }}>
          Action
        </button>
      }
    />
  );
};
WithAction.args = {};

export const MultilineSimple: StoryObj<typeof TextField> = (args: Args) => {
  return (
    <TextField
      multirow
      rows={10}
      placeholder="Textarea"
      name="textarea"
      register={args.register}
    />
  );
};
MultilineSimple.args = {};

export const Multiline: StoryObj<typeof TextField> = (args: Args) => {
  return (
    <TextField
      multirow
      maxLength={100}
      label="Textarea"
      placeholder="Textarea"
      name="textarea"
      helperText="some nice text"
      register={args.register}
    />
  );
};
Multiline.args = {};

export const MultilineDisabled: StoryObj<typeof TextField> = (args: Args) => {
  return (
    <TextField
      multirow
      disabled
      label="Textarea"
      placeholder="Textarea"
      name="textarea"
      helperText="some nice text"
      register={args.register}
    />
  );
};
MultilineDisabled.args = {};

export const Focused: StoryObj<typeof TextField> = (args: Args) => {
  return <TextField {...args} />;
};
Focused.args = {
  ...Basic.args,
  label: 'Focused field',
};

Focused.parameters = {
  pseudo: {
    focus: true,
  },
};
