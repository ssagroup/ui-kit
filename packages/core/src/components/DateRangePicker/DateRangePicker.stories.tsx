import { useEffect, useState } from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import { DateTime } from 'luxon';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Form from '@components/Form';
import FormGroup from '@components/FormGroup';

import { DateRangePicker } from './DateRangePicker';
import { DateRangePickerProps } from './types';

export default {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  argTypes: {
    openCalendarMode: {
      defaultValue: 'both',
    },
    defaultValue: {
      type: 'string',
    },
    rangePickerType: {
      options: ['days', 'months', 'years'],
      control: { type: 'radio' },
      defaultValue: 'days',
    },
  },
  // required due to https://github.com/storybookjs/storybook/issues/17025
  parameters: {
    controls: {
      include: [
        'rangePickerType',
        'disabled',
        'label',
        'openCalendarMode',
        'helperText',
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const useFormResult = useForm<FieldValues>({
        defaultValues: {
          field1From: '01/15/2025',
          field1To: '01/25/2025',
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
  openCalendarMode: 'both',
  rangePickerType: 'days',
  onChange: (dates) => {
    console.log('event: onChange', dates);
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
  messages: {
    description: 'custom description',
  },
};

export const MonthlyView: StoryObj<typeof DateRangePicker> = (
  args: DateRangePickerProps,
) => {
  return <DateRangePicker {...args} />;
};
MonthlyView.args = {
  ...commonArgs,
  name: 'field8',
  rangePickerType: 'months',
  defaultValue: ['04/2025', '06/2025'],
  messages: {
    description: 'custom description',
  },
};

export const CustomError: StoryObj<typeof DateRangePicker> = (
  args: DateRangePickerProps,
) => {
  return <DateRangePicker {...args} />;
};
CustomError.args = {
  ...commonArgs,
  name: 'field7',
  status: 'error',
  messages: {
    error: 'custom error message',
  },
};

export const CustomSuccess: StoryObj<typeof DateRangePicker> = (
  args: DateRangePickerProps,
) => {
  return <DateRangePicker {...args} />;
};
CustomSuccess.args = {
  ...commonArgs,
  name: 'field8',
  status: 'success',
  messages: {
    success: 'custom success message',
  },
};

export const AnotherFormat: StoryObj<typeof DateRangePicker> = (
  args: DateRangePickerProps,
) => {
  return <DateRangePicker {...args} />;
};
AnotherFormat.args = {
  ...commonArgs,
  name: 'field2',
  format: 'dd/mm/yyyy',
};

export const Disabled: StoryObj<typeof DateRangePicker> = (
  args: DateRangePickerProps,
) => {
  return <DateRangePicker {...args} />;
};
Disabled.args = {
  ...commonArgs,
  name: 'field3',
  disabled: true,
};

export const WithSpecificDateRange: StoryObj<typeof DateRangePicker> = (
  args: DateRangePickerProps,
) => {
  return <DateRangePicker {...args} />;
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

export const WithDefaultValue: StoryObj<typeof DateRangePicker> = (
  args: DateRangePickerProps,
) => {
  return <DateRangePicker {...args} />;
};
WithDefaultValue.args = {
  ...commonArgs,
  name: 'field5',
  defaultValue: ['02/10/2025', '02/15/2025'],
};

export const WithExternalValue: StoryObj<typeof DateRangePicker> = (
  args: DateRangePickerProps,
) => {
  const dates: Array<DateRangePickerProps['value']> = [
    ['01/15/2025', '01/25/2025'],
    ['02/10/2025', '02/28/2025'],
    ['11/05/2030', '11/30/2030'],
  ];
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
  return <DateRangePicker {...args} value={value} />;
};
WithExternalValue.args = {
  ...commonArgs,
  name: 'field6',
};
