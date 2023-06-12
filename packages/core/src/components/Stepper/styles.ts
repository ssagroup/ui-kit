import { Theme, css } from '@emotion/react';

export const text = (theme: Theme) => css`
  display: block;
  font-style: normal;
  font-weight: 400;
  font-size: 0.438rem;
  line-height: 10px;
  color: #2b2d31;

  ${theme.mediaQueries.md} {
    font-size: 0.563rem;
    line-height: 12px;
  }
`;
