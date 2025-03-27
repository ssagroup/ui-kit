import {
  AccordionContent,
  RenderContentProps,
} from '@components/AccordionGroup';
import * as S from './styles';
import { NavBarAccordionContentItem } from './AccordionContentItem';

export const NavBarAccordionContent = ({
  items,
  accordionUniqueName,
  prefix,
  isPopover,
  onClick,
  ...rest
}: RenderContentProps & {
  items: Array<{ path: string; title: string }>;
  accordionUniqueName: string;
  prefix?: string;
  isPopover?: boolean;
  onClick?: () => void;
}) => (
  <AccordionContent
    {...rest}
    css={[S.AccordionContent, isPopover && S.AccordionContentPopover]}>
    {items.map((subMenuItem) => {
      const submenuKey = `${accordionUniqueName}-link-${subMenuItem.title
        .replace(' ', '')
        .toLowerCase()}`;
      return (
        <NavBarAccordionContentItem
          key={submenuKey}
          prefix={prefix}
          subMenuItem={subMenuItem}
          onClick={onClick}
        />
      );
    })}
  </AccordionContent>
);
