import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useDropdownContext } from '@components/Dropdown/Dropdown.context';
import DropdownOption from '@components/DropdownOption';

import { IDropdownItemsListProps } from './types';

const DropdownOptionsBase = styled.ul<{ tabindex?: string }>`
  position: absolute;
  width: 100%;

  list-style: none;

  margin: 4px 0 0;
  padding: 0;

  background: #fff;
  border-radius: 8px;

  overflow-x: hidden;
  overflow-y: auto;

  z-index: 2;

  filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};
  backdrop-filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};
`;

const dropdownOptionButton = css`
  display: block;
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

const DropdownOptions = ({
  ariaLabelledby,
  id,
  children,
}: IDropdownItemsListProps) => {
  const { onChange, activeItem } = useDropdownContext();

  const childrenArray = React.Children.toArray(children).filter(Boolean);

  const options = (childrenArray as React.ReactElement[]).map((child) => {
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
        onClick={onChange.bind(null, null)}
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
