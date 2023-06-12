import { Meta, StoryObj } from '@storybook/react';
import TabBar from '@components/TabBar';
import LargeTab from '@components/LargeTab';

import { TabBarDecorator, TabContents } from './helpers';

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

export const WeekTabBarStory: StoryObj<typeof LargeTab> = (args) => (
  <TabBar {...args}>
    <LargeTab
      tabId="monday"
      topText="Mon"
      bottomText="02"
      ariaControls="monday-panel"
      renderContent={() => (
        <TabContents
          id="monday-panel"
          labelledBy="monday"
          text="Monday contents"
        />
      )}
    />
    <LargeTab
      tabId="tuesday"
      topText="Tue"
      bottomText="03"
      ariaControls="tuesday-panel"
      renderContent={() => (
        <TabContents
          id="tuesday-panel"
          labelledBy="tuesday"
          text="Tuesday contents"
        />
      )}
    />
    <LargeTab
      tabId="wednesday"
      topText="Wed"
      bottomText="04"
      ariaControls="wednesday-panel"
      renderContent={() => (
        <TabContents
          id="wednesday-panel"
          labelledBy="wednesday"
          text="Wednesday contents"
        />
      )}
    />
    <LargeTab
      tabId="thursday"
      topText="Thu"
      bottomText="05"
      ariaControls="thursday-panel"
      renderContent={() => (
        <TabContents
          id="thursday-panel"
          labelledBy="thursday"
          text="Thursday contents"
        />
      )}
    />
    <LargeTab
      tabId="friday"
      topText="Fri"
      bottomText="06"
      ariaControls="friday-panel"
      renderContent={() => (
        <TabContents
          id="friday-panel"
          labelledBy="friday"
          text="Friday contents"
        />
      )}
    />
    <LargeTab
      tabId="saturday"
      topText="Sat"
      bottomText="07"
      ariaControls="saturday-panel"
      renderContent={() => (
        <TabContents
          id="saturday-panel"
          labelledBy="saturday"
          text="Saturday contents"
        />
      )}
    />
    <LargeTab
      tabId="sunday"
      topText="Sun"
      bottomText="08"
      ariaControls="sunday-panel"
      renderContent={() => (
        <TabContents
          id="sunday-panel"
          labelledBy="sunday"
          text="Sunday contents"
        />
      )}
    />
  </TabBar>
);
WeekTabBarStory.storyName = 'Week Tab Bar';
