import { CommonProps } from '@global-types/emotion';

export interface TabProps extends CommonProps {
  tabId: number | string;
  renderContent: (
    tab?: {
      tabId: number | string;
      // text: string;
      // renderContent: () => ReactNode;
      [prop: string | number | symbol]: unknown;
    },
    arg?: unknown,
  ) => React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  ariaControls?: string;
  [prop: string | number | symbol]: unknown;
}

export interface SmallTabProps extends TabProps {
  text: string;
}

export interface LargeTabProps extends TabProps {
  topText: string;
  bottomText: string;
}

export interface TabBarProps {
  children: React.ReactElement<React.PropsWithChildren<TabProps>>[];
  className?: string;
}

export interface TabBarContextProps {
  activeTab?: TabProps;
  activeTabId?: TabProps['tabId'];
  selectedTabId?: TabProps['tabId'];
  setActiveTab: (tab?: TabProps) => void;
  setActiveTabId: (tabId?: number | string) => void;
}
