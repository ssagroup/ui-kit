import { SerializedStyles } from '@emotion/react';
import { AriaAttributes } from 'react';

export type AccordionSize = 'empty' | 'small' | 'medium' | 'large';

export type SizeStyles = {
  [K in AccordionSize]: SerializedStyles;
};

type AccordionGroupChildren = React.ReactElement<
  React.PropsWithChildren<AccordionViewProps>
>;

export interface AccordionGroupProps {
  id?: string;
  children: AccordionGroupChildren | AccordionGroupChildren[];
  size?: AccordionSize;
  accordionsStayOpen?: boolean;
  className?: string;
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
  } & Record<string, any>;

export interface AccordionViewProps extends AccordionProps {
  ariaControls?: string;
  isOpened?: boolean;
  isHidden?: boolean;
  title: string;
  onClick?: () => void;
  children?: React.ReactNode;
  contentProps?: Record<string, any>;
}

export interface IAccordionGroupContext {
  openedAccordions: Array<AccordionProps> | [];
  stayOpen: boolean;
  setOpenedAccordions: (accordions: Array<AccordionProps>) => void;
  toggleOpenedAccordion: (accordion: AccordionProps) => void;
  setStayOpen: (isStayOpen: boolean) => void;
}
