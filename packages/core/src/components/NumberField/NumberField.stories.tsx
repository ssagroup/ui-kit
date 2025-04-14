import { type StoryObj, type Meta } from '@storybook/react';

import { NumberField } from './NumberField';

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
  args: {
    name: 'number-field',
    label: 'Number Field',
    placeholder: 'Enter a number',
    description: 'This is a number input field.',
    numberFormat: {
      maximumIntegerDigits: 5,
      maximumFractionDigits: 2,
    },
    onChange: (value) => console.log(`>>> ${value}`),
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  args: {
    value: 9999,
  },
};
