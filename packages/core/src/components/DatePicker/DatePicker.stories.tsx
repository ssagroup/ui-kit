import { useEffect } from 'react';
import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import { DateTime } from 'luxon';
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
      useEffect(() => {
        const storyDate = DateTime.fromFormat(
          '2025-01-15',
          'yyyy-MM-dd',
        ).toFormat('MM/dd/yyyy');
        useFormResult.setValue('field1', storyDate);
      }, []);
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
