import userEvent from '@testing-library/user-event';
import { screen } from '../../../customTest';
import { MarginInfo } from './MarginInfo';

describe('MarginInfo', () => {
  const defaultProps = {
    base: 'USDT',
    quote: 'BTC',
    baseBorrowed: '100 USDT',
    quoteBorrowed: '0.001 BTC',
    baseTotalInterest: '25 USDT',
    quoteTotalInterest: '0.0024 BTC',
  };

  it('Renders with default title', () => {
    render(<MarginInfo {...defaultProps} />);

    expect(
      screen.getByRole('heading', { name: 'Margin Info' }),
    ).toBeInTheDocument();
  });

  it('Renders with custom title', () => {
    render(<MarginInfo {...defaultProps} title="Custom Title" />);

    expect(
      screen.getByRole('heading', { name: 'Custom Title' }),
    ).toBeInTheDocument();
  });

  it('Renders all table data', () => {
    render(
      <MarginInfo
        {...defaultProps}
        baseInterestRate="5.2%"
        quoteInterestRate="4.8%"
        showInterestRate={true}
      />,
    );

    expect(screen.getByText('USDT')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();

    expect(screen.getByText('Borrowed')).toBeInTheDocument();
    expect(screen.getByText('100 USDT')).toBeInTheDocument();
    expect(screen.getByText('0.001 BTC')).toBeInTheDocument();

    expect(screen.getByText('Interest Rate')).toBeInTheDocument();
    expect(screen.getByText('5.2%')).toBeInTheDocument();
    expect(screen.getByText('4.8%')).toBeInTheDocument();

    expect(screen.getByText('Total Interest')).toBeInTheDocument();
    expect(screen.getByText('25 USDT')).toBeInTheDocument();
    expect(screen.getByText('0.0024 BTC')).toBeInTheDocument();
  });

  it('Renders custom row labels when provided', () => {
    render(
      <MarginInfo
        {...defaultProps}
        borrowedLabel="Total Borrowed"
        interestRateLabel="APR"
        totalInterestLabel="Accumulated Interest"
        baseInterestRate="5.2%"
        quoteInterestRate="4.8%"
      />,
    );

    expect(screen.getByText('Total Borrowed')).toBeInTheDocument();
    expect(screen.getByText('APR')).toBeInTheDocument();
    expect(screen.getByText('Accumulated Interest')).toBeInTheDocument();
  });

  it('Does not render interest rate row when showInterestRate is false', () => {
    render(
      <MarginInfo
        {...defaultProps}
        baseInterestRate="5.2%"
        quoteInterestRate="4.8%"
        showInterestRate={false}
      />,
    );

    expect(screen.queryByText('Interest Rate')).not.toBeInTheDocument();
    expect(screen.queryByText('5.2%')).not.toBeInTheDocument();
    expect(screen.queryByText('4.8%')).not.toBeInTheDocument();
  });

  it('Both buttons are clickable', async () => {
    const user = userEvent.setup();
    const mockOnBorrow = jest.fn();
    const mockOnRepay = jest.fn();

    render(
      <MarginInfo
        {...defaultProps}
        onBorrow={mockOnBorrow}
        onRepay={mockOnRepay}
      />,
    );

    const borrowButton = screen.getByRole('button', { name: 'Borrow' });
    const repayButton = screen.getByRole('button', { name: 'Repay' });

    await user.click(borrowButton);
    await user.click(repayButton);

    expect(mockOnBorrow).toHaveBeenCalledTimes(1);
    expect(mockOnRepay).toHaveBeenCalledTimes(1);
  });

  it('Both buttons are disabled', () => {
    render(
      <MarginInfo {...defaultProps} disableBorrow={true} disableRepay={true} />,
    );

    const borrowButton = screen.getByRole('button', { name: 'Borrow' });
    const repayButton = screen.getByRole('button', { name: 'Repay' });

    expect(borrowButton).toBeDisabled();
    expect(repayButton).toBeDisabled();
  });

  it('Renders with ReactNode values', () => {
    render(
      <MarginInfo
        base="USDT"
        quote="BTC"
        baseBorrowed={
          <>
            100 <strong>USD</strong>
          </>
        }
        quoteBorrowed={
          <>
            ≈0.000000001 <strong>BTC</strong>
          </>
        }
        baseTotalInterest={
          <>
            25 <strong>USDT</strong>
          </>
        }
        quoteTotalInterest={
          <>
            0.0024 <strong>BTC</strong>
          </>
        }
        baseInterestRate="5.2%"
        quoteInterestRate="4.8%"
      />,
    );

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('≈0.000000001')).toBeInTheDocument();
    expect(screen.getAllByText('BTC').length).toBeGreaterThan(0);
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getAllByText('USDT').length).toBeGreaterThan(0);
    expect(screen.getByText('0.0024')).toBeInTheDocument();
  });
});
