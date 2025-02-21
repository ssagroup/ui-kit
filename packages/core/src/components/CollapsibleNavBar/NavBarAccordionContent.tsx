import styled from '@emotion/styled';
import {
  AccordionContent,
  RenderContentProps,
} from '@components/AccordionGroup';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import { useCollapsibleNavBarContext } from './CollapsibleNavBarContext';
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
}) => {
  const { theme } = useCollapsibleNavBarContext();

  return (
    <AccordionContent
      {...rest}
      css={[S.AccordionContent, isPopover && S.AccordionContentPopover]}>
      {items.map((subMenuItem) => {
        const isExternalLink = subMenuItem.path.includes('://');
        return (
          <Link
            key={`${accordionUniqueName}-link-${subMenuItem.title
              .replace(' ', '')
              .toLowerCase()}`}
            onClick={onClick}
            end
            to={
              isExternalLink
                ? subMenuItem.path
                : '/' + prefix + subMenuItem.path
            }
            navbartheme={theme}>
            {subMenuItem.title}
          </Link>
        );
      })}
    </AccordionContent>
  );
};
