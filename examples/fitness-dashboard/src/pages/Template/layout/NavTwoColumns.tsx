import styled from '@emotion/styled';

export const Layout = styled.div`
  display: grid;

  overflow-x: hidden;

  min-height: 100%;
  min-width: 100%;

  grid-template-areas:
    'header header'
    'main main';
  grid-auto-rows: 60px auto;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 100px 1fr 1fr 376px;
    grid-template-areas: 'nav main main aside';
    grid-template-rows: 100vh;
  }

  background: linear-gradient(
    143.06deg,
    #e7ebf1 -4.16%,
    #d7d9dd 39.37%,
    #cccdd2 52.66%,
    #e1e4ea 87.68%
  );

  input[type='checkbox'] {
    display: none;

    &:checked ~ aside {
      display: block;
      transform: translate(0);

      @media screen and (min-width: 601px) {
        transform: translateX(100vw) translateX(-376px);
      }

      ${({ theme }) => theme.mediaQueries.lg} {
        transform: translateX(100%);
      }
    }
  }
  label {
    cursor: pointer;
  }
`;
export const Sidebar = styled.aside`
  grid-area: header;
  grid-row-end: main;

  z-index: 9999;

  width: 100%;
  height: 100%;

  padding: 16px;

  background-color: #f2f4f7;

  transform: translateX(100vw);
  transition: transform 250ms ease-in-out;

  @media screen and (min-width: 601px) {
    max-width: 376px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-area: aside;
    grid-row-end: 6;

    padding: 36px;

    transform: translateX(0);
  }

  section {
    padding-block: 20px;
  }
`;

export const Nav = styled.section`
  display: flex;

  grid-area: header;
  grid-column-start: 1;
  grid-column-end: 2;

  align-items: center;

  padding-top: 16px;
  padding-left: 11px;

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-area: nav;
    grid-row-start: main;
    grid-row-end: main;
  }
`;
