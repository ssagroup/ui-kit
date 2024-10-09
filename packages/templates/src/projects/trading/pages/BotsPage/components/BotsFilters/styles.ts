import { Theme, css } from '@emotion/react';

export const FiltersWrapper = (theme: Theme) => css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${theme.mediaQueries.md} {
    flex-wrap: nowrap;
  }
`;

export const Filters = (theme: Theme) => css`
  margin-bottom: 14px;
  min-width: 330px;

  & ul {
    width: auto !important;
    max-width: 470px;
  }

  & > div:last-of-type {
    min-width: calc(100% - 139px);

    & > div:first-of-type > div:last-of-type ul {
      right: 0;
    }
  }

  & button {
    height: 30px;
  }

  ${theme.mediaQueries.md} {
    height: 36px;

    & > div:last-of-type {
      min-width: calc(100% - 180px);
    }
  }

  ${theme.mediaQueries.lg} {
    & button {
      height: 40px;
    }
  }
`;

export const SearchBox = css`
  min-width: 139px;
  line-height: normal;
`;

export const PeriodSwitcher = (theme: Theme) => css`
  flex-shrink: 0;
  text-align: right;
  margin-bottom: 14px;
  width: 100%;

  ${theme.mediaQueries.md} {
    width: auto;
    margin-left: 10px;
  }
`;

export const PeriodSwitcherBtn = css`
  padding-left: 10.5px;
  padding-right: 10.5px;
`;
