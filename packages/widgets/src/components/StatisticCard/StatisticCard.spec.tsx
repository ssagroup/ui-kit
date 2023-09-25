import userEvent from '@testing-library/user-event';
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
    expect(screen.queryByTestId('unit')).toBeNull();
    screen.getByText('400');
    screen.getByText('Title');
  });

  it('Show Tooltip on hover and non integer value', async () => {
    const user = userEvent.setup();
    const { getByTestId, queryByTestId } = render(
      <StatisticCard value={'400.500'} title={'Title'} />,
    );

    const hoverEl = getByTestId('hover-element');

    await user.hover(hoverEl);
    queryByTestId('floating-arrow');

    await user.unhover(hoverEl);
    expect(queryByTestId('floating-arrow')).not.toBeInTheDocument();
  });

  it('Click on StatisticCard', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    const { getByRole } = render(
      <StatisticCard value={'400.500'} title={'Title'} onClick={mockOnClick} />,
    );

    const button = getByRole('button');

    await user.click(button);

    expect(mockOnClick).toBeCalledTimes(1);
  });
});
