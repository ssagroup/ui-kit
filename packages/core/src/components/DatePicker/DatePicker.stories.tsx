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
      const storyDate = DateTime.fromFormat(
        '2025-01-15',
        'yyyy-MM-dd',
      ).toFormat('MM/dd/yyyy');
      const useFormResult = useForm<FieldValues>({
        defaultValues: {
          field1: storyDate,
        },
      });
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

const commonArgs: Partial<DatePickerProps> = {
  onChange: (date) => {
    console.log('event: onChange', date);
  },
  onOpen: () => {
    console.log('event: onOpen');
  },
  onClose: () => {
    console.log('event: onClose');
  },
  onError: (date, error) => {
    console.log('event: onError', date, error);
  },
  onMonthChange: (date) => {
    console.log('event: onMonthChange', date);
  },
  onYearChange: (date) => {
    console.log('event: onYearChange', date);
  },
};

export const Default: StoryObj<typeof DatePicker> = (args: DatePickerProps) => {
  return <DatePicker {...args} />;
};
Default.args = {
  name: 'field1',
  ...commonArgs,
};

export const CurrentDate: StoryObj<typeof DatePicker> = (
  args: DatePickerProps,
) => {
  return <DatePicker {...args} />;
};
CurrentDate.args = {
  name: 'field2',
  ...commonArgs,
};

export const AnotherFormat: StoryObj<typeof DatePicker> = (
  args: DatePickerProps,
) => {
  return <DatePicker {...args} />;
};
AnotherFormat.args = {
  name: 'field3',
  format: 'dd/mm/yyyy',
  ...commonArgs,
};

export const Disabled: StoryObj<typeof DatePicker> = (
  args: DatePickerProps,
) => {
  return <DatePicker {...args} />;
};
Disabled.args = {
  name: 'field4',
  disabled: true,
  ...commonArgs,
};
