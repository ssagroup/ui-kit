import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { progressInfoData as data } from './mockProgressInfoRequest';

import { default as ProgressInfo, ProgressInfoProps } from './index';

export default {
  title: 'Charts/ProgressInfo',
  component: ProgressInfo,
  args: {
    data,
  },
  decorators: [
    (Story) => (
      <div
        css={css`
          container-type: inline-size;
        `}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof ProgressInfo>;

export const Default: StoryObj<typeof ProgressInfo> = (
  args: ProgressInfoProps,
) => {
  return <ProgressInfo {...args} />;
};

Default.args = { data, className: 'lostpixel-ignore' };
