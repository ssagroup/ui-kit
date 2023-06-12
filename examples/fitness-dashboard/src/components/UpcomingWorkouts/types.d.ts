export interface IUpcomingWorkoutCardProps {
  image: string;
  title: string;
  workoutTime: string;
  renderDetails: () => React.ReactNode;
  onClick?: () => void;
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

export interface IUpcomingWorkoutsProps {
  workouts: Array<Workout>;
}
