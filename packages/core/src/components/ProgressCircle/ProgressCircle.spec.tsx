import theme from '@themes/main';

import { screen } from '../../../customTest';

import ProgressCircle from './index';

describe('ProgressCircle', () => {
  it('Render ProgressCircle', () => {
    render(<ProgressCircle max={100} currentValue={50} />);

    const ProgressBar = screen.getByRole('progressbar');
    const svg = ProgressBar.querySelectorAll(
      'svg',
    )[0] as unknown as HTMLElement;

    const [colorInit, colorEnd] = svg.querySelectorAll('stop');

    expect(colorInit).toHaveAttribute('stop-color', theme.colors.green);
    expect(colorEnd).toHaveAttribute('stop-color', theme.colors.greenLighter);
    expect(svg).toHaveAttribute('viewBox', '0 0 160 160');
  });

  it('Render ProgressCircle smaller', () => {
    render(<ProgressCircle max={100} currentValue={50} size={100} />);

    const ProgressBar = screen.getByRole('progressbar');
    const svg = ProgressBar.querySelectorAll(
      'svg',
    )[0] as unknown as HTMLElement;

    const [colorInit, colorEnd] = svg.querySelectorAll('stop');

    expect(colorInit).toHaveAttribute('stop-color', theme.colors.green);
    expect(colorEnd).toHaveAttribute('stop-color', theme.colors.greenLighter);
    expect(svg).toHaveAttribute('viewBox', '0 0 100 100');
  });
});
