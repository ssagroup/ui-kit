import type { Meta, StoryObj } from '@storybook/react';
import { MainColors } from '@ssa-ui-kit/core';

import { ListGoals } from './ListGoals';

export default {
  title: 'Widgets/ListGoals',
  component: ListGoals,
} as Meta<typeof ListGoals>;

export const Default: StoryObj<typeof ListGoals> = () => {
  const goals = [
    {
      id: 'lifting_weights',
      image:
        'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fdumbbell%2Fdumbbell_42.png?alt=media&token=06312895-4372-47b0-a5fa-4a64726a6215',
      title: 'Lifting weights',
      details: 'Goal 25 kg | 20 kg',
      completion: 79,
      color: 'yellow' as keyof MainColors,
    },
    {
      id: 'running',
      image:
        'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Ftreadmill%2Ftreadmill_42.png?alt=media&token=151f51bb-a6ba-4f4a-9d51-57a6784c767b',
      title: 'Running',
      details: 'Goal 25 km | 19,7 km',
      completion: 79,
      color: 'pink' as keyof MainColors,
    },
    {
      id: 'sleeping',
      image:
        'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fmoon%2Fmoon_42.png?alt=media&token=b279625d-091d-4dc2-9f0f-e670e1072174',
      title: 'Sleeping',
      details: 'Goal 8 hrs | 6 hrs',
      completion: 60,
      color: 'blue' as keyof MainColors,
    },
    {
      id: 'weight_loss',
      image:
        'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fscales%2Fscales_42.png?alt=media&token=4f4c198b-7120-4e2f-a4b4-5602243eb732',
      title: 'Weight Loss',
      details: 'Goal 10 kg | 4 kg',
      completion: 40,
      color: 'purple' as keyof MainColors,
    },
  ];

  return (
    <div style={{ background: '#f1f1f1', padding: 20 }}>
      <ListGoals goals={goals} />
    </div>
  );
};

Default.storyName = 'ListGoals';
