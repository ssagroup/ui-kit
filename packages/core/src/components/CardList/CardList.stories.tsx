import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Typography from '@components/Typography';
import Card from '@components/Card';
import CardContent from '@components/CardContent';
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
