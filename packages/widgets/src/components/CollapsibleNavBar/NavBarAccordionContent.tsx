import { AccordionContent, RenderContentProps } from '@ssa-ui-kit/core';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import * as S from './styles';

export const NavBarAccordionContent = ({
  items,
  accordionUniqueName,
  prefix,
  pathname,
  isPopover,
  ...rest
}: RenderContentProps & {
  items: Array<{ path: string; title: string }>;
  accordionUniqueName: string;
  prefix?: string;
  pathname: string;
  isPopover?: boolean;
}) => (
  <AccordionContent
    {...rest}
    css={[S.AccordionContent, isPopover && S.AccordionContentPopover]}>
    {items.map((subMenuItem) => (
      <CollapsibleNavBarLink
        key={`${accordionUniqueName}-link-${subMenuItem.title
          .replace(' ', '')
          .toLowerCase()}`}
        to={'/' + prefix + subMenuItem.path}
        active={pathname === subMenuItem.path ? true : undefined}>
        {subMenuItem.title}
      </CollapsibleNavBarLink>
    ))}
  </AccordionContent>
);
