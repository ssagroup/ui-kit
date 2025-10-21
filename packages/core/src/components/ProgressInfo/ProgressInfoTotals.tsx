import { css, withTheme } from '@emotion/react';

import Typography from '@components/Typography';

import { ProgressInfoTotalsProps } from './types';

export const ProgressInfoTotals = withTheme(
  ({ theme, total }: ProgressInfoTotalsProps) => {
    return (
      <Typography
        variant="body2"
        weight="regular"
        color={theme.colors.greyDarker60}
        css={css`
          font-size: 13px;
          line-height: 16px;
          margin-top: -5px;

          ${theme.mediaQueries.md} {
            font-size: 16px;
            font-weight: 700;
          }
        `}>
        Total
        <Typography
          variant="body2"
          weight="bold"
          color={theme.colors.greyDarker}
          as={'span'}
          css={css`
            font-size: 19px;
            line-height: 23px;
            display: block;

            ${theme.mediaQueries.md} {
              font-size: 27.65px;
              line-height: 35px;
            }
          `}>
          {total}
          <Typography
            variant="body2"
            weight="regular"
            as="span"
            color={theme.colors.greyDarker60}
            css={css`
              font-size: 13px;
              font-weight: 600;
              margin-left: 3px;

              ${theme.mediaQueries.md} {
                font-size: 16px;
              }
            `}>
            hrs
          </Typography>
        </Typography>
      </Typography>
    );
  },
);
