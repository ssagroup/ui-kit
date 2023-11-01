import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { ExchangeAccount } from './ExchangeAccount';
import { dataValues } from './helpers';

const commonProps = {
  platform: dataValues[0].platform,
  title: dataValues[0].title,
  data: dataValues[0].data,
};

const ResponsivePieMock = () => <div data-testid="responsive-pie"></div>;

jest.mock('@nivo/pie', () => ({
  PieCustomLayerProps: {},
  ResponsivePie: ResponsivePieMock,
}));

describe('ExchangeAccount', () => {
  it('Renders with platform', () => {
    const { getByText } = render(
      <ExchangeAccount
        {...commonProps}
        deleteOnClick={jest.fn()}
        status="Active"
      />,
    );
    getByText(new RegExp('Binance', 'i'));
  });

  it('Renders with title', () => {
    const { getByText } = render(
      <ExchangeAccount
        {...commonProps}
        deleteOnClick={jest.fn()}
        status="Active"
      />,
    );
    getByText(new RegExp('Account Name', 'i'));
  });

  it('Renders with active status label', () => {
    const { getByText } = render(
      <ExchangeAccount
        {...commonProps}
        deleteOnClick={jest.fn()}
        status="Active"
      />,
    );
    getByText(new RegExp('Active', 'i'));
  });

  it('Renders with not available status label', () => {
    const { getByText } = render(
      <ExchangeAccount
        {...commonProps}
        deleteOnClick={jest.fn()}
        status="NotAvailable"
      />,
    );
    getByText(new RegExp('Not available', 'i'));
  });

  it('Renders with BalancePieChart component', () => {
    const { getByTestId } = render(
      <ExchangeAccount
        {...commonProps}
        deleteOnClick={jest.fn()}
        status="Active"
      />,
    );

    getByTestId('responsive-pie');
  });

  it('Clicks on delete button', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const { getByRole } = render(
      <ExchangeAccount
        {...commonProps}
        deleteOnClick={mockOnClick}
        status="Active"
      />,
    );

    const deleteButton = getByRole('button');

    await user.click(deleteButton);
    expect(mockOnClick).toBeCalledTimes(1);
  });

  it('Clicks on card', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
      <ExchangeAccount
        {...commonProps}
        deleteOnClick={jest.fn()}
        onClick={mockOnClick}
        status="Active"
      />,
    );

    await user.click(getByTestId('card'));

    expect(mockOnClick).toBeCalledTimes(1);
  });

  it('Renders with clickable card link', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();
    const { getByRole } = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <ExchangeAccount
                {...commonProps}
                deleteOnClick={jest.fn()}
                link="/link"
                onClick={mockOnClick}
                status="Active"
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const link = getByRole('link');
    await user.click(link);
    expect(link).toHaveAttribute('href', '/link');
  });
});
