import { screen } from '../../../customTest';
import StatisticCard from './StatisticCard';

describe('StatisticCard', () => {
  it('Render component', () => {
    render(<StatisticCard value={'400'} unit={'%'} title={'Title'} />);

    screen.getByText('400');
    screen.getByText('%');
    screen.getByText('Title');
  });

  it('Render component with integer value', () => {
    render(<StatisticCard value={400.4} title={'Title'} />);

    screen.getByText('400');
  });

  it('Render component without unit', () => {
    render(<StatisticCard value={'400'} title={'Title'} />);

    expect(screen.queryByText('USD')).toBeNull();
    screen.getByText('400');
    screen.getByText('Title');
  });
});
