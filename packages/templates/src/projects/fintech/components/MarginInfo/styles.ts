import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Wrapper } from '@ssa-ui-kit/core';

export const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  gap: 16px;
  flex: 1;
  justify-content: flex-start;
`;

export const HeaderLabel = styled.div`
  flex: 1;
`;

export const HeaderCell = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.greyDarker};
  flex: 1;
  text-align: left;
  margin-right: 6px;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${({ theme }) => theme.colors.greyLighter};
  border-radius: 8px;
  padding: 5px 7px;
`;

export const RowLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.greyDarker};
  flex: 1;
`;

export const RowCells = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex: 2;
  justify-content: flex-start;
`;

export const Cell = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.greyDarker};
  flex: 1;
  text-align: left;
`;

export const Value = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.greyDarker};
`;

export const ButtonsWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: row;
  gap: 12px;
  width: 100%;
  margin-top: auto;
`;

const baseButtonStyles = (theme: Theme) => css`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 34px;
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.white};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background: ${theme.colors.grey};
    cursor: not-allowed;
  }
`;

export const BorrowButton = (theme: Theme) => css`
  ${baseButtonStyles(theme)};

  & > * {
    color: inherit;
  }

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

  & > * {
    color: inherit;
  }

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
