import type { Meta, StoryObj } from '@storybook/react';
import { useForm, FieldError, FieldValues } from 'react-hook-form';

import TextField from '@components/TextField';
import Icon from '@components/Icon';
import Form from '@components/Form';
import FormGroup from '@components/FormGroup';

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
    append: {
      control: {
        disable: true,
      },
    },
    type: {
      description: 'input HTML valid type',
    },
  },
  decorators: [
    (Story) => (
      <Form>
        <FormGroup>{Story()}</FormGroup>
      </Form>
    ),
  ],
} as Meta<typeof TextField>;

const mockError: FieldError = {
  type: 'required',
  message: 'Required field',
};

export const Basic: StoryObj<typeof TextField> = (args) => {
  const { register } = useForm<FieldValues>();

  return <TextField {...args} register={register} />;
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

export const WithError: StoryObj<typeof TextField> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <TextField
      placeholder="Field error"
      label="Field"
      name="field2"
      register={register}
      validationSchema={{
        required: 'Required',
      }}
      errors={mockError}
    />
  );
};
WithError.args = {};

export const WithSuccess: StoryObj<typeof TextField> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <TextField
      placeholder="Field success"
      label="Field"
      name="field3"
      register={register}
      validationSchema={{
        required: 'Required',
      }}
      success={true}
      helperText="some nice text"
    />
  );
};
WithSuccess.args = {};

export const Disabled: StoryObj<typeof TextField> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <TextField
      placeholder="Field disabled"
      label="Field"
      name="field4"
      register={register}
      helperText="some nice text"
      disabled={true}
      append={<Icon name="visible" size={16} />}
    />
  );
};
Disabled.args = {};

export const WithStatusDisabled: StoryObj<typeof TextField> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <TextField
      placeholder="Field success disabled"
      label="Field"
      name="field5"
      register={register}
      helperText="some nice text"
      disabled={true}
      success={true}
    />
  );
};
WithStatusDisabled.args = {};

export const WithAction: StoryObj<typeof TextField> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <TextField
      type="password"
      placeholder="Field"
      label="Field"
      name="field6"
      register={register}
      helperText="some nice text"
      append={
        <button onClick={() => console.log('calling action...')}>Action</button>
      }
    />
  );
};
WithAction.args = {};

export const MultilineSimple: StoryObj<typeof TextField> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <TextField
      multirow
      rows={10}
      placeholder="Textarea"
      name="textarea"
      register={register}
    />
  );
};
MultilineSimple.args = {};

export const Multiline: StoryObj<typeof TextField> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <TextField
      multirow
      maxLength={100}
      label="Textarea"
      placeholder="Textarea"
      name="textarea"
      helperText="some nice text"
      register={register}
    />
  );
};
Multiline.args = {};

export const MultilineDisabled: StoryObj<typeof TextField> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <TextField
      multirow
      disabled
      label="Textarea"
      placeholder="Textarea"
      name="textarea"
      helperText="some nice text"
      register={register}
    />
  );
};
MultilineDisabled.args = {};
