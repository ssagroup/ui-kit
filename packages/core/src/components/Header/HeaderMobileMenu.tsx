import { Link } from 'react-router-dom';

import Icon from '@components/Icon';
import { Drawer } from '@components/Drawer';
import { UseDrawerStore } from '@components/Drawer/useDrawer';
import { TreeView } from '@components/TreeView';
import type { TreeItem, TreeItemRenderProps } from '@components/TreeView';

import { HeaderNavItem, HeaderTheme } from './types';
import { MAX_DEPTH, isPathActive } from './helpers';
import * as S from './styles';

interface NavMeta {
  path?: string;
}

/**
 * TreeView keys rows by id across the whole tree, while Header ids only need
 * to be unique among siblings — so each id is prefixed with its ancestors'.
 * Levels past `MAX_DEPTH` are dropped, as on desktop.
 */
const toTreeItems = (
  items: HeaderNavItem[],
  parentKey = '',
  depth = 0,
): TreeItem<NavMeta>[] =>
  items.map((item) => {
    const id = parentKey ? `${parentKey}/${item.id}` : item.id;
    const children =
      depth < MAX_DEPTH && item.children?.length
        ? toTreeItems(item.children, id, depth + 1)
        : undefined;
    const isIconName = typeof item.icon === 'string';
    return {
      id,
      label: item.label,
      iconName: isIconName ? (item.icon as TreeItem['iconName']) : undefined,
      icon: isIconName ? undefined : item.icon,
      disabled: item.disabled,
      meta: { path: children ? undefined : item.path },
      // TreeView types its levels one at a time; the depth cap above keeps
      // the runtime shape inside its three.
      items: children as TreeItem<NavMeta>['items'],
    };
  });

/** Id of the deepest row whose path matches the location, if any. */
const findActiveId = (
  items: TreeItem<NavMeta>[],
  pathname: string,
): string | undefined => {
  for (const item of items) {
    const nested = findActiveId(
      (item.items ?? []) as TreeItem<NavMeta>[],
      pathname,
    );
    if (nested) {
      return nested;
    }
    if (item.meta?.path && isPathActive(pathname, item.meta.path)) {
      return item.id;
    }
  }
  return undefined;
};

interface HeaderMobileMenuProps {
  store: UseDrawerStore;
  items: HeaderNavItem[];
  headerTheme: HeaderTheme;
  palette: S.HeaderPalette;
  pathname: string;
  navLabel: string;
}

/**
 * The navigation below 900px: a full-width drawer holding a `TreeView`, the
 * same engine as CollapsibleNavBar's menu. The tree owns expansion and opens
 * the group holding the current page; this module owns the routing.
 */
export const HeaderMobileMenu = ({
  store,
  items,
  headerTheme,
  palette,
  pathname,
  navLabel,
}: HeaderMobileMenuProps) => {
  const treeItems = toTreeItems(items);
  const activeId = findActiveId(treeItems, pathname);
  const close = () => store.toggle(false);

  const renderItem = ({
    item,
    icon,
    hasItems,
    isExpanded,
    isDisabled,
    itemProps,
    toggleProps,
  }: TreeItemRenderProps<NavMeta>) => {
    const { onClick, ...rowProps } = itemProps;
    const label = <span className="ssa-tree__label">{item.label}</span>;

    if (hasItems) {
      // The whole row toggles, so the chevron is decoration and its ARIA
      // moves up to the row — one control, one tab stop.
      return (
        <button
          {...(rowProps as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          type="button"
          disabled={isDisabled}
          aria-expanded={isExpanded}
          aria-controls={toggleProps['aria-controls']}
          onClick={onClick}>
          {icon}
          {label}
          <span className="ssa-tree__toggle" css={S.mobileToggle(isExpanded)}>
            <Icon name="carrot-down" size={20} color="currentColor" />
          </span>
        </button>
      );
    }

    const path = item.meta?.path;
    if (!path || isDisabled) {
      return (
        <span {...rowProps} aria-disabled={isDisabled || undefined}>
          {icon}
          {label}
        </span>
      );
    }
    return (
      <Link
        {...rowProps}
        to={path}
        aria-current={pathname === path ? 'page' : undefined}
        onClick={(event) => {
          onClick?.(event);
          close();
        }}>
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <Drawer.Root store={store}>
      <Drawer.Portal>
        <Drawer.Overlay lockScroll>
          <Drawer.Content css={S.drawerContent(palette)}>
            <Drawer.Header>
              <Drawer.CloseButton aria-label="Close menu" />
            </Drawer.Header>
            <nav aria-label={navLabel}>
              <TreeView<NavMeta>
                items={treeItems}
                semantics="list"
                theme={headerTheme}
                activeColor={palette.accent}
                selectedIds={activeId ? [activeId] : []}
                toggleOnItemClick
                reserveIconSpace
                renderItem={renderItem}
              />
            </nav>
          </Drawer.Content>
        </Drawer.Overlay>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
