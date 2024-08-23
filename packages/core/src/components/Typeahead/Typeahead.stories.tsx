import type { Meta, StoryObj } from '@storybook/react';

import { Typeahead } from '.';
import { TypeaheadProps } from './types';
import * as S from './styles';

const items = [
  { id: 1, value: 'First', subText: 'subtext' },
  { id: 2, value: 'Second', subText: 'subtext' },
  { id: 3, value: 'Third', subText: 'subtext' },
  { id: 4, value: 'Fourth', subText: 'subtext' },
  { id: 5, value: 'Fifth', subText: 'subtext' },
  { id: 6, value: 'Sixth', subText: 'subtext' },
];

export default {
  title: 'Components/Typeahead',
  component: Typeahead,
  argTypes: {
    onChange: {
      control: {
        disable: true,
      },
    },
    className: {
      description: 'Used in order to overwrite the default style',
      table: {
        type: {
          summary: 'StyledComponent',
        },
      },
      control: {
        disable: true,
      },
    },
  },
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
} as Meta<typeof Typeahead>;

export const Basic: StoryObj = (args: TypeaheadProps) => {
  return (
    <Typeahead selectedItems={[items[2].id]} isDisabled={args.isDisabled}>
      {items.map((item) => (
        <S.TypeaheadOption key={item.id} value={item.id}>
          {item.value}
        </S.TypeaheadOption>
      ))}
    </Typeahead>
  );
};

Basic.args = { isDisabled: false };

export const Multiple: StoryObj = (args: TypeaheadProps) => {
  return (
    <Typeahead
      selectedItems={[items[2].id, items[1].id]}
      isMultiple
      isDisabled={args.isDisabled}>
      {items.map((item) => (
        <S.TypeaheadOption key={item.id} value={item.id}>
          {item.value}
        </S.TypeaheadOption>
      ))}
    </Typeahead>
  );
};

Multiple.args = { isDisabled: false };
