import React from 'react';

import { ContextMenuEntry, ContextMenuItem } from '@components/ContextMenu';
import { DropdownItemProps } from '@components/DropdownOption/DropdownOption';
import DropdownOptionGroup, {
  DropdownOptionGroupProps,
} from '@components/DropdownOptionGroup';
import { resolveDisabled } from '@utils/deprecation';

/** Value of a Dropdown option as the list sees it. */
export type OptionValue = string | number;

/**
 * Only a primitive is safe to repeat inside the tooltip; rendering the same
 * element twice mounts two independent copies of it.
 */
const asText = (value: unknown): string | undefined =>
  typeof value === 'string' || typeof value === 'number'
    ? String(value)
    : undefined;

/** Text an option is searched by: `textValue`, else its text label. */
const getOptionText = (props: DropdownItemProps) =>
  props.textValue ??
  asText(props.children) ??
  asText(props.label) ??
  asText(props.value);

const isOptionGroup = (
  child: React.ReactElement,
): child is React.ReactElement<DropdownOptionGroupProps> =>
  child.type === DropdownOptionGroup;

const toMenuItem = ({
  props,
}: React.ReactElement<DropdownItemProps>): ContextMenuItem<OptionValue> => ({
  // Narrower than DropdownItemProps allows (booleans); passed through as
  // before, the list compares values with ===.
  value: props.value as OptionValue,
  label: props.children || props.label || props.value,
  textValue: getOptionText(props),
  avatar: props.avatar,
  disabled: resolveDisabled('DropdownOption', props.disabled, props.isDisabled),
  className: props.className,
  'data-testid': (props as { 'data-testid'?: string })['data-testid'],
});

const toElements = (children: React.ReactNode) =>
  React.Children.toArray(children).filter(
    (child): child is React.ReactElement => React.isValidElement(child),
  );

/**
 * The `DropdownOption` children in display order, with any
 * `DropdownOptionGroup` unwrapped.
 */
export const flattenDropdownOptions = (
  children: React.ReactNode,
): React.ReactElement<DropdownItemProps>[] =>
  toElements(children).flatMap((child) =>
    isOptionGroup(child)
      ? (toElements(
          child.props.children,
        ) as React.ReactElement<DropdownItemProps>[])
      : [child as React.ReactElement<DropdownItemProps>],
  );

/**
 * Reads `DropdownOption` children into ContextMenu items, and each
 * `DropdownOptionGroup` into a ContextMenu group. The label resolves as
 * `children` → `label` → `value`, as it always has.
 */
export const toDropdownMenuItems = (
  children: React.ReactNode,
): ContextMenuEntry<OptionValue>[] =>
  toElements(children).map((child, index) =>
    isOptionGroup(child)
      ? {
          id: child.props.id ?? `group-${String(child.key ?? index)}`,
          label: child.props.label,
          items: toElements(child.props.children).map((option) =>
            toMenuItem(option as React.ReactElement<DropdownItemProps>),
          ),
        }
      : toMenuItem(child as React.ReactElement<DropdownItemProps>),
  );

/**
 * The `DropdownOption` children whose text contains `query` (case-insensitive),
 * in display order. A `DropdownOptionGroup` is kept, holding only its matching
 * options, while any of them match. An empty query returns the children as is.
 * Options with no text (custom markup and no `textValue`) never match.
 */
export const filterDropdownOptions = (
  children: React.ReactNode,
  query: string,
): React.ReactElement[] => {
  const search = query.trim().toLowerCase();
  if (!search) return toElements(children);
  const matches = (option: React.ReactElement) =>
    !!getOptionText(option.props as DropdownItemProps)
      ?.toLowerCase()
      .includes(search);
  return toElements(children).flatMap((child) => {
    if (!isOptionGroup(child)) return matches(child) ? [child] : [];
    const options = toElements(child.props.children).filter(matches);
    return options.length ? [React.cloneElement(child, {}, ...options)] : [];
  });
};
