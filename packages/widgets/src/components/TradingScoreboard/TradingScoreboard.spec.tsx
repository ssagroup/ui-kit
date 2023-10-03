import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Button, Icon } from '@ssa-ui-kit/core';
import TradingScoreboard from './TradingScoreboard';
import userEvent from '@testing-library/user-event';

const itemsArr = [
  {
    value: 'Binance',
    title: 'Exchange',
  },
  {
    value: 'Account name',
    title: 'Account',
  },
  {
    value: 'Grid v7',
    title: 'Strategy',
  },
  {
    value: 'ETH/USDT',
    title: 'Pairs',
  },
  {
    value: '25',
    title: 'Orders',
  },
  {
    value: '27.07.23',
    unit: '4:22:23 pm',
    title: 'Start Date',
  },
  {
    value: '30.07.23',
    unit: '4:22:23 pm',
    title: 'End date',
  },
  {
    value: '4d 5h 36m 2s',
    title: 'Launch duration',
  },
  {
    value: '25',
    unit: '%',
    title: 'ROI',
    icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
  },
  {
    value: '340.025',
    unit: 'USD',
    title: 'PNL',
    icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
  },
];

const linkItemsArr = [
  {
    value: 'Binance',
    title: 'Exchange',
    link: '/Exchange',
  },
  {
    value: 'Account name',
    title: 'Account',
    link: '/Account',
  },
  {
    value: 'Grid v7',
    title: 'Strategy',
    link: '/Strategy',
  },
];

describe('TradingScoreboard', () => {
  it('Renders all items', () => {
    const { getAllByRole, getByRole } = render(
      <TradingScoreboard
        itemsPerRow={5}
        items={itemsArr}
        onClick={(item) => item}
      />,
    );
    const itemsEls = getAllByRole('button');
    expect(itemsEls.length).toBe(itemsArr.length);

    for (const item of itemsArr) {
      getByRole('button', { name: new RegExp(item.title, 'i') });
    }
  });

  it('Renders with Render Prop', () => {
    const { getByRole } = render(
      <TradingScoreboard
        itemsPerRow={5}
        items={itemsArr}
        renderCard={(item) => (
          <Button>
            <span>
              {item.value} {item.unit}
            </span>
            <span>{item.title}</span>
          </Button>
        )}
      />,
    );

    for (const item of itemsArr) {
      getByRole('button', { name: new RegExp(item.title, 'i') });
    }
  });

  it('Calls onClick handlers when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    const { getByRole } = render(
      <TradingScoreboard
        itemsPerRow={5}
        items={itemsArr}
        onClick={mockOnClick}
      />,
    );

    for (const item of itemsArr) {
      const buttonEl = getByRole('button', {
        name: new RegExp(item.title, 'i'),
      });
      await user.click(buttonEl);
      expect(mockOnClick).toHaveBeenCalledWith(item);
    }

    expect(mockOnClick).toBeCalledTimes(itemsArr.length);
  });

  it('Renders with link prop', () => {
    const { getByRole } = render(
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<TradingScoreboard itemsPerRow={5} items={linkItemsArr} />}
          />
        </Routes>
      </BrowserRouter>,
    );

    for (const item of linkItemsArr) {
      getByRole('link', { name: new RegExp(item.title, 'i') });
    }
  });

  it('Calls onClick handlers with render prop when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    const { getByRole } = render(
      <TradingScoreboard
        itemsPerRow={5}
        items={itemsArr}
        onClick={mockOnClick}
        renderCard={(item, onClick) => (
          <Button onClick={() => onClick?.(item)}>
            <span>
              {item.value} {item.unit}
            </span>
            <span>
              {item.title} {item.icon}
            </span>
          </Button>
        )}
      />,
    );

    for (const item of itemsArr) {
      const buttonEl = getByRole('button', {
        name: new RegExp(item.title, 'i'),
      });
      await user.click(buttonEl);
      expect(mockOnClick).toHaveBeenCalledWith(item);
    }

    expect(mockOnClick).toBeCalledTimes(itemsArr.length);
  });
});
