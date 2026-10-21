import React from 'react';

import { ContextMenuItem } from '@components/ContextMenu';
import { DropdownItemProps } from '@components/DropdownOption/DropdownOption';
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

/**
 * Reads `DropdownOption` children into ContextMenu items. The label resolves
 * as `children` → `label` → `value`, as it always has.
 */
export const toDropdownMenuItems = (
  children: React.ReactNode,
): ContextMenuItem<OptionValue>[] =>
  React.Children.toArray(children)
    .filter((child): child is React.ReactElement<DropdownItemProps> =>
      React.isValidElement(child),
    )
    .map(({ props }) => ({
      // Narrower than DropdownItemProps allows (booleans); passed through as
      // before, the list compares values with ===.
      value: props.value as OptionValue,
      label: props.children || props.label || props.value,
      textValue:
        asText(props.children) ?? asText(props.label) ?? asText(props.value),
      avatar: props.avatar,
      disabled: resolveDisabled(
        'DropdownOption',
        props.disabled,
        props.isDisabled,
      ),
      className: props.className,
      'data-testid': (props as { 'data-testid'?: string })['data-testid'],
    }));
