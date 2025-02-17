import { useEffect, useState } from 'react';
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
  label: 'Field',
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
  helperText: 'some nice text',
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

export const WithSpecificDateRange: StoryObj<typeof DatePicker> = (
  args: DatePickerProps,
) => {
  return <DatePicker {...args} />;
};
WithSpecificDateRange.args = {
  name: 'field5',
  dateMin: '02/10/2025',
  dateMax: '11/05/2030',
  ...commonArgs,
};

export const WithDefaultValue: StoryObj<typeof DatePicker> = (
  args: DatePickerProps,
) => {
  return <DatePicker {...args} />;
};
WithDefaultValue.args = {
  name: 'field6',
  defaultValue: '02/10/2025',
  ...commonArgs,
};

export const WithExternalValue: StoryObj<typeof DatePicker> = (
  args: DatePickerProps,
) => {
  const dates = ['01/15/2025', '02/10/2025', '11/05/2030'];
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState(dates[index]);
  setTimeout(() => {
    let newIndex = index + 1;
    if (newIndex === dates.length) {
      newIndex = 0;
    }
    setIndex(newIndex);
  }, 3000);
  useEffect(() => {
    setValue(dates[index]);
  }, [index]);
  return <DatePicker {...args} value={value} />;
};
WithExternalValue.args = {
  name: 'field7',
  ...commonArgs,
};
