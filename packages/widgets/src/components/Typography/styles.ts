import { css, Theme } from '@emotion/react';

export const h1 = css`
  font-size: 2.488rem; //39px
  line-height: 3.375rem;
`;
export const h2 = (theme: Theme) => css`
  font-size: 1.188rem; // 19px
  line-height: 1.375rem; //26.23px;

  ${theme.mediaQueries.md} {
    font-size: 1.719rem; //27px
  }
  ${theme.mediaQueries.lg} {
    font-size: 2.074rem; //33px
    line-height: 2.813rem; // 45px
  }
`;
export const h3 = (theme: Theme) => css`
  font-size: 1.438rem; // 23px
  line-height: 1.625rem;

  ${theme.mediaQueries.lg} {
    font-size: 1.728rem; //27px
  }
`;
export const h4 = css`
  font-size: 1.44rem; // 23px
  line-height: 1.625rem;
`;
export const h5 = (theme: Theme) => css`
  font-size: 1rem; //16px
  line-height: 1.5rem;

  ${theme.mediaQueries.md} {
    font-size: 1.2rem; //19px
  }
`;
export const h6 = css`
  font-size: 1rem; // 16px
  line-height: 1.375rem;
`;
export const subtitle = css`
  font-size: 0.833rem; // 13.2px
  line-height: 0.938rem;
`;
export const body1 = css`
  font-size: 0.694rem; //11px
  line-height: 0.938rem;
`;
export const body2 = css`
  font-size: 0.579rem; //9px
  line-height: 0.938rem;
`;
export const body3 = css`
  font-size: 0.5rem; //8px
  line-height: 0.938rem;
`;
export const caption = css`
  display: block;
  font-size: 0.481rem; //7.6px
  line-height: 0.75rem;
`;

// font-weight variants
export const lighter = css`
  font-style: normal;
  font-weight: 400;
`;
export const regular = css`
  font-style: normal;
  font-weight: 500;
`;
export const medium = css`
  font-style: normal;
  font-weight: 600;
`;
export const bold = css`
  font-style: normal;
  font-weight: 700;
`;

export const gutter = css`
  margin-block-end: 1rem;
`;
