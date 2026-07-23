import { Popover } from '@components/Popover';
import { PopoverTrigger } from '@components/Popover';
import { PopoverContent } from '@components/Popover';

import { WithLink } from '../WithLink';

import { BreadcrumbSibling } from './types';
import * as styles from './styles';

export interface BreadcrumbMenuProps {
  /** Element that opens the menu on hover/click. Must forward a ref. */
  trigger: React.ReactElement;
  /** Navigable options shown inside the menu. */
  items: BreadcrumbSibling[];
}

/**
 * A hover/click popover listing navigable routes. Shared by the collapsed `…`
 * crumb and, in the route-aware mode, by crumbs that expose sibling routes.
 */
export const BreadcrumbMenu = ({ trigger, items }: BreadcrumbMenuProps) => (
  <Popover placement="bottom-start" interactionsEnabled="both">
    <PopoverTrigger asChild>{trigger}</PopoverTrigger>
    <PopoverContent>
      <ul css={styles.menu}>
        {items.map((sibling, index) => (
          <li key={index}>
            <WithLink link={sibling.to} className="breadcrumb-menu-item">
              <span css={styles.menuItem}>{sibling.label}</span>
            </WithLink>
          </li>
        ))}
      </ul>
    </PopoverContent>
  </Popover>
);
