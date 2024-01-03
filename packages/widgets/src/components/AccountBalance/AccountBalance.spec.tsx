import { fireEvent } from '@testing-library/dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { data } from './stories/fixtures';
import { AccountBalance } from './index';

const ResponsivePieMock = () => <div data-testid="responsive-pie"></div>;

jest.mock('@nivo/pie', () => ({
  PieCustomLayerProps: {},
  ResponsivePie: ResponsivePieMock,
}));

describe('AccountBalance', () => {
  it('Renders', () => {
    const { getByRole, getByText, getByTestId } = render(
      <AccountBalance total="798" currency="USDT" data={data} />,
    );

    getByRole('heading', { name: 'Balance' });
    getByTestId('responsive-pie');
    getByText('798');
    getByText('USDT');

    for (const { label, legendValue } of data) {
      getByRole('heading', { name: label });
      getByRole('heading', {
        name: `${legendValue} ${label === 'Other' ? 'USDT' : label}`,
      });
    }
  });

  it('Renders with a custom title', () => {
    const { getByRole } = render(
      <AccountBalance total="798" currency="USDT" data={data} title="PNL" />,
    );

    getByRole('heading', { name: 'PNL' });
  });

  it('Renders with a button', async () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <AccountBalance
        total="798"
        currency="USDT"
        data={data}
        onClick={onClick}
      />,
    );

    const btnEl = getByRole('button');
    await fireEvent.click(btnEl);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Renders with a link', async () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/*"
            element={
              <AccountBalance
                total="798"
                currency="USDT"
                data={data}
                onClick={onClick}
                link="/balance"
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    const linkEl = getByRole('link');
    expect(linkEl).toHaveAttribute('href', '/balance');
    await fireEvent.click(linkEl);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('Renders with a custom values', () => {
    const { getByText } = render(
      <AccountBalance
        total="798"
        currency="USDT"
        data={[
          {
            id: 'BTC',
            label: 'BTC',
            legendValue: 1,
            value: 871.23,
            customLegendItem: <span>5,244.37 USD</span>,
          },
          {
            id: 'LTC',
            label: 'LTC',
            legendValue: 7,
            value: 530.25,
            customLegendItem: <span>4,243.37 USD</span>,
          },
        ]}
      />,
    );

    getByText('4,244.37 USD');
    getByText('5,243.37 USD');
  });
});
