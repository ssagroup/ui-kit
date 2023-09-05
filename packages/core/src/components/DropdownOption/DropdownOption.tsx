import React from 'react';
import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

interface IDropdownItemProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  isActive?: boolean;
  isMultiple?: boolean;
  noHover?: boolean;
  value?: string | number;
  label?: string | number;
  children?: React.ReactNode;
}

interface MultipleStylesProps {
  theme: Theme;
}

const multipleStyles = ({ theme }: MultipleStylesProps) => {
  return css`
    background: none;
    color: ${theme.colors.greyDisabled};
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

  ${({ isMultiple, theme }) =>
    isMultiple &&
    multipleStyles({
      theme,
    })}
`;

export default DropdownOption;
