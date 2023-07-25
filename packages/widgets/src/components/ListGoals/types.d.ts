type Goal = {
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

type ProgressProps = Partial<React.ComponentProps<typeof ProgressCircle>>;

export interface IItemCardProps {
  image: string;
  title: string;
  details: string;
  progressProps: ProgressProps;
}
