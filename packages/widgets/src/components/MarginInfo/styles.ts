import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Wrapper } from '@ssa-ui-kit/core';

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 5px;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  padding: 0 7px;
  justify-content: flex-start;
`;

export const Cell = styled.div`
  flex: 1;
  padding-right: 5px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.greyDarker};
  font-size: 13px;
  font-weight: 400;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const RowCells = styled.div`
  display: flex;
  flex-direction: row;
  flex: 2;
  flex-basis: 0;
  min-width: 0;
  justify-content: flex-start;
`;

export const HeaderCell = styled(RowCells)`
  font-size: 14px;
  font-weight: 600;
`;

export const RowLabel = styled.div`
  flex: 1;
  flex-basis: 0;
  min-width: 0;
  color: ${({ theme }) => theme.colors.greyDarker};
  font-size: 13px;
  font-weight: 600;
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 7px;
  background: ${({ theme }) => theme.colors.greyLighter};
  border-radius: 8px;
`;

export const ButtonsWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 5px;
  margin-top: auto;
`;

const baseButtonStyles = (theme: Theme) => css`
  display: flex;
  flex: 1;
  justify-content: center;
  height: 34px;
  border: none;
  border-radius: 8px;
  color: ${theme.colors.white};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    background: ${theme.colors.grey};
    cursor: not-allowed;
  }

  & > span,
  & > * {
    color: inherit;
  }
`;

export const BorrowButton = (theme: Theme) => css`
  ${baseButtonStyles(theme)};

  background: linear-gradient(
    247deg,
    ${theme.colors.blueLighter} 14.71%,
    ${theme.colors.blue} 85.29%
  );

  &:hover {
    background: linear-gradient(
      247deg,
      ${theme.colors.blueButtonHoverGradientFrom} 14.71%,
      ${theme.colors.blueButtonHoverGradientTo} 85.29%
    );
    box-shadow: 0 4px 12px ${theme.colors.blueLighter40};
  }

  &:active {
    background: ${theme.colors.blueButtonActive};
  }
`;

export const RepayButton = (theme: Theme) => css`
  ${baseButtonStyles(theme)};

  background: linear-gradient(
    99.26deg,
    ${theme.colors.green} -7.01%,
    ${theme.colors.greenLighter} 92.87%
  );

  &:hover {
    background: linear-gradient(
      99.26deg,
      ${theme.colors.greenDark} -7.01%,
      ${theme.colors.green} 92.87%
    );
    box-shadow: 0 4px 12px ${theme.colors.green40};
  }

  &:active {
    background: ${theme.colors.greenDark};
  }
`;
