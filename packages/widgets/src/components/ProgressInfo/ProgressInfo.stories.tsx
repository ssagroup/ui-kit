import { useLayoutEffect } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';

import { progressInfoData as data } from './mockProgressInfoRequest';

import { default as ProgressInfo, IProgressInfoProps } from './index';

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

const ignoreChartElInLostPixel = () => {
  useLayoutEffect(() => {
    const pieChartSVGWrapper = document.querySelector(
      'div[class*="ProgressInfoContent"]',
    ) as HTMLDivElement;

    const observer = new MutationObserver(() => {
      const chartEl = pieChartSVGWrapper.querySelector('svg');
      if (chartEl != null) {
        chartEl.classList.add('lostpixel-ignore');
        observer.disconnect();
      }
    });

    observer.observe(pieChartSVGWrapper, {
      childList: true,
      attributes: false,
      subtree: true,
      characterDataOldValue: false,
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};

export const Default: StoryObj<typeof ProgressInfo> = (
  args: IProgressInfoProps,
) => {
  ignoreChartElInLostPixel();
  return <ProgressInfo {...args} />;
};

Default.args = { data };
