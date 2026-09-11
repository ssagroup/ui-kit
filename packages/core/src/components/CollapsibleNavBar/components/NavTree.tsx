import { useEffect, useMemo } from 'react';

import { useLocation, NavLink, PathPattern } from 'react-router-dom';

// Relative, not `@components/Icon`: through the alias this module joins an
// import cycle in which `Icon` is still uninitialised when the row renders,
// and React sees an undefined element type.
import Icon from '../../Icon';
import { TreeView } from '../../TreeView';
import type { TreeItemRenderProps } from '../../TreeView';

import { useCollapsibleNavBarContext } from '../CollapsibleNavBarContext';
import { NavItemMeta, NavTreeItem, getActiveIds } from '../navItems';
import * as S from '../styles';
import { CollapsibleNavBarExtendedProps } from '../types';

import { CollapsibleNavBarPopover } from './NavBarPopover';
import { NavPopoverContent } from './NavPopoverContent';
import { TriggerIcon } from './TriggerIcon';

/**
 * The nav's menu, rendered by `TreeView`.
 *
 * `TreeView` owns structure, indentation, expansion and the `li`s; this module
 * owns everything routing-shaped — resolving `to`, deriving the active rows
 * from the location, and the collapsed-rail popover.
 */
export const NavTree = ({
  items,
  activeColor,
  useMatchPattern,
  onNavigate,
  expandedIds,
  onExpandedIdsChange,
}: {
  items: NavTreeItem[];
  activeColor?: string;
  useMatchPattern?: CollapsibleNavBarExtendedProps['useMatchPattern'];
  onNavigate: () => void;
  /**
   * Expansion is controlled from the nav bar, which owns it across layout
   * changes; the auto-expand that `TreeView` does for an uncontrolled tree is
   * reproduced below.
   */
  expandedIds: string[];
  onExpandedIdsChange: (ids: string[]) => void;
}) => {
  const { theme, exactMatch } = useCollapsibleNavBarContext();
  const { pathname } = useLocation();

  // `useMatchPattern` is called once per group, from a plain loop — so it has
  // to be a plain function, not a hook. The old accordion called it from one
  // component per group, where a hook would have been safe; here the call
  // count follows `items`, and a menu that gains or loses a group between
  // renders would change the hook order. The prop is documented accordingly.
  const groupPatterns = useMemo(() => {
    const patterns: Record<string, string | PathPattern<string>> = {};

    items.forEach((item) => {
      const { prefix } = item.meta ?? {};
      if (prefix === undefined) return;
      patterns[item.id] = useMatchPattern
        ? useMatchPattern(prefix)
        : prefix + ':id';
    });

    return patterns;
  }, [items, useMatchPattern]);

  const activeIds = getActiveIds({
    items,
    pathname,
    exactMatch: !!exactMatch,
    groupPatterns,
  });

  // Open the group that owns the current route, on arrival and on every
  // navigation. Keyed on the ids themselves so a caller that rebuilds `items`
  // each render doesn't retrigger it.
  const activeGroupIds = activeIds.filter(
    (id) => items.find((item) => item.id === id)?.items?.length,
  );
  const activeGroupKey = activeGroupIds.join(' ');

  useEffect(() => {
    const missing = activeGroupIds.filter((id) => !expandedIds.includes(id));
    if (missing.length) {
      onExpandedIdsChange([...expandedIds, ...missing]);
    }
  }, [activeGroupKey]);

  const renderItem = ({
    item,
    hasItems,
    isExpanded,
    isSelected,
    itemProps,
    toggleProps,
  }: TreeItemRenderProps<NavItemMeta>) => {
    const meta = item.meta ?? {};
    const { onClick, ...restItemProps } = itemProps;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      onClick?.(event);
      if (meta.to) {
        onNavigate();
      }
    };

    const iconElement = meta.iconName ? (
      <TriggerIcon
        iconName={meta.iconName}
        iconSize={meta.iconSize}
        CustomIcon={meta.CustomIcon}
        css={meta.css}
      />
    ) : null;

    // Two separate elements, deliberately: the rail hides `.ssa-tree__icon` in
    // favour of the popover trigger, and the trigger has its own copy of the
    // glyph. Sharing one element would hide the trigger's icon along with the
    // row's. The wrapper also holds the column open on sub-items, which have
    // no icon, so their labels line up under their parent's.
    const icon = (
      <span className="ssa-tree__icon" css={S.IconSpacer}>
        {iconElement}
      </span>
    );

    const label = <span className="ssa-tree__label">{item.label}</span>;

    // The rail shows this popover in place of the row; its trigger sits inside
    // the row so that clicking the collapsed icon still follows the link.
    const popover = iconElement ? (
      <span className="nav-rail-trigger">
        <CollapsibleNavBarPopover
          triggerIcon={iconElement}
          title={String(item.label)}
          content={
            hasItems ? (
              <NavPopoverContent
                items={item.items ?? []}
                onClick={onNavigate}
              />
            ) : undefined
          }
        />
      </span>
    ) : null;

    // The whole group header toggles, so the chevron is decoration: it stays
    // out of the tab order rather than offering a second stop for the same
    // action. Its ARIA moves up to the header itself.
    const chevron = hasItems ? (
      <button {...toggleProps} tabIndex={-1} css={S.NavToggle(isExpanded)}>
        <Icon name="carrot-down" size={20} tooltip="" />
      </button>
    ) : null;

    if (meta.to) {
      return (
        <NavLink
          {...restItemProps}
          to={meta.to}
          end={exactMatch}
          onClick={handleClick}
          // A plain string, not NavLink's `({ isActive }) => …` form: Emotion
          // merges `className` itself and would stringify the function into
          // the class attribute, taking `ssa-tree__row` with it. `isSelected`
          // carries the same answer — it comes from the same matching.
          className={`${itemProps.className ?? ''}${
            isSelected ? ' active' : ''
          }`}
          data-customicon={!!meta.CustomIcon}>
          {popover}
          {icon}
          {label}
        </NavLink>
      );
    }

    // A group header navigates nowhere, so it is not a link — but it is a
    // control, and the old accordion title offered no keyboard route at all.
    // It cannot be a real `button` because the rail's popover trigger lives
    // inside it, so it takes the role and the key handling explicitly.
    return (
      <div
        {...restItemProps}
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-controls={toggleProps['aria-controls']}
        onClick={handleClick}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          if (event.target !== event.currentTarget) return;
          event.preventDefault();
          handleClick(event as unknown as React.MouseEvent<HTMLElement>);
        }}
        className={`${itemProps.className ?? ''}${
          isSelected ? ' active' : ''
        }`}>
        {popover}
        {icon}
        {label}
        {chevron}
      </div>
    );
  };

  return (
    <TreeView<NavItemMeta>
      items={items}
      semantics="list"
      theme={theme === 'light' ? 'light' : 'dark'}
      activeColor={activeColor}
      selectedIds={activeIds}
      expandedIds={expandedIds}
      onExpandedIdsChange={onExpandedIdsChange}
      renderItem={renderItem}
      css={S.NavTreeStyles}
      className="collapsible-nav-tree"
    />
  );
};
