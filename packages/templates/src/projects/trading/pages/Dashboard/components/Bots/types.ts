import { Theme } from '@emotion/react';
import { ProgressCircle } from '@ssa-ui-kit/core';

export type BotsProps = {
  all: number;
  running: number;
};

export type BotsCountProps = Pick<
  React.ComponentProps<typeof ProgressCircle>,
  'max' | 'currentValue' | 'infoContent'
>;

export type AllBotsBlockProps = { theme: Theme } & Pick<BotsProps, 'all'>;

export type BotsCountContentProps = Pick<BotsProps, 'running'>;
