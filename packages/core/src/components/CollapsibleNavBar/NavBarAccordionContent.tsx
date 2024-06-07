import styled from '@emotion/styled';
import { AccordionContent, RenderContentProps } from '@components';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import * as S from './styles';

const Link = styled(CollapsibleNavBarLink)`
  width: 100%;
  padding: 4.8px 0;

  &:first-of-type {
    padding-top: 15px;
  }

  &:not(.active):hover {
    filter: initial;
  }

  &.active {
    text-decoration: underline;
    filter: initial;
  }
`;

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
    {items.map((subMenuItem) => (
      <Link
        key={`${accordionUniqueName}-link-${subMenuItem.title
          .replace(' ', '')
          .toLowerCase()}`}
        onClick={onClick}
        to={'/' + prefix + subMenuItem.path}>
        {subMenuItem.title}
      </Link>
    ))}
  </AccordionContent>
);
