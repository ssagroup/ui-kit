import styled from '@emotion/styled';
import { useCollapsibleNavBarContext } from '@components/CollapsibleNavBar';
import { CollapsibleNavBarLink } from '../CollapsibleNavBarLink';

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

export const NavBarAccordionContentItem = ({
  prefix = '',
  subMenuItem,
  onClick,
}: {
  prefix?: string;
  subMenuItem: {
    path: string;
    title: string;
  };
  onClick?: () => void;
}) => {
  const { theme } = useCollapsibleNavBarContext();
  const isExternalLink = subMenuItem.path.includes('://');

  return (
    <Link
      onClick={onClick}
      end
      to={isExternalLink ? subMenuItem.path : '/' + prefix + subMenuItem.path}
      navbartheme={theme}>
      {subMenuItem.title}
    </Link>
  );
};
