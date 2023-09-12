import { SerializedStyles } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';
import { HTMLAttributes } from 'react';

export type AccordionVariant = 'empty' | 'small' | 'medium' | 'large';
export type VariantStyles = {
  [K in AccordionVariant]: SerializedStyles;
};

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement<React.PropsWithChildren<AccordionTabProps>>[];
  variant?: AccordionVariant;
}

export interface RenderContentProps {
  tabId: number | string;
  isActive?: boolean;
  variant?: AccordionVariant;
}

export interface AccordionTab extends CommonProps {
  tabId: number | string;
  variant?: AccordionVariant;
  renderTitle: (
    data: RenderContentProps & {
      title: string;
    },
  ) => React.ReactNode;
  renderContent: (tab: RenderContentProps) => React.ReactNode;
}

export interface AccordionTabProps extends AccordionTab {
  ariaControls?: string;
  isActive?: boolean;
  title: string;
  onClick?: () => void;
}

export interface ITabBarContext {
  activeTabs: Array<AccordionTab> | [];
  setActiveTabs: (tabs: Array<AccordionTab>) => void;
  toggleActiveTab: (tab: AccordionTab) => void;
}
