import { KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';

import { ContextMenu } from '@components/ContextMenu';
import { Popover } from '@components/Popover';
import { PopoverTrigger } from '@components/Popover';
import { PopoverContent } from '@components/Popover';

import { BreadcrumbSibling } from './types';
import * as styles from './styles';

export interface BreadcrumbMenuProps {
  /** Element that opens the menu on hover/click. Must forward a ref. */
  trigger: React.ReactElement;
  /** Navigable options shown inside the menu. */
  items: BreadcrumbSibling[];
}

/*
 * Rows stay real links, so middle-click and "open in new tab" keep working.
 * Enter follows the highlighted row's link; the link itself is not a tab
 * stop, the menu is.
 */
const followActiveLink = (event: KeyboardEvent<HTMLUListElement>) => {
  if (event.key !== 'Enter') return;
  const link =
    event.currentTarget.querySelector<HTMLAnchorElement>('[data-active] a');
  if (!link) return;
  event.preventDefault();
  link.click();
};

/**
 * A hover/click popover listing navigable routes. Shared by the collapsed `…`
 * crumb and, in the route-aware mode, by crumbs that expose sibling routes.
 */
export const BreadcrumbMenu = ({ trigger, items }: BreadcrumbMenuProps) => (
  <Popover placement="bottom-start" interactionsEnabled="both">
    <PopoverTrigger asChild>{trigger}</PopoverTrigger>
    <PopoverContent>
      <ContextMenu<number>
        css={styles.menu}
        items={items.map((sibling, index) => ({
          value: index,
          label: sibling.label,
        }))}
        renderItem={(item) => (
          <Link
            to={items[item.value].to}
            tabIndex={-1}
            className="breadcrumb-menu-item"
            css={styles.menuLink}>
            {item.label}
          </Link>
        )}
        onKeyDown={followActiveLink}
      />
    </PopoverContent>
  </Popover>
);
