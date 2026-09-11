import { useCallback, useId, useMemo, useRef, useState } from 'react';

import * as S from './styles';
import { TreeItemContext, TreeViewItem } from './TreeViewItem';
import { TreeViewProps } from './types';
import { useTreeViewState } from './useTreeViewState';
import { buildTreeIndex, getVisibleIds } from './utils';

/**
 * TreeView — a nestable list of rows, up to three levels deep.
 *
 * Domain-free by design: it knows about expansion, selection, indentation and
 * keyboard navigation, and nothing about routing or files. Give it `items`,
 * and hand it a `renderItem` when the row needs to be something other than a
 * plain label — a `NavLink`, a row with a size column, a checkbox.
 *
 * The fourth level is a **type error**, not a runtime check: `items` is typed
 * one level at a time, so an over-deep tree fails at the call site.
 *
 * Expansion and selection both follow the kit's controllable pattern
 * (`expandedIds` / `defaultExpandedIds` / `onExpandedIdsChange`, and the same
 * trio for selection). Selection is always an array, even in the default
 * `single` mode, so moving to multi-select later costs nothing.
 *
 * ## Styling
 *
 * Every part carries a stable class — `ssa-tree`, `ssa-tree__group`,
 * `ssa-tree__item` (plus `--level-1|2|3`, `--selected`, `--expanded`),
 * `ssa-tree__row`, `ssa-tree__icon`, `ssa-tree__label`, `ssa-tree__toggle`.
 * Target those from the `css` prop rather than the DOM shape; a single node
 * can also carry its own `css`.
 *
 * @example
 * ```tsx
 * <TreeView
 *   items={[
 *     {
 *       id: 'education',
 *       label: 'Education',
 *       iconName: 'education',
 *       items: [
 *         { id: 'courses', label: 'Courses' },
 *         { id: 'exams', label: 'Exams' },
 *       ],
 *     },
 *     { id: 'employee', label: 'Employee', iconName: 'user' },
 *   ]}
 *   defaultSelectedIds={['exams']}
 *   onSelectedIdsChange={(ids) => console.log(ids)}
 * />
 * ```
 *
 * @example Routing rows, with selection owned by the router
 * ```tsx
 * <TreeView
 *   items={items}
 *   semantics="list"
 *   selectedIds={[currentRouteId]}
 *   renderItem={({ item, itemProps, icon, hasItems, isExpanded, toggleProps }) => (
 *     <NavLink to={item.meta.path} {...itemProps}>
 *       {icon}
 *       <span>{item.label}</span>
 *       {hasItems && <button {...toggleProps}>{isExpanded ? '−' : '+'}</button>}
 *     </NavLink>
 *   )}
 * />
 * ```
 */
export const TreeView = <TMeta,>(props: TreeViewProps<TMeta>) => {
  const {
    items,
    expandedIds,
    defaultExpandedIds,
    onExpandedIdsChange,
    expandMode = 'multiple',
    selectedIds,
    defaultSelectedIds,
    onSelectedIdsChange,
    selectionMode = 'single',
    renderItem,
    theme = 'light',
    activeColor,
    semantics = 'tree',
    toggleOnItemClick = true,
    autoExpandSelected = true,
    reserveIconSpace = false,
    indent,
    'aria-label': ariaLabel,
    className,
    css: cssProp,
  } = props;

  const treeId = useId();
  const index = useMemo(() => buildTreeIndex(items), [items]);

  const { expanded, expandedSet, selectedSet, selectedPath, toggle, select } =
    useTreeViewState({
      index,
      isExpansionControlled: 'expandedIds' in props,
      expandedIds,
      defaultExpandedIds,
      onExpandedIdsChange,
      expandMode,
      isSelectionControlled: 'selectedIds' in props,
      selectedIds,
      defaultSelectedIds,
      onSelectedIdsChange,
      selectionMode,
      autoExpandSelected,
    });

  const isTree = semantics === 'tree';
  const visibleIds = useMemo(
    () => (isTree ? getVisibleIds(index, expanded) : []),
    [index, expanded, isTree],
  );

  const elements = useRef(new Map<string, HTMLLIElement>());
  const registerItem = useCallback(
    (id: string, element: HTMLLIElement | null) => {
      if (element) {
        elements.current.set(id, element);
      } else {
        elements.current.delete(id);
      }
    },
    [],
  );

  const [focusedId, setFocusedId] = useState<string | null>(null);
  // Exactly one row is tabbable. When the remembered row has been collapsed
  // away, the first visible row takes over rather than leaving the tree
  // unreachable by keyboard.
  const rovingId =
    focusedId && visibleIds.includes(focusedId) ? focusedId : visibleIds[0];

  const moveFocusTo = useCallback((id: string | undefined) => {
    if (!id) return;
    setFocusedId(id);
    elements.current.get(id)?.focus();
  }, []);

  const onItemKeyDown = useCallback(
    (event: React.KeyboardEvent, id: string) => {
      // Nested rows bubble their events up through their ancestors' handlers;
      // only the row the user is actually on should act.
      if (event.target !== event.currentTarget) return;

      const entry = index.byId.get(id);
      if (!entry) return;

      const position = visibleIds.indexOf(id);
      const hasItems = entry.childIds.length > 0;
      const isExpanded = expandedSet.has(id);

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          moveFocusTo(visibleIds[position + 1]);
          break;
        case 'ArrowUp':
          event.preventDefault();
          moveFocusTo(visibleIds[position - 1]);
          break;
        case 'ArrowRight':
          event.preventDefault();
          if (hasItems && !isExpanded) {
            toggle(id);
          } else if (hasItems) {
            moveFocusTo(entry.childIds[0]);
          }
          break;
        case 'ArrowLeft':
          event.preventDefault();
          if (hasItems && isExpanded) {
            toggle(id);
          } else if (entry.parentId) {
            moveFocusTo(entry.parentId);
          }
          break;
        case 'Home':
          event.preventDefault();
          moveFocusTo(visibleIds[0]);
          break;
        case 'End':
          event.preventDefault();
          moveFocusTo(visibleIds[visibleIds.length - 1]);
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          select(entry.item);
          if (toggleOnItemClick && hasItems) {
            toggle(id);
          }
          break;
        default:
          break;
      }
    },
    [
      expandedSet,
      index,
      moveFocusTo,
      select,
      toggle,
      toggleOnItemClick,
      visibleIds,
    ],
  );

  const context: TreeItemContext<TMeta> = {
    treeId,
    index,
    expandedSet,
    selectedSet,
    selectedPath,
    toggle,
    select,
    focusedId: rovingId ?? null,
    registerItem,
    onItemKeyDown,
    theme,
    activeColor,
    semantics,
    toggleOnItemClick,
    reserveIconSpace,
    indent,
    renderItem,
  };

  return (
    <ul
      css={[S.root, cssProp]}
      className={['ssa-tree', className].filter(Boolean).join(' ')}
      role={isTree ? 'tree' : undefined}
      aria-label={ariaLabel}
      aria-multiselectable={
        isTree && selectionMode === 'multiple' ? true : undefined
      }>
      {items.map((item, itemIndex) => (
        <TreeViewItem
          key={item.id}
          item={item}
          level={1}
          index={itemIndex}
          context={context}
        />
      ))}
    </ul>
  );
};
