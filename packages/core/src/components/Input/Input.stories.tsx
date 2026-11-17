import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import Input from '@components/Input';
import Icon from '@components/Icon';
import Button from '@components/Button';
import { IconButton } from '@components/IconButton';
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
  const [sent, setSent] = useState(0);

  return (
    <Input
      placeholder="Confirmation code"
      name="confirmationCode"
      register={register}
      endElement={
        <Button
          variant="custom"
          size="small"
          text={sent ? `Resent (${sent})` : 'Resend code'}
          onClick={() => setSent((count) => count + 1)}
        />
      }
    />
  );
};
WithCallAction.args = {};
WithCallAction.parameters = {
  docs: {
    description: {
      story:
        'A text action inside the field. The input reserves room for the button, so typed text never runs under it.',
    },
  },
};

export const WithPasswordToggle: StoryObj<typeof Input> = () => {
  const { register } = useForm<FieldValues>();
  const [visible, setVisible] = useState(false);

  return (
    <Input
      type={visible ? 'text' : 'password'}
      placeholder="Password"
      name="password"
      register={register}
      endElement={
        <IconButton
          icon={visible ? 'invisible' : 'visible'}
          aria-label={visible ? 'Hide password' : 'Show password'}
          transparent
          onClick={() => setVisible((value) => !value)}
        />
      }
    />
  );
};
WithPasswordToggle.args = {};
WithPasswordToggle.parameters = {
  docs: {
    description: {
      story:
        'An icon action inside the field: toggles password visibility. IconButton renders a real button, so it works from the keyboard.',
    },
  },
};

export const WithEndElementClick: StoryObj<typeof Input> = () => {
  const { register, setValue } = useForm<FieldValues>();

  return (
    <Input
      placeholder="Search"
      name="search"
      register={register}
      endElement={
        <IconButton icon="cross" aria-label="Clear search" transparent />
      }
      onEndElementClick={() => setValue('search', '')}
    />
  );
};
WithEndElementClick.args = {};
WithEndElementClick.parameters = {
  docs: {
    description: {
      story:
        '`onEndElementClick` (and `onStartElementClick`) handle clicks anywhere in the slot. Pass a button as the element so the handler also fires from the keyboard.',
    },
  },
};

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
