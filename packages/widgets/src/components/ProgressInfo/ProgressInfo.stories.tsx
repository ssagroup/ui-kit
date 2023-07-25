import { css } from '@emotion/react';
import type { Meta } from '@storybook/react';

import { progressInfoData as data } from '@apis/sources/mock/utils/mockProgressInfoRequest';

import { ProgressInfo } from './ProgressInfo';

export default {
  title: 'Widgets/ProgressInfo',
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

export const Default = {};
