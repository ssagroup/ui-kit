import { fireEvent, screen, waitFor } from '../../../customTest';
import UpcomingWorkouts from './index';

describe('UpcomingWorkouts', () => {
  it('Render component', async () => {
    const mockClick = jest.fn();

    render(
      <UpcomingWorkouts
        workouts={[
          {
            id: 'cardio_training',
            image: '/img/mat/mat_42.png',
            title: 'HIIT Cardio training',
            workoutTime: '8:00 AM',
            handleClick: mockClick,
            details: {
              exercises: 40,
              minutes: 20,
            },
          },
          {
            id: 'other_training',
            image: '/img/mat/mat_42.png',
            title: 'Other training',
            workoutTime: '8:00 AM',
            handleClick: mockClick,
            details: {
              exercises: 40,
              minutes: 20,
            },
          },
        ]}
      />,
    );

    await waitFor(async () => {
      const list = await screen.findAllByRole('listitem');
      const itemA = await screen.findByText('HIIT Cardio training');
      const itemB = await screen.findByText('Other training');

      expect(list.length).toBe(2);
      expect(itemA).toBeInTheDocument();
      expect(itemB).toBeInTheDocument();

      const btn = screen.queryAllByRole('button')[0];

      await fireEvent.click(btn);

      expect(mockClick).toHaveBeenCalled();
      expect(mockClick).toHaveBeenCalledTimes(1);
    });
  });
});
