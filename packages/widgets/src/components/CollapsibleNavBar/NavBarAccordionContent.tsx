import styled from '@emotion/styled';
import { AccordionContent, RenderContentProps } from '@ssa-ui-kit/core';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import * as S from './styles';

const Link = styled(CollapsibleNavBarLink)`
  &:hover {
    filter: unset;
  }

  &.active {
    text-decoration: underline;
    filter: unset;
  }
`;

export const NavBarAccordionContent = ({
  items,
  accordionUniqueName,
  prefix,
  isPopover,
  ...rest
}: RenderContentProps & {
  items: Array<{ path: string; title: string }>;
  accordionUniqueName: string;
  prefix?: string;
  isPopover?: boolean;
}) => (
  <AccordionContent
    {...rest}
    css={[S.AccordionContent, isPopover && S.AccordionContentPopover]}>
    {items.map((subMenuItem) => (
      <Link
        key={`${accordionUniqueName}-link-${subMenuItem.title
          .replace(' ', '')
          .toLowerCase()}`}
        to={'/' + prefix + subMenuItem.path}>
        {subMenuItem.title}
      </Link>
    ))}
  </AccordionContent>
);
