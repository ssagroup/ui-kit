import { screen, waitFor } from '../../../customTest';

import Activity from './index';
import { ActivityResp } from './types';

const data = {
  walking: [
    {
      activity: 'walking',
      date: '2023-04-16T23:00:00.000Z',
      day: 'Sun',
      max: 100,
      currentValue: 50,
    },
    {
      activity: 'walking',
      date: '2023-04-16T23:00:00.000Z',
      day: 'Mon',
      max: 100,
      currentValue: 50,
    },
    {
      activity: 'walking',
      date: '2023-04-16T23:00:00.000Z',
      day: 'Tue',
      max: 100,
      currentValue: 50,
    },
    {
      activity: 'walking',
      date: '2023-04-16T23:00:00.000Z',
      day: 'Wed',
      max: 100,
      currentValue: 50,
    },
    {
      activity: 'walking',
      date: '2023-04-16T23:00:00.000Z',
      day: 'Thu',
      max: 100,
      currentValue: 50,
    },
    {
      activity: 'walking',
      date: '2023-04-16T23:00:00.000Z',
      day: 'Fri',
      max: 100,
      currentValue: 50,
    },
    {
      activity: 'walking',
      date: '2023-04-16T23:00:00.000Z',
      day: 'Sat',
      max: 100,
      currentValue: 50,
    },
  ],
} as ActivityResp;

describe('Activity', () => {
  it('Render Activity', async () => {
    render(<Activity data={data} />);

    await waitFor(async () => {
      const progressBar = await screen.findAllByRole('progressbar');
      expect(progressBar).toHaveLength(7);
    });
  });

  it("don't render if not data or wrong typeof data", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<Activity data={'data'} />);

    await waitFor(() => {
      expect(screen.queryAllByRole('progressbar')).toHaveLength(0);
    });
  });
});
