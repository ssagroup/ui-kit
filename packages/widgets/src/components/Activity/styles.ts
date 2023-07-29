import { Theme, css } from '@emotion/react';

export const contentWrapper = (theme: Theme) => css`
  justify-content: center;
  gap: 20px;
  flex-direction: row;
  max-width: 380px;

  ${theme.mediaQueries.md} {
    gap: 30px;
  }
`;
