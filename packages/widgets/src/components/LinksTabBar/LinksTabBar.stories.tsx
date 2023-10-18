import { css } from '@emotion/react';
import { Meta, StoryObj } from '@storybook/react';

import { LinksTabBar, LinksTabBarProps } from './index';
import { links } from './stories/mockData';
import { MemoryRouterDecorator } from './stories/decorators';

export default {
  title: 'Widgets/LinksTabBar',
  component: LinksTabBar,
  decorators: [MemoryRouterDecorator],
  args: {
    links,
  },
} as Meta<typeof LinksTabBar>;

export const Default = {};

export const WithCustomStyles: StoryObj<typeof LinksTabBar> = (
  args: LinksTabBarProps,
) => {
  /**
   * Colors are from here: https://paletadecolores.online/en/colors/846ef3/
   * */
  return (
    <LinksTabBar
      {...args}
      css={css`
        a {
          color: #846ef3;
          background-color: #dfbcfc;
          padding: 4px 8px;
          border-radius: 6px;
        }

        a.active {
          color: #7560e3;
          text-decoration: underline solid #ddf36e;
          text-underline-offset: 2px;
        }
      `}
    />
  );
};
WithCustomStyles.args = {};
