import styled from '@emotion/styled';
import NavBarBase from '@components/NavBar/NavBarBase';
import CollapsibleNavBarWrapper from './CollapsibleNavBarWrapper';
import CollapsibleNavToggleWrapper from './CollapsibleNavToggleWrapper';

const CollapsibleNavBarBase = styled(NavBarBase)`
  padding: 15px 0 0 15px;

  &:has(input[type='checkbox']:checked) {
    background: linear-gradient(
      108.3deg,
      ${({ theme }) => theme.colors.greyDarker} -0.36%,
      ${({ theme }) => theme.colors.greyDarker} 100%
    );
    height: 100%;
  }

  input[type='checkbox'] {
    &:checked {
      & ~ ${CollapsibleNavToggleWrapper} {
        background-color: #4a4d51;

        & label span {
          opacity: 1;
          transform: rotate(45deg) translate(-5px, -9px);
          background: ${({ theme }) => theme.colors.white};

          &:nth-last-of-type(3) {
            opacity: 0;
            transform: rotate(0deg) scale(0.2, 0.2);
          }

          &:nth-last-of-type(2) {
            transform: rotate(-45deg) translate(-2px, 8px);
          }
        }
      }

      & ~ ${CollapsibleNavBarWrapper} {
        opacity: 1;
        border-radius: 12px 12px 0 0;
        height: calc(100vh - 60px);

        ${({ theme }) => theme.mediaQueries.lg} {
          border-radius: 0;
          height: 100vh;
        }
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 85px;
    padding: 0;
    height: 100%;
  }
`;

export default CollapsibleNavBarBase;
