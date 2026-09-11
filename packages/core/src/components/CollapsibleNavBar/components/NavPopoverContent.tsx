import { NavLink } from 'react-router-dom';

import type { TreeItemLevel2 } from '../../TreeView';

import { useCollapsibleNavBarContext } from '../CollapsibleNavBarContext';
import { NavItemMeta } from '../navItems';
import * as S from '../styles';

/**
 * A group's children, as shown in the collapsed rail's flyout.
 *
 * The rail hides the in-place subtree, so this is the only way to reach a
 * sub-route while the nav is collapsed.
 */
export const NavPopoverContent = ({
  items,
  onClick,
}: {
  items: TreeItemLevel2<NavItemMeta>[];
  onClick?: () => void;
}) => {
  const { theme, exactMatch } = useCollapsibleNavBarContext();

  return (
    <div css={S.PopoverList}>
      {items.map((item) => (
        <NavLink
          key={item.id}
          to={item.meta?.to ?? ''}
          end={exactMatch}
          onClick={onClick}
          data-navbartheme={theme}>
          {item.label}
        </NavLink>
      ))}
    </div>
  );
};
