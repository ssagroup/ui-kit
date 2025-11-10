import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { fireEvent } from '@testing-library/dom';

import { AccountBalance } from './index';
import { data } from './stories/fixtures';

describe('AccountBalance', () => {
  it('Renders', () => {
    const { getByRole, getByText, container } = render(
      <AccountBalance total="798" currency="USDT" data={data} />,
    );
    const pieChartWrapper = container.querySelector('.pie-chart-wrapper');
    expect(pieChartWrapper).toBeInTheDocument();

    getByRole('heading', { name: 'Balance' });
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

  // it('Renders with a button', async () => {
  //   const onClick = jest.fn();
  //   const { getByRole } = render(
  //     <AccountBalance
  //       total="798"
  //       currency="USDT"
  //       data={data}
  //       onClick={onClick}
  //     />,
  //   );

  //   const btnEl = getByRole('button');
  //   await fireEvent.click(btnEl);
  //   expect(onClick).toHaveBeenCalledTimes(1);
  // });

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

  it('Renders without value list', () => {
    const { getByText } = render(
      <AccountBalance
        total="798"
        currency="USDT"
        variant="withoutValueList"
        data={[
          {
            id: 'BTC',
            label: 'BTC',
            legendValue: 1,
            value: 871.23,
          },
          {
            id: 'LTC',
            label: 'LTC',
            legendValue: 7,
            value: 530.25,
          },
        ]}
      />,
    );

    getByText('1 BTC');
    getByText('871.23 USDT');
    getByText('7 LTC');
    getByText('530.25 USDT');
  });
});
