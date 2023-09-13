import { SerializedStyles } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';

export type AccordionVariant = 'empty' | 'small' | 'medium' | 'large';
export type VariantStyles = {
  [K in AccordionVariant]: SerializedStyles;
};

export interface AccordionGroupProps {
  id?: string;
  children: React.ReactElement<React.PropsWithChildren<AccordionProps>>[];
  variant?: AccordionVariant;
}

export interface RenderContentProps {
  tabId: number | string;
  isActive?: boolean;
  variant?: AccordionVariant;
}

export interface Accordion extends CommonProps {
  tabId: number | string;
  variant?: AccordionVariant;
  renderTitle: (
    data: RenderContentProps & {
      title: string;
      onClick?: () => void;
    },
  ) => React.ReactNode;
  renderContent: (tab: RenderContentProps) => React.ReactNode;
}

export interface AccordionProps extends Accordion {
  ariaControls?: string;
  isActive?: boolean;
  title: string;
  onClick?: () => void;
}

export interface ITabBarContext {
  activeTabs: Array<Accordion> | [];
  setActiveTabs: (tabs: Array<Accordion>) => void;
  toggleActiveTab: (tab: Accordion) => void;
}
