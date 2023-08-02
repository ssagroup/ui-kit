import { Fragment } from 'react';
import { css, useTheme } from '@emotion/react';

import { ProgressInfoMetricProps } from './types';

// As we can't test the SVG, we ignore it
/* istanbul ignore next */
const ProgressInfoMetric = ({
  textPosition,
  total,
  size,
}: ProgressInfoMetricProps) => {
  const theme = useTheme();

  return (
    <Fragment>
      <text
        {...textPosition.caption[size]}
        textAnchor="middle"
        dominantBaseline="central"
        css={css`
          font-size: 13px;
          font-weight: 500;
          fill: ${theme.colors.greyDarker60};

          ${theme.mediaQueries.md} {
            font-size: 16px;
            font-weight: 700;
          }
        `}>
        Total
      </text>
      <text
        {...textPosition.value[size]}
        textAnchor="middle"
        dominantBaseline="central"
        css={css`
          font-size: 19px;
          font-weight: 700;
          fill: ${theme.colors.greyDarker};

          ${theme.mediaQueries.md} {
            font-size: 28px;
            font-weight: 700;
          }
        `}>
        {total}
      </text>
      <text
        {...textPosition.unit[size]}
        textAnchor="middle"
        dominantBaseline="central"
        css={css`
          font-size: 13px;
          font-weight: 700;
          fill: ${theme.colors.greyDarker60};

          ${theme.mediaQueries.md} {
            font-size: 16px;
            font-weight: 700;
          }
        `}>
        hrs
      </text>
    </Fragment>
  );
};

export default ProgressInfoMetric;
