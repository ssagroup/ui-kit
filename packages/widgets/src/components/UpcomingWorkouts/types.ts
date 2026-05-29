export interface UpcomingWorkoutCardProps {
  image: string;
  title: string;
  workoutTime: string;
  renderDetails: () => React.ReactNode;
  onClick?: () => void;
  /** Shows a border around the avatar. @default false */
  avatarBorder?: boolean;
}

export type Workout = {
  id: string;
  image: string;
  title: string;
  workoutTime: string;
  handleClick?: () => void;
  details: {
    exercises: number;
    minutes: number;
  };
};

export interface UpcomingWorkoutsProps {
  workouts: Array<Workout>;
  /** Shows a border around the avatar in each workout card. @default false */
  avatarBorder?: boolean;
}
