import styled from '@emotion/styled';

export const HeaderBase = styled.header`
  display: flex;
  flex-flow: column-reverse;

  margin-bottom: 12px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    margin-bottom: 16px;
  }
`;

export const MenusSectionBase = styled.div`
  display: none;
  align-items: center;
  align-self: flex-end;
  gap: 15px;
  height: 52px;
  padding-left: 58px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    justify-content: flex-end;
    gap: 0;
    padding-left: 0;
  }
`;

export const PageSectionBase = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: flex-end;

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: flex-start;
    margin-top: 17px;
  }
`;
