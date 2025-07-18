import type { Meta, StoryObj } from '@storybook/react-webpack5';
import TabBar from '@components/TabBar';
import Tab from '@components/Tab';

import { TabBarDecorator, TabContents } from './helpers';

type Args = Parameters<typeof TabBar>[0];

export default {
  title: 'Components/TabBar',
  component: TabBar,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  decorators: [TabBarDecorator],
} as Meta<typeof TabBar>;

const TabBarOutput = ({ args }: { args: Args }) => (
  <TabBar {...args}>
    <Tab
      tabId="year"
      text="Year"
      ariaControls="year-panel"
      renderContent={() => (
        <TabContents id="year-panel" labelledBy="year" text="Year contents" />
      )}
    />
    <Tab
      tabId="month"
      text="Month"
      ariaControls="month-panel"
      renderContent={() => (
        <TabContents
          id="month-panel"
          labelledBy="month"
          text="Month contents"
        />
      )}
    />
    <Tab
      tabId="week"
      text="Week"
      ariaControls="week-panel"
      renderContent={() => (
        <TabContents id="week-panel" labelledBy="week" text="Week contents" />
      )}
    />
    <Tab
      tabId="day"
      text="Day"
      ariaControls="day-panel"
      renderContent={() => (
        <TabContents id="day-panel" labelledBy="day" text="Day contents" />
      )}
    />
  </TabBar>
);

export const TimePeriodTabBarStory: StoryObj<typeof Tab> = (args: Args) => (
  <TabBarOutput args={args} />
);
TimePeriodTabBarStory.storyName = 'Time Period Tab Bar';

export const TimePeriodTabBarStoryWithActiveBar: StoryObj<typeof Tab> = (
  args: Args,
) => <TabBarOutput args={args} />;
TimePeriodTabBarStoryWithActiveBar.storyName =
  'Time Period Tab Bar (+Active Tab)';
TimePeriodTabBarStoryWithActiveBar.args = {
  selectedTabId: 'month',
  renderContent: () => (
    <TabContents id="month-panel" labelledBy="month" text="Month contents" />
  ),
};

export const TimePeriodTabBarWithActiveBarFromProvider: StoryObj<typeof Tab> = (
  args: Args,
) => (
  <TabBar {...args}>
    <Tab
      tabId="year"
      text="Year"
      ariaControls="year-panel"
      renderContent={() => (
        <TabContents id="year-panel" labelledBy="year" text="Year contents" />
      )}
    />
    <Tab
      tabId="month"
      text="Month"
      ariaControls="month-panel"
      renderContent={() => (
        <TabContents
          id="month-panel"
          labelledBy="month"
          text="Month contents"
        />
      )}
    />
    <Tab
      tabId="week"
      text="Week"
      ariaControls="week-panel"
      renderContent={() => (
        <TabContents id="week-panel" labelledBy="week" text="Week contents" />
      )}
    />
    <Tab
      tabId="day"
      text="Day"
      ariaControls="day-panel"
      renderContent={() => (
        <TabContents id="day-panel" labelledBy="day" text="Day contents" />
      )}
    />
    <Tab
      tabId="hour"
      text="Hour"
      ariaControls="hour-panel"
      renderContent={() => (
        <TabContents id="hour-panel" labelledBy="hour" text="Hour contents" />
      )}
    />
  </TabBar>
);
TimePeriodTabBarWithActiveBarFromProvider.storyName =
  'Time Period Tab Bar (+Active Tab from Provider)';
