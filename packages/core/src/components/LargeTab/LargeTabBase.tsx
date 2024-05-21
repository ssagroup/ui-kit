import styled from '@emotion/styled';
import { LargeTabProps } from '@components/TabBar/types';

export const LargeTabBase = styled.button<Pick<LargeTabProps, 'isActive'>>`
  width: 100px;
  max-width: 100px;
  height: 60px;
  border: 0;
  border-radius: 12px;
  outline: 0;
  margin: 0 12px 0 0;
  padding: 0;
  color: ${({ theme }) => theme.colors.greyDarker};
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.greyFocused : theme.colors.greyLighter};
  box-shadow: ${({ isActive, theme }) =>
    isActive ? `0px 10px 40px ${theme.colors.greyShadow24}` : null};
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }

  &:focus {
    background: ${({ isActive, theme }) =>
      isActive ? theme.colors.greyFocused : theme.colors.greySelectedMenuItem};
  }

  p {
    letter-spacing: 0.1px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media (max-width: 900px) {
    max-width: 70px;
  }
`;
