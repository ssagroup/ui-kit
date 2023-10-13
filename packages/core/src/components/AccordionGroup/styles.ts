import { css, Theme } from '@emotion/react';

export const wrapperStyles = {
  empty: css``,
  small: css`
    background: none;
    border-radius: 0;
    box-shadow: none;
  `,
  medium: css`
    border-radius: 0;
    box-shadow: none;
  `,
  large: css`
    margin-bottom: 25px;
    min-height: 70px;
    border-radius: 20px;
    padding: 0;
    &:last-child: {
      margin-bottom: 0;
    }
  `,
};

export const baseTitleStyles = css`
  user-select: none;
  align-items: center;
  cursor: pointer;
  border: none;
`;

export const createTitleStyles = (theme: Theme, isActive?: boolean) => ({
  empty: css`
    ${baseTitleStyles}
  `,
  small: css`
    ${baseTitleStyles}
    color: ${theme.colors.white80};
    margin-bottom: 0;
    height: 20px;
    font-size: 16px;
    font-weight: 500;
    & svg {
      width: 16px;
      height: 16px;
      & path {
        stroke: ${theme.colors.greyArrowSidebar};
        stroke-width: 1.6px;
      }
    }
  `,
  medium: css`
    ${baseTitleStyles}
    color: ${theme.colors.greyDropdownText};
    margin-bottom: 0;
    height: 40px;
    font-weight: 500;
    font-size: 14px;
    padding: 11px 22px 9px 17px;
    border: 1px solid ${theme.colors.greyDropdownMain};
    border-radius: 5px;
    & svg {
      width: 16px;
      height: 8px;
      & path {
        stroke: ${theme.colors.greyDropdownText};
        stroke-width: 1.2px;
      }
    }
  `,
  large: css`
    ${baseTitleStyles}
    margin-bottom: 0;
    height: 70px;
    font-weight: 700;
    font-size: 20px;
    padding: 23px 22px 23px 30px;
    background: ${isActive ? theme.colors.greyLighter : 'none'};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
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

export const createBaseContentStyles = (isActive?: boolean) => css`
  flex-direction: column;
  align-self: flex-start;
  height: ${isActive ? 'auto' : 0};
  max-height: ${isActive ? 'initial' : 0};
  overflow: ${isActive ? 'visible' : 'hidden'};
`;

export const createContentStyles = (theme: Theme, isActive?: boolean) => ({
  empty: css`
    ${createBaseContentStyles(isActive)};
  `,
  small: css`
    ${createBaseContentStyles(isActive)};
    color: ${theme.colors.white80};
    & p {
      color: ${theme.colors.white80};
      margin: 15px 0;
    }
  `,
  medium: css`
    ${createBaseContentStyles(isActive)};
    padding: ${isActive ? '18px 8px 23px 8px' : 0};
  `,
  large: css`
    ${createBaseContentStyles(isActive)};
    padding: ${isActive ? '19px 30px 23px 30px' : 0};
  `,
});
