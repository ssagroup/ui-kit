import ProgressBar from '@components/ProgressBar';
import ProgressLegend from '@components/ProgressLegend';
import ProgressLegendItem from '@components/ProgressLegendItem';
import ProgressVertical from '@components/ProgressVertical';
import theme from '@themes/main';

import { screen, within } from '../../../customTest';

import Progress from './index';

describe('Progress', () => {
  it('Render Progress horizontal', () => {
    render(
      <Progress>
        <ProgressBar percentage={50} color={'green'} />
      </Progress>,
    );

    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toHaveStyle(`background-color: ${theme.colors.green}`);
    expect(progressBar).toHaveStyle('width: 50%');
  });

  it('Render Progress with legend in the correct order', async () => {
    render(
      <Progress>
        <ProgressLegend>
          <ProgressLegendItem position="start" percentage={0}>
            0%
          </ProgressLegendItem>
          <ProgressLegendItem position="current" percentage={45}>
            45%
          </ProgressLegendItem>
          <ProgressLegendItem position="end" percentage={100}>
            100%
          </ProgressLegendItem>
        </ProgressLegend>
        <ProgressBar percentage={50} color={'green'} />
      </Progress>,
    );

    const progressBar = screen.getByRole('progressbar');
    const [item1, item2, item3] = await screen.queryAllByText(/%/i);

    await within(item1).findByText(/0%/i);
    await within(item2).findByText(/45%/i);
    await within(item3).findByText(/100%/i);

    expect(progressBar).toHaveStyle(`background-color: ${theme.colors.green}`);
    expect(progressBar).toHaveStyle('width: 50%');
  });

  it('Render ProgressBar with different color', () => {
    render(
      <Progress>
        <ProgressBar percentage={50} color={'blue'} />
      </Progress>,
    );

    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toHaveStyle(`background-color: ${theme.colors.blue}`);
    expect(progressBar).toHaveStyle('width: 50%');
  });

  it('Render ProgressVertical with legend', async () => {
    render(
      <ProgressVertical>
        <ProgressBar percentage={50} color={'green'} />
        <ProgressLegend>
          <ProgressLegendItem percentage={60}>60%</ProgressLegendItem>
        </ProgressLegend>
      </ProgressVertical>,
    );

    const progressBar = screen.getByRole('progressbar');

    await screen.findByText(/60%/i);

    expect(progressBar).toHaveStyle(`background-color: ${theme.colors.green}`);
    expect(progressBar).toHaveStyle('height: 50%');
  });
});
