import styled from '@emotion/styled';

const NavBarBase = styled.nav`
  align-items: center;
  justify-content: center;

  z-index: 9999;

  color: ${({ theme }) => theme.colors.greyLighter};

  input[type='checkbox'] {
    display: none;

    &:checked {
      & ~ div:first-of-type {
        background-color: #dee1ec;
      }

      & ~ div:nth-of-type(2) {
        transform: translateY(0);
        border-radius: 12px 12px 0 0;
        height: calc(100vh - 60px);

        ${({ theme }) => theme.mediaQueries.lg} {
          border-radius: 0;
          height: 100vh;
        }
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;

    top: 0;

    border-radius: 0;

    button {
      display: none;
    }
  }
`;

export default NavBarBase;
