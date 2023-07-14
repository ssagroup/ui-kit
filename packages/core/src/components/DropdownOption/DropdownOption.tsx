import React from 'react';
import styled from '@emotion/styled';

interface IDropdownItemProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  isActive?: boolean;
  noHover?: boolean;
  value?: string | number;
  label?: string | number;
  children?: React.ReactNode;
}

const DropdownOption = styled.li<IDropdownItemProps>`
  overflow: hidden;

  padding: 8px 16px;

  border: none;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.greySelectedMenuItem : 'inherit'};

  &:hover {
    background: ${({ theme }) => theme.colors.greyLighter};
  }
`;

export default DropdownOption;
