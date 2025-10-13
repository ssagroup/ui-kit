import { Fragment } from 'react';

import { CardList } from '@ssa-ui-kit/core';

import { UpcomingWorkoutsProps } from './types';
import { UpcomingWorkoutCard } from './UpcomingWorkoutCard';

export const UpcomingWorkouts = ({ workouts }: UpcomingWorkoutsProps) => (
  <CardList
    title="Upcoming Workout"
    items={workouts}
    renderItem={(workout) => (
      <UpcomingWorkoutCard
        image={workout.image}
        title={workout.title}
        workoutTime={workout.workoutTime}
        onClick={workout.handleClick}
        renderDetails={() => (
          <Fragment>
            <strong>{workout.details.exercises}</strong> Exercises |{' '}
            <strong>{workout.details.minutes}</strong> mins
          </Fragment>
        )}
      />
    )}></CardList>
);
