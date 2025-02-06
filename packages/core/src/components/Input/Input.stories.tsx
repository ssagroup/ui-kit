import type { Meta, StoryObj } from '@storybook/react';
import { FieldValues, useForm } from 'react-hook-form';

import Input from '@components/Input';
import Icon from '@components/Icon';
import { InputProps } from './types';

export default {
  title: 'Components/Inputs',
  component: Input,

  argTypes: {
    status: {
      options: ['basic', 'error', 'success'],
      control: {
        type: 'inline-radio',
      },
    },
    type: {
      description: 'input HTML valid type',
    },
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
    endElement: {
      control: {
        disable: true,
      },
    },
  },
} as Meta<typeof Input>;

export const Default: StoryObj<typeof Input> = ({
  placeholder,
  name,
  status,
  endElement,
  disabled,
  type,
}: InputProps) => {
  const { register } = useForm<FieldValues>();

  return (
    <Input
      type={type}
      placeholder={placeholder}
      name={name}
      register={register}
      validationSchema={{
        required: 'Required',
      }}
      endElement={endElement}
      status={status}
      disabled={disabled}
    />
  );
};

Default.args = {
  placeholder: 'Field',
  name: 'field1',
  status: 'basic',
};

export const WithIcon: StoryObj<typeof Input> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <Input
      placeholder="Field"
      name="field1"
      register={register}
      validationSchema={{
        required: 'Required',
      }}
      endElement={<Icon name="visible" />}
    />
  );
};
WithIcon.args = {};

export const WithBothIcons: StoryObj<typeof Input> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <Input
      placeholder="Field"
      name="field1"
      register={register}
      validationSchema={{
        required: 'Required',
      }}
      startElement={<Icon name="invisible" />}
      endElement={<Icon name="visible" />}
    />
  );
};
WithBothIcons.args = {};

export const WithError: StoryObj<typeof Input> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <Input
      placeholder="Field error"
      name="field2"
      register={register}
      validationSchema={{
        required: 'Required',
      }}
      status="error"
    />
  );
};
WithError.args = {};

export const WithErrorAndHelperText: StoryObj<typeof Input> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <Input
      placeholder="Field error"
      name="field2"
      register={register}
      validationSchema={{
        required: 'Required',
      }}
      showHelperText
      helperText={'Helper Text'}
      status="error"
      errors={{
        type: 'value',
        message: 'Error...',
      }}
    />
  );
};
WithErrorAndHelperText.storyName = 'With Error and Helper Text';
WithErrorAndHelperText.args = {};

export const WithSuccess: StoryObj<typeof Input> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <Input
      placeholder="Field success"
      name="field3"
      register={register}
      validationSchema={{
        required: 'Required',
      }}
      status="success"
    />
  );
};
WithSuccess.args = {};

export const WithSuccessAndHelperText: StoryObj<typeof Input> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <Input
      placeholder="Field success"
      name="field3"
      register={register}
      validationSchema={{
        required: 'Required',
      }}
      status="success"
      showHelperText
      helperText="Some nice text"
    />
  );
};
WithSuccessAndHelperText.storyName = 'With Success and Helper Text';
WithSuccessAndHelperText.args = {};

export const Disabled: StoryObj<typeof Input> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <Input
      placeholder="Field disabled"
      name="field4"
      register={register}
      disabled={true}
      status="basic"
    />
  );
};
Disabled.args = {};

export const WithStatusDisabled: StoryObj<typeof Input> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <Input
      placeholder="Field success disabled"
      name="field5"
      register={register}
      disabled={true}
      status="success"
    />
  );
};
WithStatusDisabled.args = {};

export const WithCallAction: StoryObj<typeof Input> = () => {
  const { register } = useForm<FieldValues>();

  return (
    <Input
      type="password"
      placeholder="Field"
      name="field6"
      register={register}
      endElement={
        <button onClick={() => console.log('calling action...')}>Action</button>
      }
      status="basic"
    />
  );
};
WithCallAction.args = {};

export const Focused: StoryObj<typeof Input> & {
  args: { label?: string };
} = () => {
  const { register } = useForm<FieldValues>();

  return (
    <Input
      placeholder="Field focused"
      name="field3"
      register={register}
      validationSchema={{
        required: 'Required',
      }}
      status="basic"
    />
  );
};
Focused.args = {
  ...Default.args,
  label: 'Focused Input',
};

Focused.parameters = {
  pseudo: {
    focus: true,
  },
};
