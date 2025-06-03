import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { UpcomingWorkouts } from './UpcomingWorkouts';

export default {
  title: 'Fitness/UpcomingWorkouts',
  component: UpcomingWorkouts,
} as Meta<typeof UpcomingWorkouts>;

export const Default: StoryObj<typeof UpcomingWorkouts> = () => {
  return (
    <div style={{ background: '#f1f1f1', padding: 20 }}>
      <UpcomingWorkouts
        workouts={[
          {
            id: 'cardio_training',
            image:
              'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fmat%2Fmat_42.png?alt=media&token=462a4e3c-4e57-4f76-aad3-97b72c75b4ff',
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
