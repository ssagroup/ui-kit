import { MemoryRouter, Route, Routes } from 'react-router-dom';

import userEvent from '@testing-library/user-event';

import { ExchangeAccount } from './ExchangeAccount';
import { dataValues } from './helpers';

const commonProps = {
  platform: dataValues[0].platform,
  title: dataValues[0].title,
  data: dataValues[0].data,
  status: dataValues[0].status,
  onDelete: jest.fn(),
};

describe('ExchangeAccount', () => {
  it('Renders with platform', () => {
    const { getByText } = render(<ExchangeAccount {...commonProps} />);
    getByText(new RegExp('Binance', 'i'));
  });

  it('Renders with title', () => {
    const { getByText } = render(<ExchangeAccount {...commonProps} />);
    getByText(new RegExp('Account Name', 'i'));
  });

  it('Renders with active status label', () => {
    const { getByText } = render(<ExchangeAccount {...commonProps} />);
    getByText(new RegExp('Active', 'i'));
  });

  it('Renders with not available status label', () => {
    const { getByText } = render(
      <ExchangeAccount {...commonProps} status="NotAvailable" />,
    );
    getByText(new RegExp('Not available', 'i'));
  });

  it('Renders with BalancePieChart component', () => {
    const { container } = render(<ExchangeAccount {...commonProps} />);

    const pieChartWrapper = container.querySelector('.pie-chart-wrapper');
    expect(pieChartWrapper).toBeInTheDocument();
  });

  it('Clicks on delete button', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const { getByRole } = render(
      <ExchangeAccount {...commonProps} onDelete={mockOnClick} />,
    );

    const deleteButton = getByRole('button', { name: 'Bin' });

    await user.click(deleteButton);
    expect(mockOnClick).toBeCalledTimes(1);
  });

  it('Clicks on card', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const mockOnDelete = jest.fn();
    const { getByTestId } = render(
      <ExchangeAccount
        {...commonProps}
        onClick={mockOnClick}
        onDelete={mockOnDelete}
      />,
    );

    await user.click(getByTestId('card'));

    expect(mockOnClick).toBeCalledTimes(1);
    expect(mockOnDelete).toBeCalledTimes(0);
  });

  it('Renders with clickable card link', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const mockOnDelete = jest.fn();
    const { getByRole } = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <ExchangeAccount
                {...commonProps}
                link="/link"
                onClick={mockOnClick}
                onDelete={mockOnDelete}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const link = getByRole('link');
    await user.click(link);

    expect(link).toHaveAttribute('href', '/link');
    expect(mockOnClick).toBeCalledTimes(1);
    expect(mockOnDelete).toBeCalledTimes(0);
  });
});
