import { MainColors, ProgressCircle } from '@ssa-ui-kit/core';

export type Goal = {
  id: string;
  image: string;
  title: string;
  details: string;
  completion: number;
  color: keyof MainColors;
};

export interface ListGoalsProps {
  goals: Array<Goal>;
  /** Shows a border around the avatar in each goal card. @default false */
  avatarBorder?: boolean;
}

export type ProgressProps = Partial<
  React.ComponentProps<typeof ProgressCircle>
>;

export interface ItemCardProps {
  image: string;
  title: string;
  details: string;
  progressProps: ProgressProps;
  /** Shows a border around the avatar. @default false */
  avatarBorder?: boolean;
}
