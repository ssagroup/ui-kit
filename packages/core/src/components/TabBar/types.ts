import { HTMLAttributes } from 'react';

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
  onClick?: (event?: React.MouseEvent<HTMLDivElement>) => void;
  ariaControls?: string;
  [prop: string | number | symbol]: unknown;
}

export interface SmallTabProps
  extends TabProps,
    Omit<HTMLAttributes<HTMLButtonElement>, 'onClick'> {
  text: string;
}

export type TabBaseProps = Pick<SmallTabProps, 'isActive'> &
  HTMLAttributes<HTMLButtonElement>;

export interface LargeTabProps extends TabProps {
  topText: string;
  bottomText: string;
}

export interface TabBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'children'> {
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
