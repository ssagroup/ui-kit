import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Typography from '@components/Typography';
import Radio from '@components/Radio';

import RadioGroup from './RadioGroup';

type Args = Parameters<typeof RadioGroup>[0];

export default {
  title: 'Components/Radio Buttons',
  component: RadioGroup,
  argTypes: {
    className: {
      control: {
        disable: true,
      },
    },
    externalState: {
      control: {
        disable: true,
      },
    },
    control: {
      control: {
        disable: true,
      },
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  args: {
    onChange() {
      /* no-op */
    },
  },
} as Meta<typeof RadioGroup>;

export const HorizontalRadioGroupStories: StoryObj<typeof RadioGroup> = (
  args: Args,
) => {
  return (
    <Fragment>
      <Typography variant="h4">Horizontal Radio Group</Typography>
      <RadioGroup
        externalState={'orange'}
        {...args}
        css={{ marginTop: '10px', gap: 10, display: 'flex' }}>
        <Radio id="radio1" value="apple" text="Apple" />
        <Radio id="radio2" value="orange" text="Orange" />
        <Radio id="radio3" value="banana" text="Banana" isDisabled={true} />
      </RadioGroup>
    </Fragment>
  );
};
HorizontalRadioGroupStories.args = {
  name: 'fruit',
};
HorizontalRadioGroupStories.storyName = 'Horizontal Radio Group';

export const VerticalRadioGroupStories: StoryObj<typeof RadioGroup> = (
  args: Args,
) => (
  <Fragment>
    <Typography variant="h4">Vertical Radio Group</Typography>
    <RadioGroup
      {...args}
      css={{
        marginTop: '10px',
        [`> label`]: {
          display: 'flex',
        },
      }}>
      <Radio id="radio21" value="apricot" text="Apricot" />
      <Radio id="radio22" value="avocado" text="Avocado" />
      <Radio id="radio23" value="cherry" text="Cherry" isDisabled={true} />
    </RadioGroup>
  </Fragment>
);
VerticalRadioGroupStories.args = {
  name: 'fruit',
};
VerticalRadioGroupStories.storyName = 'Vertical Radio Group';
