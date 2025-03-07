import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import { DateTime } from 'luxon';
import type { Meta, StoryObj } from '@storybook/react';
import Form from '@components/Form';
import FormGroup from '@components/FormGroup';
import { DateRangePicker } from './DateRangePicker';
import { DateRangePickerProps } from './types';

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  argTypes: {
    openCalendarMode: {
      defaultValue: 'icon',
    },
    defaultValue: {
      type: 'string',
    },
  },
  parameters: {
    controls: {
      include: ['disabled', 'label', 'openCalendarMode', 'helperText'],
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
              console.log('event: onSubmit', data);
            })}
            css={{
              width: 350,
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
} as Meta<typeof DateRangePicker>;

const commonArgs: Partial<DateRangePickerProps> = {
  label: 'Field',
  openCalendarMode: 'icon',
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
  onBlur: (event) => {
    console.log('event: onBlur', event);
  },
};

export const Default: StoryObj<typeof DateRangePicker> = (
  args: DateRangePickerProps,
) => {
  return <DateRangePicker {...args} />;
};
Default.args = {
  ...commonArgs,
  name: 'field1',
  helperText: 'some nice text',
};
