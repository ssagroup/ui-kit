import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useHover,
  useInteractions,
} from '@floating-ui/react';

import Icon from '@components/Icon';

import { HeaderNavItem } from './types';
import { hasSubmenu, isItemActive, renderItemIcon } from './helpers';
import * as S from './styles';

interface NavEntryProps {
  item: HeaderNavItem;
  /** 0 — the bar itself, 1 — dropdown, 2 — flyout */
  depth: number;
  palette: S.HeaderPalette;
  pathname: string;
  /** Closes every menu above this one once a link is followed */
  onNavigate?: () => void;
}

const ICON_SIZE = 16;

const NavLeaf = ({
  item,
  depth,
  palette,
  pathname,
  onNavigate,
}: NavEntryProps) => {
  const theme = useTheme();
  const active = isItemActive(item, pathname, depth);
  const styles =
    depth === 0
      ? S.navItem(theme, palette, active)
      : S.menuItem(theme, palette, active);
  const content = (
    <>
      {renderItemIcon(item.icon, ICON_SIZE)}
      <span>{item.label}</span>
    </>
  );

  if (!item.path || item.disabled) {
    return (
      <span css={styles} aria-disabled={item.disabled || undefined}>
        {content}
      </span>
    );
  }
  return (
    <Link
      to={item.path}
      css={styles}
      aria-current={pathname === item.path ? 'page' : undefined}
      onClick={onNavigate}>
      {content}
    </Link>
  );
};

/**
 * A group and its menu. Mouse users open it by hovering (with a safe triangle
 * towards the menu, so diagonal moves into a flyout do not close it); touch
 * and keyboard users by tapping or pressing the trigger. The menu is
 * portalled, so the nav's horizontal scroll does not clip it.
 */
const NavGroup = ({
  item,
  depth,
  palette,
  pathname,
  onNavigate,
}: NavEntryProps) => {
  const theme = useTheme();
  const menuId = useId();
  const [open, setOpen] = useState(false);
  const nodeId = useFloatingNodeId();
  const nested = depth > 0;

  const { refs, floatingStyles, context } = useFloating({
    nodeId,
    open,
    onOpenChange: setOpen,
    placement: nested ? 'right-start' : 'bottom-start',
    middleware: [offset(S.MENU_OFFSET), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });
  // Disabled buttons still get pointer events, so the hooks must be switched
  // off or hovering a disabled group would open it.
  const enabled = !item.disabled;
  const hover = useHover(context, {
    enabled,
    mouseOnly: true,
    handleClose: safePolygon({ blockPointerEvents: false }),
  });
  const click = useClick(context, { enabled, ignoreMouse: true });
  const dismiss = useDismiss(context, { enabled, bubbles: true });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    click,
    dismiss,
  ]);

  const handleNavigate = () => {
    setOpen(false);
    onNavigate?.();
  };

  const active = isItemActive(item, pathname, depth);
  const children = item.children ?? [];

  return (
    <FloatingNode id={nodeId}>
      <button
        type="button"
        ref={refs.setReference}
        css={
          nested
            ? S.menuItem(theme, palette, active)
            : S.navItem(theme, palette, active)
        }
        disabled={item.disabled}
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        {...getReferenceProps()}>
        {renderItemIcon(item.icon, ICON_SIZE)}
        <span>{item.label}</span>
        <Icon
          name={nested ? 'carrot-right' : 'carrot-down'}
          size={ICON_SIZE}
          color="currentColor"
        />
      </button>
      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
            returnFocus={false}>
            <ul
              id={menuId}
              ref={refs.setFloating}
              style={floatingStyles}
              css={S.menu(theme, palette)}
              {...getFloatingProps()}>
              {children.map((child) => (
                <li key={child.id}>
                  <NavEntry
                    item={child}
                    depth={depth + 1}
                    palette={palette}
                    pathname={pathname}
                    onNavigate={handleNavigate}
                  />
                </li>
              ))}
            </ul>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </FloatingNode>
  );
};

const NavEntry = (props: NavEntryProps) =>
  hasSubmenu(props.item, props.depth) ? (
    <NavGroup {...props} />
  ) : (
    <NavLeaf {...props} />
  );

/**
 * Top-level entry. Each group roots its own floating tree, so a flyout's
 * hover and dismiss events reach the dropdown that opened it.
 */
export const HeaderNavEntry = (props: NavEntryProps) => {
  const parentId = useFloatingParentNodeId();
  if (parentId === null && hasSubmenu(props.item, props.depth)) {
    return (
      <FloatingTree>
        <NavEntry {...props} />
      </FloatingTree>
    );
  }
  return <NavEntry {...props} />;
};
