import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '../../../customTest';

import { Icon } from '@ssa-ui-kit/core';
import TradingInfoCard from './TradingInfoCard';

describe('TradingInfoCard', () => {
  it('Renders with value and title', () => {
    render(<TradingInfoCard value={'400'} unit={'%'} title={'Title'} />);

    screen.getByText('400');
    screen.getByText('Title');
  });

  it('Renders with value, title, and unit', () => {
    render(<TradingInfoCard value={'400'} unit={'%'} title={'Title'} />);

    screen.getByText('400');
    screen.getByText('%');
    screen.getByText('Title');
  });

  it('Renders with value, title, unit, and icon', async () => {
    render(
      <TradingInfoCard
        value={'400'}
        unit={'%'}
        title={'Title'}
        icon={<Icon name="arrow-up" color="#2CA24D" size={16} />}
      />,
    );

    screen.getByText('400');
    screen.getByText('%');
    screen.getByText('Title');

    await screen.findByTitle(/Arrow Up/i);
  });

  it('Renders with an integer value (no tooltip)', async () => {
    const { queryByTestId } = render(
      <TradingInfoCard value={400} title={'Title'} />,
    );

    screen.getByText('400');
    await waitFor(() =>
      expect(queryByTestId('floating-arrow')).not.toBeInTheDocument(),
    );
  });

  it('Renders with a non-numeric value (no tooltip)', async () => {
    const { queryByTestId } = render(
      <TradingInfoCard value={'Test'} title={'Title'} />,
    );

    screen.getByText('Test');
    await waitFor(() =>
      expect(queryByTestId('floating-arrow')).not.toBeInTheDocument(),
    );
  });

  it('Renders with a numeric value (tooltip) ', async () => {
    const user = userEvent.setup();
    const { getByTestId, queryByTestId, findByTestId } = render(
      <TradingInfoCard value={400.5} title={'Title'} />,
    );

    const tooltipEl = getByTestId('tooltip-trigger');

    await user.hover(tooltipEl);
    await findByTestId('floating-arrow');

    await user.unhover(tooltipEl);
    await waitFor(() =>
      expect(queryByTestId('floating-arrow')).not.toBeInTheDocument(),
    );
  });

  it('Calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    const { getByRole } = render(
      <TradingInfoCard
        value={'400.500'}
        title={'Title'}
        onClick={mockOnClick}
      />,
    );

    const button = getByRole('button');

    await user.click(button);

    expect(mockOnClick).toBeCalledTimes(1);
    expect(button).toHaveAttribute('tabindex', '0');
  });

  it('Renders with link prop', () => {
    const { getByRole } = render(
      <TradingInfoCard value={'400.500'} title={'Title'} link="/" />,
    );

    expect(getByRole('link')).toHaveAttribute('href', '/');
  });
});
