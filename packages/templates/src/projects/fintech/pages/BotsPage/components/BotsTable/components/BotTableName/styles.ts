import { css, Theme } from '@emotion/react';

export const BotName = (theme: Theme) => css`
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 90px;

  & > img {
    width: 15px;
  }

  ${theme.mediaQueries.md} {
    gap: 10px;

    & > img {
      width: 25px;
    }
  }
`;
