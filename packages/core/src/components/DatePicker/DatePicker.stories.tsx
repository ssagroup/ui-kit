import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import type { Meta, StoryObj } from '@storybook/react';
import Form from '@components/Form';
import FormGroup from '@components/FormGroup';
import { DatePicker } from './DatePicker';
import { DatePickerProps } from './types';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    register: {
      control: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const useFormResult = useForm<FieldValues>();
      return (
        <FormProvider {...useFormResult}>
          <Form
            onSubmit={useFormResult.handleSubmit((data) => {
              console.log('>>>onSubmit', data);
            })}
            css={{
              width: 400,
            }}>
            <FormGroup>
              {Story({
                args: {
                  ...context.args,
                },
              })}
            </FormGroup>
          </Form>
        </FormProvider>
      );
    },
  ],
} as Meta<typeof DatePicker>;

export const Default: StoryObj<typeof DatePicker> = (args: DatePickerProps) => {
  return <DatePicker {...args} />;
};
Default.args = {
  name: 'field1',
};
