import type { Meta, StoryObj } from '@storybook/react';
import { FieldValues, useForm } from 'react-hook-form';

import Input from '@components/Input';
import Icon from '@components/Icon';
import { InputProps } from './Input.types';

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
    append: {
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
  append,
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
      append={append}
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
      append={<Icon name="visible" />}
    />
  );
};
WithIcon.args = {};

export const WhithError: StoryObj<typeof Input> = () => {
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
WhithError.args = {};

export const WhithSuccess: StoryObj<typeof Input> = () => {
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
WhithSuccess.args = {};

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
      append={
        <button onClick={() => console.log('calling action...')}>Action</button>
      }
      status="basic"
    />
  );
};
WithCallAction.args = {};
