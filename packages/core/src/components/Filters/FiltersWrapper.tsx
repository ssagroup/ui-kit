import styled from '@emotion/styled';

export const FiltersWrapper = styled.div<{ isMoreButtonVisible?: boolean }>`
  width: 300px;
  display: flex;
  justify-content: right;
  flex: auto;
  flex-direction: ${({ isMoreButtonVisible }) =>
    isMoreButtonVisible ? 'row' : 'row-reverse'};

  & button {
    height: 30px;
  }

  & > div:first-of-type > div:last-child {
    margin-right: ${({ isMoreButtonVisible }) =>
      isMoreButtonVisible ? '10px' : 0};
    ul: {
      right: ${({ isMoreButtonVisible }) => (isMoreButtonVisible ? 'auto' : 0)};
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    & button {
      height: 36px;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & button {
      height: 40px;
    }
  }
`;
