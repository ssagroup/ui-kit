import { useTheme } from '@emotion/react';
import { ProgressBar } from '@ssa-ui-kit/core';
import { MaxInWorkProps } from './types';

type ProgressProps = Pick<MaxInWorkProps, 'percent'>;

export const Progress = ({ percent }: ProgressProps) => {
  const theme = useTheme();
  return (
    <div
      css={{
        height: '12px',
        width: '100%',
        maxWidth: '30%',
        [theme.mediaQueries.md]: {
          maxWidth: 'initial',
          margin: '12px 0 11px 0',
        },
      }}>
      <ProgressBar percentage={percent} color="turquoise" />
    </div>
  );
};
