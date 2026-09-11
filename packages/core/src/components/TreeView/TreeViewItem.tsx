import Icon from '@components/Icon';

import * as S from './styles';
import {
  AnyTreeItem,
  TreeItemRenderProps,
  TreeLevel,
  TreeViewProps,
} from './types';
import { TreeIndex, getIndent } from './utils';

/**
 * Everything the recursive rows share. Passed down as a prop rather than
 * through React context: the tree is at most three levels deep, so threading
 * it is cheaper than a provider and keeps the data flow readable.
 */
export interface TreeItemContext<TMeta> {
  treeId: string;
  index: TreeIndex<TMeta>;
  expandedSet: Set<string>;
  selectedSet: Set<string>;
  selectedPath: Set<string>;
  toggle: (id: string) => void;
  select: (item: AnyTreeItem<TMeta>) => void;
  focusedId: string | null;
  registerItem: (id: string, element: HTMLLIElement | null) => void;
  onItemKeyDown: (event: React.KeyboardEvent, id: string) => void;
  theme: NonNullable<TreeViewProps['theme']>;
  activeColor?: string;
  semantics: NonNullable<TreeViewProps['semantics']>;
  toggleOnItemClick: boolean;
  reserveIconSpace: boolean;
  indent?: number;
  renderItem?: (props: TreeItemRenderProps<TMeta>) => React.ReactNode;
}

const DefaultRow = <TMeta,>({
  icon,
  item,
  isExpanded,
  hasItems,
  itemProps,
  toggleProps,
}: TreeItemRenderProps<TMeta>) => (
  <div {...itemProps}>
    {icon}
    <span css={S.label} className="ssa-tree__label">
      {item.label}
    </span>
    {hasItems && (
      <button {...toggleProps} css={S.toggle(isExpanded)}>
        <Icon name="carrot-down" size={S.TOGGLE_SIZE} tooltip="" />
      </button>
    )}
  </div>
);

export const TreeViewItem = <TMeta,>({
  item,
  level,
  index: position,
  context,
}: {
  item: AnyTreeItem<TMeta>;
  level: TreeLevel;
  index: number;
  context: TreeItemContext<TMeta>;
}) => {
  const children = (item.items ?? []) as AnyTreeItem<TMeta>[];
  const hasItems = children.length > 0;
  const isExpanded = hasItems && context.expandedSet.has(item.id);
  const isSelected = context.selectedSet.has(item.id);
  const isInSelectedPath = context.selectedPath.has(item.id);
  const isDisabled = !!item.disabled;
  const isTree = context.semantics === 'tree';
  const groupId = `${context.treeId}-${item.id}-group`;

  const toggle = () => {
    if (isDisabled || !hasItems) return;
    context.toggle(item.id);
  };

  const select = () => {
    if (isDisabled) return;
    context.select(item);
  };

  const activate = () => {
    select();
    if (context.toggleOnItemClick) {
      toggle();
    }
  };

  const renderIcon = () => {
    if (item.icon) {
      return (
        <span css={S.icon} className="ssa-tree__icon">
          {item.icon}
        </span>
      );
    }
    if (item.iconName) {
      return (
        <span css={S.icon} className="ssa-tree__icon">
          <Icon name={item.iconName} size={S.ICON_SIZE} tooltip="" />
        </span>
      );
    }
    // Keeps deeper labels aligned with their icon-bearing siblings; the design
    // relies on this in the variants where only level 1 carries an icon.
    return context.reserveIconSpace ? (
      <span css={S.icon} className="ssa-tree__icon" aria-hidden />
    ) : null;
  };

  const renderProps: TreeItemRenderProps<TMeta> = {
    item,
    level,
    index: position,
    isSelected,
    isExpanded,
    isInSelectedPath,
    hasItems,
    isDisabled,
    select,
    toggle,
    icon: renderIcon(),
    itemProps: {
      className: 'ssa-tree__row',
      onClick: activate,
      css: [
        S.row(context.theme, level, getIndent(level, context.indent), {
          isSelected,
          isEngaged: isInSelectedPath || isExpanded,
          isDisabled,
          activeColor: context.activeColor,
        }),
        item.css,
      ],
      'data-level': level,
      'data-selected': isSelected || undefined,
      'data-expanded': isExpanded || undefined,
      'data-disabled': isDisabled || undefined,
    } as React.HTMLAttributes<HTMLElement>,
    toggleProps: hasItems
      ? {
          type: 'button',
          className: 'ssa-tree__toggle',
          // The row is clickable too, so without this a chevron click would
          // both toggle and then immediately re-toggle via the row handler.
          onClick: (event) => {
            event.stopPropagation();
            toggle();
          },
          'aria-expanded': isExpanded,
          'aria-controls': groupId,
          'aria-label': isExpanded ? 'Collapse' : 'Expand',
          // Focus lives on the treeitem in tree semantics, so the chevron must
          // stay out of the tab order; in list semantics it is a real control.
          tabIndex: isTree ? -1 : undefined,
        }
      : {},
  };

  return (
    // `treeitem` is an interactive role and owns its keyboard handling, but the
    // rule can't see through the conditional `role` to know that.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      css={S.item}
      className={`ssa-tree__item ssa-tree__item--level-${level}${
        isSelected ? ' ssa-tree__item--selected' : ''
      }${isExpanded ? ' ssa-tree__item--expanded' : ''}`}
      ref={(element) => context.registerItem(item.id, element)}
      role={isTree ? 'treeitem' : undefined}
      aria-level={isTree ? level : undefined}
      aria-selected={isTree ? isSelected : undefined}
      aria-expanded={isTree && hasItems ? isExpanded : undefined}
      aria-disabled={isTree && isDisabled ? true : undefined}
      tabIndex={
        isTree && !isDisabled
          ? context.focusedId === item.id
            ? 0
            : -1
          : undefined
      }
      onKeyDown={
        isTree ? (event) => context.onItemKeyDown(event, item.id) : undefined
      }>
      {context.renderItem ? (
        context.renderItem(renderProps)
      ) : (
        <DefaultRow {...renderProps} />
      )}

      {hasItems && isExpanded && (
        <ul
          id={groupId}
          css={S.group}
          className="ssa-tree__group"
          role={isTree ? 'group' : undefined}>
          {children.map((child, childIndex) => (
            <TreeViewItem
              key={child.id}
              item={child}
              level={(level + 1) as TreeLevel}
              index={childIndex}
              context={context}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
