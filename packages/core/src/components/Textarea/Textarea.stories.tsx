import type { Meta, StoryObj } from '@storybook/react';
import { FieldValues, useForm } from 'react-hook-form';

import Textarea from '@components/Textarea';

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

export const Basic: StoryObj<typeof Textarea> = (args) => {
  const { register } = useForm<FieldValues>();

  return <Textarea {...args} register={register} />;
};

Basic.args = {
  placeholder: 'Textarea',
  name: 'textarea',
  validationSchema: {
    required: 'Requ ired',
  },
};
Basic.storyName = 'Textarea';
