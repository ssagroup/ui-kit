import { Theme, css } from '@emotion/react';

export const Title = (theme: Theme) => css`
  & > div:first-of-type {
    height: auto;
    margin-bottom: 10px;

    ${theme.mediaQueries.md} {
      h3 {
        white-space: break-spaces;
      }
    }
  }
`;
