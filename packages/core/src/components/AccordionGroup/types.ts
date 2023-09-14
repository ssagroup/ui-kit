import { SerializedStyles } from '@emotion/react';
import { CommonProps } from '@global-types/emotion';

export type AccordionSize = 'empty' | 'small' | 'medium' | 'large';

export type SizeStyles = {
  [K in AccordionSize]: SerializedStyles;
};

export interface AccordionGroupProps {
  id?: string;
  children: React.ReactElement<React.PropsWithChildren<AccordionViewProps>>[];
  size?: AccordionSize;
  accordionsStayOpen?: boolean;
}

export interface AccordionProps extends CommonProps {
  id: number | string;
  size?: AccordionSize;
  renderTitle: (
    data: RenderContentProps & {
      title: string;
      onClick?: () => void;
    },
  ) => React.ReactNode;
  renderContent: (accordion: RenderContentProps) => React.ReactNode;
}

export interface RenderContentProps
  extends Pick<AccordionProps, 'id' | 'size'> {
  isOpened?: boolean;
}

export interface AccordionViewProps extends AccordionProps {
  ariaControls?: string;
  isOpened?: boolean;
  title: string;
  onClick?: () => void;
}

export interface IAccordionGroupContext {
  openedAccordions: Array<AccordionProps> | [];
  stayOpen: boolean;
  setOpenedAccordions: (accordions: Array<AccordionProps>) => void;
  toggleOpenedAccordion: (accordion: AccordionProps) => void;
  setStayOpen: (isStayOpen: boolean) => void;
}
