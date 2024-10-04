import styled from '@emotion/styled';

type WidgetsLayoutProps = {
  isBotDashboard?: boolean;
};

export const WidgetsLayoutTemplate = styled.div`
  margin: 15px 0;
  display: grid;
  gap: 10px;

  grid-template-columns: calc(50% - 5px) calc(50% - 5px);

  ${({ theme }) => theme.mediaQueries.lg} {
    height: auto;
    margin: 25px 0;
    grid-template-rows: 180px repeat(3, 200px);
  }

  ${({ theme }) => theme.mediaQueries.xlg} {
    margin: 20px 0;
  }
`;

export const WidgetsCustomLayoutTemplate = styled.div<WidgetsLayoutProps>`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(2, calc(50% - 5px));

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-rows: 200px;
  }
`;
