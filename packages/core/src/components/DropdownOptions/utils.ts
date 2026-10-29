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
  textValue:
    asText(props.children) ?? asText(props.label) ?? asText(props.value),
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
