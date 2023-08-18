import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Typography from '@components/Typography';

import Radio from './Radio';

export default {
  title: 'Components/Radio Buttons/Radio',
  component: Radio,
  args: {
    text: 'label',
  },
  argTypes: {
    className: {
      control: {
        disable: true,
      },
    },
    initialState: {
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
} as Meta<typeof Radio>;

export const Default: StoryObj<typeof Radio> = (args) => (
  <Fragment>
    <Typography variant="h5">Standalone Radio</Typography>
    <Radio {...args} />
    <Typography variant="h5" css={{ marginTop: 10 }}>
      Checked Radio
    </Typography>
    <Radio {...args} isChecked />
  </Fragment>
);
Default.storyName = 'Radio';
