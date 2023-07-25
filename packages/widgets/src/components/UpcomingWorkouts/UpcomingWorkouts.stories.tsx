import type { Meta, StoryObj } from '@storybook/react';

import { UpcomingWorkouts } from './UpcomingWorkouts';

export default {
  title: 'Widgets/UpcomingWorkouts',
  component: UpcomingWorkouts,
} as Meta<typeof UpcomingWorkouts>;

export const Default: StoryObj<typeof UpcomingWorkouts> = () => {
  return (
    <div style={{ background: '#f1f1f1', padding: 20 }}>
      <UpcomingWorkouts
        workouts={[
          {
            id: 'cardio_training',
            image: '/img/mat/mat_42.png',
            title: 'HIIT Cardio training',
            workoutTime: '8:00 AM',
            details: {
              exercises: 40,
              minutes: 20,
            },
          },
        ]}
      />
    </div>
  );
};

Default.storyName = 'UpcomingWorkouts';
