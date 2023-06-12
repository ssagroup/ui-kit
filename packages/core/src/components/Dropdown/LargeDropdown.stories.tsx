import { Meta } from '@storybook/react';
import { LargeDropdown } from './index';

const items = [
  { id: 1, val: 'Breakfast', extraVal: '8:00 AM' },
  { id: 2, val: 'Lunch', extraVal: '11:00 AM' },
  { id: 3, val: 'Dinner', extraVal: '3:00 PM' },
  { id: 4, val: 'Supper', extraVal: '6:00 PM' },
];

export default {
  title: 'Components/Dropdown/Large',
  component: LargeDropdown,
  decorators: [
    (Story, { args }) => {
      const noop = () => {
        /* no-op */
      };
      return (
        <div style={{ paddingBottom: 150 }}>
          {Story({ ...args, onChange: noop })}
        </div>
      );
    },
  ],
  args: {
    items,
  },
} as Meta<typeof LargeDropdown>;

export const Large = {};

export const LargeDisabled = {
  args: {
    isDisabled: true,
  },
};

export const LargePreSelected = {
  args: {
    selectedItem: items[2],
  },
};

export const LargeNoItems = {
  args: {
    items: [],
  },
};
