import { MouseEvent } from 'react';
import { css } from '@emotion/react';

import { useDropdownContext } from '@components/Dropdown/Dropdown.context';
import { ContextMenu } from '@components/ContextMenu';
import { resolveAriaProp } from '@utils/deprecation';

import { DropdownItemsListProps } from './types';
import { OptionValue, toDropdownMenuItems } from './utils';

// Focus stays on the toggle while the list is used with the pointer.
const keepToggleFocus = (event: MouseEvent) => event.preventDefault();

/*
 * Positioned against the Dropdown base, the toggle's containing block.
 * Capped at the toggle's width rather than grown to max-content, which let a
 * single long option stretch the popup far past the viewport; option labels
 * ellipsise instead.
 */
const listPosition = (placement: 'top' | 'bottom') => css`
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 2;
  ${placement === 'top'
    ? 'bottom: 100%; top: auto; margin: 0 0 4px;'
    : 'top: 100%; bottom: auto; margin: 4px 0 0;'}
`;

/**
 * DropdownOptions - Options menu container for Dropdown component
 *
 * Renders the `DropdownOption` children as a `ContextMenu` placed under (or
 * above) the Dropdown toggle. Focus stays on the toggle; the highlighted
 * option is driven from there and announced through `aria-activedescendant`.
 *
 * Placement (opening upward or downward) is driven entirely by the parent
 * Dropdown via context — this component does not calculate position itself.
 * A ref is attached to the list element so Dropdown can measure its actual
 * rendered height when determining the correct placement on each open.
 *
 * @category Form Controls
 * @subcategory Selection
 *
 * @example
 * ```tsx
 * // Rendered by Dropdown itself — pass options straight to Dropdown
 * <Dropdown selectedItem={selected} onChange={handleChange}>
 *   {items.map(item => (
 *     <DropdownOption key={item.value} value={item.value} label={item.label} />
 *   ))}
 * </Dropdown>
 * ```
 *
 * @see {@link Dropdown} - Parent component
 * @see {@link DropdownOption} - Individual option components
 *
 * @accessibility
 * - Uses role="listbox" with role="option" rows
 * - Arrow keys, Home, End, Enter, Space and Escape on the toggle
 */
const DropdownOptions = ({
  'aria-labelledby': ariaLabelledbyNative,
  ariaLabelledby,
  id,
  children,
}: DropdownItemsListProps) => {
  const {
    onChange,
    activeItem,
    maxHeight = 200,
    listRef,
    placement = 'bottom',
    activeValue = null,
    setActiveValue,
  } = useDropdownContext();
  const labelledby = resolveAriaProp(
    'DropdownOptions',
    'aria-labelledby',
    ariaLabelledbyNative,
    ariaLabelledby,
  );

  return (
    <ContextMenu<OptionValue>
      ref={listRef}
      id={id}
      aria-labelledby={labelledby}
      css={listPosition(placement)}
      selectionMode="single"
      items={toDropdownMenuItems(children)}
      value={(activeItem?.value as OptionValue | undefined) ?? null}
      onAction={(value) => onChange(value as string)}
      activeValue={activeValue}
      onActiveValueChange={setActiveValue}
      maxHeight={maxHeight}
      tabIndex={-1}
      onMouseDown={keepToggleFocus}
    />
  );
};

export default DropdownOptions;
