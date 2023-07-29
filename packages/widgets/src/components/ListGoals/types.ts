import { MainColors, ProgressCircle } from '@ssa-ui-kit/core';

export type Goal = {
  id: string;
  image: string;
  title: string;
  details: string;
  completion: number;
  color: keyof MainColors;
};

export interface IListGoalsProps {
  goals: Array<Goal>;
}

export type ProgressProps = Partial<
  React.ComponentProps<typeof ProgressCircle>
>;

export interface IItemCardProps {
  image: string;
  title: string;
  details: string;
  progressProps: ProgressProps;
}
