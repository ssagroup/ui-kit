import React from 'react';
import styled from '@emotion/styled';

import Checkbox from '@components/Checkbox';
import { useMultipleDropdownContext } from '@components/MultipleDropdown/MultipleDropdown.context';
import DropdownOption from '@components/DropdownOption';

import { IDropdownItemsListProps } from './types';
import { blueInputCheckbox } from '@components/Checkbox/styles';

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

  ${blueInputCheckbox}
`;

const DropdownOptionButton = styled.div<{
  checked?: boolean;
}>(({ theme }) => ({
  display: 'block',
  cursor: 'pointer',
  font: 'inherit',
  fontSize: '0.813rem',
  outline: 'inherit',
  textAlign: 'left',

  width: '100%',
  padding: 0,
  margin: 0,

  background: 'none',
  color: 'inherit',
  border: 'none',

  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',

  userSelect: 'none',

  '& label': {
    margin: '0 16px 0 0',
    '& input:not(:checked, :indeterminate) + div::before': {
      border: `1.5px solid ${theme.colors.greyDropdownMain}`,
    },
    [`& input:checked + div::before,
    & input:indeterminate + div::before`]: {
      background: theme.colors.blueNotification,
    },
    '& input + div': {
      borderRadius: '2px',
      '&::before': {
        borderRadius: '2px',
      },
    },
  },

  '&:has(> label > input:checked)': {
    fontWeight: '800',
  },

  [`&:hover input:not(:checked, :indeterminate) + div::before`]: {
    borderColor: theme.colors.greyDropdownFocused,
  },
}));

const noItemsMsg = { id: Number.NaN, value: 'No items' };

const MultipleDropdownOptions = ({
  ariaLabelledby,
  id,
  children,
}: IDropdownItemsListProps) => {
  const { onChange, allItems, isMultiple } = useMultipleDropdownContext();

  const toggleItem = (value: string | number) => {
    const item = allItems[value];
    onChange(item);
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
        isMultiple,
        'aria-selected': isActive,
        onClick: () => {
          toggleItem(child.props.value);
        },
      },
      <DropdownOptionButton checked={isActive} role="button">
        {isMultiple && (
          <Checkbox
            initialState={isActive}
            externalState={isActive}
            onChange={toggleItem.bind(null, child.props.value)}
            css={{
              margin: 0,
            }}
            color="blue"
          />
        )}
        {child.props.children || child.props.label || child.props.value}
      </DropdownOptionButton>,
    );
  });

  if (options.length === 0) {
    options.push(
      <DropdownOption key={noItemsMsg.id} value={''} aria-selected={false}>
        <DropdownOptionButton as="button">
          {noItemsMsg.value}
        </DropdownOptionButton>
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
