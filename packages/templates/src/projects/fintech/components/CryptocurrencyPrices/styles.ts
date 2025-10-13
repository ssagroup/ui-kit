import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Wrapper } from '@ssa-ui-kit/core';

export const IconWrapper = styled(Wrapper)`
  width: 25px;
  flex-direction: row;
`;

export const Platform = css`
  width: 25px;
  height: 25px;
`;

export const ItemsWrapper = styled(Wrapper)`
  justify-content: 'space-between';
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`;

export const WeightedItemsWrapper = styled(Wrapper)`
  flex-direction: column;
  justify-content: 'space-between';
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`;

export const Instrument = styled(Wrapper)<{ isBotPage: boolean }>`
  font-size: ${({ isBotPage }) => (isBotPage ? '10px' : '12px')};
  font-weight: 500;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.greyDarker};
  justify-content: flex-end;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 14px;
  }
`;

// eslint-disable-next-line prettier/prettier
export const Price = styled(Wrapper)<{ isIncreasing: boolean | null; isBotPage: boolean }>`
  font-size: ${({ isBotPage }) => (isBotPage ? '16px' : '14px')};
  font-weight: 500;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme, isIncreasing }) => {
    switch (isIncreasing) {
      case true:
        return theme.colors.greenLighter;
      case false:
        return theme.colors.pink;
      default:
        return theme.colors.greyDarker;
    }
  }};
`;

export const Content = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 100%;
  min-height: 130px;
  gap: 15px;
`;
