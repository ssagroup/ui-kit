import type { Meta, StoryObj } from '@storybook/react';

import { Card, CardContent, Typography } from '@ssa-ui-kit/core';

import { CardList } from './CardList';

export default {
  title: 'Widgets/CardList',
  component: CardList,
} as Meta<typeof CardList>;

export const Default: StoryObj<typeof CardList> = () => {
  return (
    <CardList
      title="List of cards"
      items={[
        {
          id: 'cardio_training',
          title: 'HIIT Cardio training',
        },
        {
          id: 'other_training',
          title: 'Other cardio training',
        },
      ]}
      renderItem={(item) => (
        <Card>
          <CardContent>
            <Typography variant="body1">{item.title}</Typography>
          </CardContent>
        </Card>
      )}
    />
  );
};

Default.storyName = 'CardList';
