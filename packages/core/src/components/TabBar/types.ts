import { CommonProps } from '@global-types/emotion';

export interface ITab extends CommonProps {
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
  [prop: string | number | symbol]: unknown;
}

export interface ITabProps extends ITab {
  isActive?: boolean;
  onClick?: () => void;
  ariaControls?: string;
}

export interface ISmallTabProps extends ITabProps {
  text: string;
}

export interface ILargeTabProps extends ITabProps {
  topText: string;
  bottomText: string;
}

export interface ITabBarProps {
  children: React.ReactElement<React.PropsWithChildren<ITabProps>>[];
}

export interface ITabBarContext {
  activeTab?: ITab;
  setActiveTab: (tab?: ITab) => void;
}
