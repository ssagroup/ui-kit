import React, { BaseSyntheticEvent } from 'react';
import styled from '@emotion/styled';

import Checkbox from '@components/Checkbox';
import { useMultipleDropdownContext } from '@components/MultipleDropdown/MultipleDropdown.context';
import DropdownOption from '@components/DropdownOption';

import { checkboxStyles } from '@components/Checkbox/styles';
import { DropdownItemsListProps } from './types';

const DropdownOptionsBase = styled.ul<{ tabindex?: string }>`
  position: absolute;
  width: 100%;

  list-style: none;

  margin: 4px 0 0;
  padding: 0;

  background: #fff;
  border-radius: 8px;

  overflow: hidden auto;

  z-index: 1;

  filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};
  backdrop-filter: ${({ theme }) =>
    `drop-shadow(-4px 4px 14px ${theme.colors.greyDarker14})`};

  ${({ theme }) => checkboxStyles.blueInput(theme)}
`;

const DropdownOptionButton = styled.div<{
  checked?: boolean;
  isDisabled?: boolean;
}>(({ theme, isDisabled }) => ({
  display: 'block',
  cursor: isDisabled ? 'default' : 'pointer',
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
    '& input + div': {
      borderRadius: '2px',
      '&::before': {
        borderRadius: '2px',
      },
    },
  },

  '&:has(:scope > label > input:checked)': {
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
}: DropdownItemsListProps) => {
  const { onChange, allItems, isMultiple } = useMultipleDropdownContext();

  const toggleItem = (value: string | number, isDisabled: boolean) => {
    if (!isDisabled) {
      const item = allItems[value];
      onChange(item);
    }
  };

  const childrenArray = React.Children.toArray(children).filter(Boolean);

  const options = (childrenArray as React.ReactElement[]).map((child) => {
    const element = allItems[child.props.value];
    const isActive = Boolean(element?.isSelected);
    const isDisabled = Boolean(element?.isDisabled);

    return React.cloneElement(
      child,
      {
        ...child.props,
        isActive,
        isMultiple,
        'aria-selected': isActive,
        onClick: (event: BaseSyntheticEvent) => {
          event.preventDefault();
          toggleItem(child.props.value, isDisabled);
        },
      },
      <DropdownOptionButton
        checked={isActive}
        isDisabled={isDisabled}
        role="button">
        {isMultiple && (
          <Checkbox
            initialState={isActive}
            externalState={isActive}
            isDisabled={isDisabled}
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
