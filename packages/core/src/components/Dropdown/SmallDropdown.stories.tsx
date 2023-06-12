import { Meta } from '@storybook/react';
import { SmallDropdown } from './index';

const items = [
  { id: 1, val: 'One' },
  { id: 2, val: 'Two' },
  { id: 3, val: 'Three' },
  { id: 4, val: 'Four' },
  { id: 5, val: 'Five' },
  { id: 6, val: 'Six' },
  { id: 7, val: 'Seven' },
];

export default {
  title: 'Components/Dropdown/Small',
  component: SmallDropdown,
  decorators: [
    (Story, { args }) => {
      const noop = () => {
        /* no-op */
      };
      return (
        <div style={{ paddingBottom: 200 }}>
          {Story({ ...args, onChange: noop })}
        </div>
      );
    },
  ],
  args: {
    items,
  },
} as Meta<typeof SmallDropdown>;

export const Small = {};

export const SmallDisabled = { args: { isDisabled: true } };

export const SmallPreSelected = { args: { selectedItem: items[2] } };

export const SmallNoItems = { args: { items: [] } };
