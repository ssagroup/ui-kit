import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useDropdownContext } from '@components/Dropdown/Dropdown.context';
import DropdownOption from '@components/DropdownOption';
import Tooltip from '@components/Tooltip';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';
import { resolveAriaProp } from '@utils/deprecation';

import { DropdownItemsListProps } from './types';

const DropdownOptionsBase = styled.ul<{
  tabindex?: string;
  maxHeight?: number;
  placement?: 'top' | 'bottom';
}>`
  position: absolute;

  /* Capped at the toggle's width (the list's containing block) rather than
     grown to max-content, which let a single long option stretch the popup far
     past the viewport. Option labels ellipsise instead. Matches
     MultipleDropdownOptions, which has always been width-bound. */
  width: 100%;

  list-style: none;

  padding: 4px;

  ${({ placement = 'bottom' }) =>
    placement === 'top'
      ? 'bottom: 100%; top: auto; margin: 0 0 4px;'
      : 'top: 100%; bottom: auto; margin: 4px 0 0;'}

  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  max-height: ${({ maxHeight = 200 }) => maxHeight}px;
  overflow: hidden auto;

  z-index: 2;

  filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};
  backdrop-filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};
`;

const dropdownOptionButton = css`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  cursor: pointer;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 500;
  outline: inherit;
  text-align: left;

  width: 100%;
  padding: 0;
  margin: 0;

  background: none;
  color: inherit;
  border: none;
`;

const avatarWrapper = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

/**
 * The button is a flex container, so its bare text would be an anonymous flex
 * item that `text-overflow` cannot reach. Wrapping the label gives the ellipsis
 * a block box to apply to.
 */
const optionLabel = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
`;

/**
 * Long enough that the tooltip does not fire while the pointer is travelling
 * down the list, short enough to feel like a deliberate hover.
 */
const OPTION_TOOLTIP_DELAY = 1000;

/**
 * The tooltip surface is sized to its content and never wraps without this, so
 * a long label would produce a tooltip as unreadably wide as the popup it is
 * there to explain.
 */
const OPTION_TOOLTIP_MAX_WIDTH = 320;

/**
 * Only a primitive is safe to repeat inside the tooltip. `children` accepts
 * arbitrary nodes, and rendering the same element in two places mounts two
 * independent copies — separate state, a clobbered ref, mount effects fired
 * twice. Options whose content is a component get no tooltip rather than a
 * second instance of it.
 */
const asText = (value: unknown): string | number | undefined =>
  typeof value === 'string' || typeof value === 'number' ? value : undefined;

const noItemsMsg = { id: Number.NaN, value: 'No items' };

/**
 * DropdownOptions - Options menu container for Dropdown component
 *
 * Renders the scrollable list of options that appears when the dropdown is open.
 * Provides proper ARIA attributes for accessibility and keyboard navigation.
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
 * // Used within Dropdown component
 * <Dropdown selectedItem={selected} onChange={handleChange}>
 *   <DropdownOptions>
 *     {items.map(item => (
 *       <DropdownOption key={item.id} value={item.id}>
 *         {item.label}
 *       </DropdownOption>
 *     ))}
 *   </DropdownOptions>
 * </Dropdown>
 * ```
 *
 * @see {@link Dropdown} - Parent component
 * @see {@link DropdownOption} - Individual option components
 *
 * @accessibility
 * - Uses role="listbox" for proper ARIA semantics
 * - Supports keyboard navigation (Arrow keys, Enter, Escape)
 * - Screen reader friendly
 */
const DropdownOptions = ({
  'aria-labelledby': ariaLabelledbyNative,
  ariaLabelledby,
  id,
  children,
}: DropdownItemsListProps) => {
  const { onChange, activeItem, maxHeight, listRef, placement } =
    useDropdownContext();
  const labelledby = resolveAriaProp(
    'DropdownOptions',
    'aria-labelledby',
    ariaLabelledbyNative,
    ariaLabelledby,
  );

  const childrenArray = React.Children.toArray(children).filter(Boolean);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options = (childrenArray as React.ReactElement<any>[]).map((child) => {
    const isActive = activeItem?.value === child.props.value;
    const avatar = child.props.avatar;
    const label =
      child.props.children || child.props.label || child.props.value;
    const tooltipText =
      asText(child.props.children) ??
      asText(child.props.label) ??
      asText(child.props.value);

    return React.cloneElement(
      child,
      {
        ...child.props,
        isActive,
        'aria-selected': isActive,
        onClick: onChange.bind(null, child.props.value),
      },
      <button type="button" css={dropdownOptionButton}>
        {avatar ? <span css={avatarWrapper}>{avatar}</span> : null}
        {/*
          Labels ellipsise, so the full text is otherwise unreachable. The
          tooltip is attached to every row rather than only the truncated ones:
          detecting truncation means measuring scrollWidth against clientWidth
          per row, and the delay already keeps it out of the way.

          Tooltip and TooltipTrigger render no DOM of their own -- a context
          provider and a cloneElement -- so the label stays a direct flex child
          of the button and the layout above is untouched. TooltipContent
          portals out, which is what keeps it clear of the list's own
          `overflow: hidden auto`.

          Both interaction flags are passed explicitly: Tooltip opens on click
          by default, and a click here has to select the option instead.

          Placed above rather than beside. Sideways placement clears the list
          nicely when there is room, but a dropdown near the right edge flips it
          to the left and a full-width one has room on neither side, so shift()
          ends up clamping it back over the list -- unpredictable. Above is
          stable, and flip() drops it below when the row is near the top.
        */}
        {tooltipText === undefined ? (
          <span css={optionLabel}>{label}</span>
        ) : (
          <Tooltip
            enableHover
            enableClick={false}
            size="medium"
            color="white"
            hoverOpenDelay={OPTION_TOOLTIP_DELAY}
            placement="top">
            <TooltipTrigger>
              <span css={optionLabel}>{label}</span>
            </TooltipTrigger>
            <TooltipContent maxWidth={OPTION_TOOLTIP_MAX_WIDTH}>
              {tooltipText}
            </TooltipContent>
          </Tooltip>
        )}
      </button>,
    );
  });

  if (options.length === 0) {
    options.push(
      <DropdownOption
        key={noItemsMsg.id}
        value={''}
        onClick={onChange.bind(null, '')}
        aria-selected={false}>
        <button css={dropdownOptionButton}>{noItemsMsg.value}</button>
      </DropdownOption>,
    );
  }

  return (
    <DropdownOptionsBase
      ref={listRef}
      role="listbox"
      tabindex="-1"
      id={id}
      aria-labelledby={labelledby}
      maxHeight={maxHeight}
      placement={placement}>
      {options}
    </DropdownOptionsBase>
  );
};

export default DropdownOptions;
