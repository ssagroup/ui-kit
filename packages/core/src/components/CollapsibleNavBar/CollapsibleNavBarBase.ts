import styled from '@emotion/styled';
import { css } from '@emotion/react';
import NavBarBase from '@components/NavBar/NavBarBase';

// TODO: refactor this
const popupIconsToggle = (isVisible: boolean) => css`
  & a > button {
    display: ${isVisible ? 'block' : 'none'};
  }
  & > div > div > div > div:first-of-type {
    display: ${isVisible ? 'block' : 'none'};
    & > button {
      display: ${isVisible ? 'block' : 'none'};
    }
  }
`;

// TODO: refactor this
const staticIconsToggle = (isVisible: boolean) => css`
  & a > div {
    display: ${isVisible ? 'flex' : 'none'};
  }
  & > div > div > div > div:nth-of-type(2) {
    display: ${isVisible ? 'flex' : 'none'};
  }
  & > div > div > div:nth-of-type(2) {
    display: ${isVisible ? 'block' : 'none'};
  }
`;

const CollapsibleNavBarBase = styled(NavBarBase)`
  padding: 15px 0 0 15px;
  position: absolute;

  & li {
    ${popupIconsToggle(false)}
  }

  &.opened {
    background: linear-gradient(
      108.3deg,
      ${({ theme }) => theme.colors.greyDarker} -0.36%,
      ${({ theme }) => theme.colors.greyDarker} 100%
    );
    align-items: flex-start;
    min-width: 100%;
    width: 100%;
    height: 100%;

    ${({ theme }) => theme.mediaQueries.md} {
      height: initial;
    }
  }

  & > input[type='checkbox'] {
    &:checked {
      & ~ div:first-of-type {
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

      & ~ div:nth-of-type(2) {
        display: block;
        border-radius: 0;
        height: calc(100vh - 60px);

        ${({ theme }) => theme.mediaQueries.xlg} {
          border-radius: 0;
          height: 100vh;
        }
      }
    }
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 85px;
    padding: 0;
    position: static;
    z-index: 0;
    min-width: unset;

    & li {
      ${staticIconsToggle(false)}
      ${popupIconsToggle(true)}
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    &.opened {
      min-width: 240px;
      width: 291px;

      & > div:nth-of-type(2) {
        width: 240px;
        padding-left: 31px;
        & img {
          margin-left: 0;
        }
        & li {
          justify-content: flex-start;
          & button {
            display: flex;
          }
          ${staticIconsToggle(true)}
          ${popupIconsToggle(false)}

          & > a > span {
            display: block;
          }

          & div > div > div:nth-of-type(2) {
            display: flex;
          }
        }
      }
    }
  }
`;

export default CollapsibleNavBarBase;
