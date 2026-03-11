import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useDropdownContext } from '@components/Dropdown/Dropdown.context';
import DropdownOption from '@components/DropdownOption';

import { DropdownItemsListProps } from './types';

const DropdownOptionsBase = styled.ul<{ tabindex?: string }>`
  position: absolute;
  width: 100%;
  min-width: max-content;

  list-style: none;

  margin: 4px 0 0;
  padding: 0;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;

  max-height: 200px;
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
  cursor: pointer;
  font: inherit;
  font-size: 0.813rem;
  outline: inherit;
  text-align: left;

  width: 100%;
  padding: 0;
  margin: 0;

  background: none;
  color: inherit;
  border: none;
`;

const noItemsMsg = { id: Number.NaN, value: 'No items' };

/**
 * DropdownOptions - Options menu container for Dropdown component
 *
 * Renders the scrollable list of options that appears when the dropdown is open.
 * Provides proper ARIA attributes for accessibility and keyboard navigation.
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
  ariaLabelledby,
  id,
  children,
}: DropdownItemsListProps) => {
  const { onChange, activeItem } = useDropdownContext();

  const childrenArray = React.Children.toArray(children).filter(Boolean);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options = (childrenArray as React.ReactElement<any>[]).map((child) => {
    const isActive = activeItem?.value === child.props.value;

    return React.cloneElement(
      child,
      {
        ...child.props,
        isActive,
        'aria-selected': isActive,
        onClick: onChange.bind(null, child.props.value),
      },
      <button type="button" css={dropdownOptionButton}>
        {child.props.children || child.props.label || child.props.value}
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
      role="listbox"
      tabindex="-1"
      id={id}
      aria-labelledby={ariaLabelledby}>
      {options}
    </DropdownOptionsBase>
  );
};

export default DropdownOptions;
