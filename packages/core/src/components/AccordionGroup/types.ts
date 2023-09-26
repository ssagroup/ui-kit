import { SerializedStyles } from '@emotion/react';
import { AriaAttributes } from 'react';

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

export interface AccordionProps {
  id: number | string;
  size?: AccordionSize;
  renderTitle: (
    data: RenderContentProps & {
      title: string;
      ariaControls?: string;
      onClick?: () => void;
    },
  ) => React.ReactNode;
  renderContent: (accordion: RenderContentProps) => React.ReactNode;
  as?: React.ElementType;
  className?: string;
}

export type RenderContentProps = Pick<AccordionProps, 'id' | 'size'> &
  Pick<AriaAttributes, 'aria-labelledby'> & {
    isOpened?: boolean;
    as?: React.ElementType;
    className?: string;
  };

export interface AccordionViewProps extends AccordionProps {
  ariaControls?: string;
  isOpened?: boolean;
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export interface IAccordionGroupContext {
  openedAccordions: Array<AccordionProps> | [];
  stayOpen: boolean;
  setOpenedAccordions: (accordions: Array<AccordionProps>) => void;
  toggleOpenedAccordion: (accordion: AccordionProps) => void;
  setStayOpen: (isStayOpen: boolean) => void;
}
