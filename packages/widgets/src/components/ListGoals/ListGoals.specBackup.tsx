import type { MainColors } from '@ssa-ui-kit/core';
import { screen } from '../../../customTest';

import ListGoals from './index';

describe('ListGoals', () => {
  it('Render component', async () => {
    render(
      <ListGoals
        goals={[
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
        ]}
      />,
    );

    const list = await screen.findAllByRole('listitem');
    const itemA = await screen.findByText('Lifting weights');
    const itemB = await screen.findByText('Running');

    expect(list.length).toBe(2);
    expect(itemA).toBeInTheDocument();
    expect(itemB).toBeInTheDocument();
  });

  it('Render using default props values', async () => {
    const mockData = [
      {
        id: 'lifting_weights',
        image:
          'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fdumbbell%2Fdumbbell_42.png?alt=media&token=06312895-4372-47b0-a5fa-4a64726a6215',
        title: 'Lifting weights',
        details: 'Goal 25 kg | 20 kg',
      },
      {
        id: 'running',
        image:
          'https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Ftreadmill%2Ftreadmill_42.png?alt=media&token=151f51bb-a6ba-4f4a-9d51-57a6784c767b',
        title: 'Running',
        details: 'Goal 25 km | 19,7 km',
      },
    ];

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<ListGoals goals={mockData} />);

    const list = await screen.findAllByRole('listitem');
    const itemA = await screen.findByText('Lifting weights');
    const itemB = await screen.findByText('Running');

    expect(list.length).toBe(2);
    expect(itemA).toBeInTheDocument();
    expect(itemB).toBeInTheDocument();
  });

  it('should not render a list if no data', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<ListGoals goals={null} />);

    const list = await screen.queryAllByRole('listitem');

    expect(list.length).toBe(0);
  });
});
