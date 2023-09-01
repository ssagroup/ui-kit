import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Checkbox from '@components/Checkbox';
import { useMultipleDropdownContext } from '@components/MultipleDropdown/MultipleDropdown.context';
import DropdownOption from '@components/DropdownOption';

import { IDropdownItemsListProps } from './types';
import { IDropdownOption } from '../..';

// TODO: Make common?
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

// TODO: Make common?
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

const MultipleDropdownOptions = ({
  ariaLabelledby,
  id,
  children,
}: IDropdownItemsListProps) => {
  const { onChange, allItems } = useMultipleDropdownContext();

  const toggleItem = (value) => {
    const item = allItems[value];
    onChange(item as IDropdownOption);
  };

  const childrenArray = React.Children.toArray(children).filter(Boolean);

  const options = (childrenArray as React.ReactElement[]).map((child) => {
    const element = allItems[child.props.value];
    const isActive = Boolean(element?.isSelected);

    return React.cloneElement(
      child,
      {
        ...child.props,
        isActive,
        'aria-selected': isActive,
        onClick: () => {
          toggleItem(child.props.value);
        },
      },
      <div css={dropdownOptionButton}>
        <Checkbox
          initialState={isActive}
          externalState={isActive}
          onChange={toggleItem.bind(null, child.props.value)}
        />
        {child.props.children || child.props.label || child.props.value}
      </div>,
    );
  });

  if (options.length === 0) {
    options.push(
      <DropdownOption key={noItemsMsg.id} value={''} aria-selected={false}>
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

export default MultipleDropdownOptions;
