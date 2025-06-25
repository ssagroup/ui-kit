import { useEffect, useRef, useState } from 'react';
import { useForm, FieldValues, FormProvider } from 'react-hook-form';
import { DateTime } from 'luxon';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Form from '@components/Form';
import FormGroup from '@components/FormGroup';
import { DatePicker } from './DatePicker';
import { DatePickerProps } from './types';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
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
} as Meta<typeof DatePicker>;

const commonArgs: Partial<DatePickerProps> = {
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

export const Default: StoryObj<typeof DatePicker> = (args: DatePickerProps) => {
  return <DatePicker {...args} />;
};
Default.args = {
  ...commonArgs,
  name: 'field1',
  helperText: 'some nice text',
};

export const AnotherFormat: StoryObj<typeof DatePicker> = (
  args: DatePickerProps,
) => {
  return <DatePicker {...args} />;
};
AnotherFormat.args = {
  ...commonArgs,
  name: 'field2',
  format: 'dd/mm/yyyy',
};

export const Disabled: StoryObj<typeof DatePicker> = (
  args: DatePickerProps,
) => {
  return <DatePicker {...args} />;
};
Disabled.args = {
  ...commonArgs,
  name: 'field3',
  disabled: true,
};

export const WithSpecificDateRange: StoryObj<typeof DatePicker> = (
  args: DatePickerProps,
) => {
  return <DatePicker {...args} />;
};
WithSpecificDateRange.args = {
  ...commonArgs,
  name: 'field4',
  dateMin: DateTime.now().set({ day: 10 }).toFormat('MM/dd/yyyy'),
  dateMax: DateTime.now()
    .plus({ years: 5 })
    .set({ month: 5, day: 11 })
    .toFormat('MM/dd/yyyy'),
};

export const WithDefaultValue: StoryObj<typeof DatePicker> = (
  args: DatePickerProps,
) => {
  return <DatePicker {...args} />;
};
WithDefaultValue.args = {
  ...commonArgs,
  name: 'field5',
  defaultValue: '02/10/2025',
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
  ...commonArgs,
  name: 'field6',
};

export const WithInputRef: StoryObj<typeof DatePicker> = (
  args: DatePickerProps,
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  console.log('inputRef:', inputRef.current?.value);
  return <DatePicker {...args} ref={inputRef} />;
};
WithInputRef.args = {
  ...commonArgs,
  name: 'field7',
  defaultValue: '02/10/2025',
};
