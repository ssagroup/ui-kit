import { css } from '@emotion/react';

import { ProgressBar, ProgressVertical, Typography } from '@ssa-ui-kit/core';

import { dateFormatters } from '@ssa-ui-kit/utils';

import { ActivityItemProps } from './types';

const { printDayOfTheWeek } = dateFormatters;

const container = css`
  display: flex;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: 162px;
  gap: 10px;

  font-size: 11px;
`;

const ActivityItem = ({ currentValue, date }: ActivityItemProps) => {
  return (
    <div css={container}>
      <ProgressVertical>
        <ProgressBar percentage={currentValue} color="yellow" />
      </ProgressVertical>

      <Typography variant="subtitle">
        {printDayOfTheWeek(new Date(date).getDay())}
      </Typography>
    </div>
  );
};

export default ActivityItem;
