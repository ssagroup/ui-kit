import React from 'react';
import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';
import { CommonProps } from '@global-types/emotion';

interface IDropdownItemProps extends CommonProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  isActive?: boolean;
  isMultiple?: boolean;
  isDisabled?: boolean;
  noHover?: boolean;
  value?: string | number | boolean;
  label?: string | number;
  children?: React.ReactNode;
}

interface MultipleStylesProps {
  theme: Theme;
  isDisabled?: boolean;
}

const multipleStyles = ({ theme, isDisabled }: MultipleStylesProps) => {
  return css`
    background: none;
    color: ${isDisabled
      ? theme.colors.greyDisabledCheckbox
      : theme.colors.greyDisabled};
    &:hover {
      background: none;
    }
  `;
};

const DropdownOption = styled.li<IDropdownItemProps>`
  overflow: hidden;

  height: 34px;
  padding: 8px 16px;

  border: none;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.greySelectedMenuItem : 'inherit'};

  &:hover {
    background: ${({ theme }) => theme.colors.greyLighter};
  }

  ${({ isMultiple, isDisabled, theme }) =>
    isMultiple &&
    multipleStyles({
      theme,
      isDisabled,
    })}
`;

export default DropdownOption;
