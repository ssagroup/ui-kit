import { css, Theme } from '@emotion/react';

export const createWrapperStyles = (theme: Theme) => ({
  empty: css``,
  small: css``,
  medium: css``,
  large: css`
    margin-bottom: 25px;
    min-height: 70px;
    cursor: pointer;
    border-radius: 20px;
    padding: 0;
    &:last-child: {
      margin-bottom: 0;
    }
    & svg {
      width: 20px;
      height: 10px;
      & path {
        stroke: ${theme.colors.greyDarker};
        stroke-width: 1.2px;
      }
    }
  `,
});

export const baseTitleStyles = css`
  align-items: center;
`;

export const createTitleStyles = (theme: Theme, isActive?: boolean) => ({
  empty: css`
    ${baseTitleStyles}
  `,
  small: css`
    ${baseTitleStyles}
  `,
  medium: css`
    ${baseTitleStyles}
  `,
  large: css`
    ${baseTitleStyles}
    margin-bottom: 0;
    height: 70px;
    font-weight: 700;
    font-size: 20px;
    padding: 23px 30px;
    background: ${isActive ? theme.colors.greyLighter : 'none'};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    user-select: none;
  `,
});

export const createBaseContentStyles = (isActive?: boolean) => css`
  user-select: none;
  flex-direction: column;
  align-self: flex-start;
  height: ${isActive ? 'auto' : 0};
  max-height: ${isActive ? 'initial' : 0};
  overflow: ${isActive ? 'visible' : 'hidden'};
`;

export const createContentStyles = (isActive?: boolean) => ({
  empty: css`
    ${createBaseContentStyles(isActive)};
  `,
  small: css`
    ${createBaseContentStyles(isActive)};
  `,
  medium: css`
    ${createBaseContentStyles(isActive)};
  `,
  large: css`
    ${createBaseContentStyles(isActive)};
    padding: ${isActive ? '19px 30px 23px 30px' : 0};
  `,
});
