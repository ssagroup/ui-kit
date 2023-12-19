import type { Meta, StoryObj } from '@storybook/react';
import { FieldValues, useForm } from 'react-hook-form';

import Textarea from '@components/Textarea';

type Args = Parameters<typeof Textarea>[0];

export default {
  title: 'Components/Textarea',
  component: Textarea,
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
  },
} as Meta<typeof Textarea>;

export const Basic: StoryObj<typeof Textarea> = (args: Args) => {
  const { register } = useForm<FieldValues>();

  return <Textarea {...args} register={register} />;
};

Basic.args = {
  placeholder: 'Textarea',
  title: 'Textarea title',
  name: 'textarea',
  validationSchema: {
    required: 'Required',
  },
};
Basic.storyName = 'Textarea';

export const Focused: StoryObj<typeof Textarea> = (args: Args) => {
  const { register } = useForm<FieldValues>();

  return <Textarea {...args} register={register} />;
};
Focused.args = {
  ...Basic.args,
};

Focused.parameters = {
  pseudo: {
    focus: true,
  },
};
