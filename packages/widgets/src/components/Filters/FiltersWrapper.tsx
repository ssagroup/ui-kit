import styled from '@emotion/styled';

export const FiltersWrapper = styled.div<{ isMoreButtonVisible?: boolean }>`
  width: 300px;
  display: flex;
  justify-content: right;
  flex: auto;
  flex-direction: ${({ isMoreButtonVisible }) =>
    isMoreButtonVisible ? 'row' : 'row-reverse'};

  & > div:first-of-type > div:last-child {
    margin-right: ${({ isMoreButtonVisible }) =>
      isMoreButtonVisible ? '10px' : 0};
    ul: {
      right: ${({ isMoreButtonVisible }) => (isMoreButtonVisible ? 'auto' : 0)};
    }
  }
`;
