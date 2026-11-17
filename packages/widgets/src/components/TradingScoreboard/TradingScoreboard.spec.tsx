import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Button } from '@ssa-ui-kit/core';
import TradingScoreboard from './TradingScoreboard';
import { defaultBoardArr, linkBoardArr } from './helpers';

describe('TradingScoreboard', () => {
  it('Renders all items', () => {
    const { getAllByRole } = render(
      <TradingScoreboard
        itemsPerRow={5}
        items={defaultBoardArr}
        onClick={(item) => item}
      />,
    );
    // Query once and check names by index: getByRole({ name }) in a loop
    // recomputes every button's accessible name per item, which is slow
    // enough in jsdom to time out on CI.
    const itemsEls = getAllByRole('button');
    expect(itemsEls.length).toBe(defaultBoardArr.length);

    defaultBoardArr.forEach((item, i) => {
      expect(itemsEls[i]).toHaveAccessibleName(new RegExp(item.title, 'i'));
    });
  });

  it('Renders with Render Prop', () => {
    const { getAllByTestId } = render(
      <TradingScoreboard
        itemsPerRow={5}
        items={defaultBoardArr}
        renderCard={(item) => (
          <Button data-testid="trading-board">
            <span>
              {item.value} {item.unit}
            </span>
            <span>{item.title}</span>
          </Button>
        )}
      />,
    );
    const itemsEls = getAllByTestId('trading-board');
    expect(itemsEls.length).toBe(defaultBoardArr.length);

    for (let i = 0; i < itemsEls.length; i++) {
      expect(itemsEls[i]).toHaveTextContent(defaultBoardArr[i].title);
    }
  });

  it('Calls onClick handlers when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    const { getAllByRole } = render(
      <TradingScoreboard
        itemsPerRow={5}
        items={defaultBoardArr}
        onClick={mockOnClick}
      />,
    );

    const itemsEls = getAllByRole('button');
    for (let i = 0; i < defaultBoardArr.length; i++) {
      expect(itemsEls[i]).toHaveAccessibleName(
        new RegExp(defaultBoardArr[i].title, 'i'),
      );
      await user.click(itemsEls[i]);
      expect(mockOnClick).toHaveBeenCalledWith(defaultBoardArr[i]);
    }

    expect(mockOnClick).toBeCalledTimes(defaultBoardArr.length);
  });

  it('Renders with link prop', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/*"
            element={<TradingScoreboard itemsPerRow={5} items={linkBoardArr} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    const linkEls = getAllByRole('link');
    linkBoardArr.forEach((item, i) => {
      expect(linkEls[i]).toHaveAccessibleName(new RegExp(item.title, 'i'));
    });
  });

  it('Calls onClick handlers with render prop when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    const { getAllByTestId } = render(
      <TradingScoreboard
        itemsPerRow={5}
        items={defaultBoardArr}
        onClick={mockOnClick}
        renderCard={(item, onClick) => (
          <Button data-testid="trading-board" onClick={() => onClick?.(item)}>
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

    const itemsEls = getAllByTestId('trading-board');
    expect(itemsEls.length).toBe(defaultBoardArr.length);

    for (let i = 0; i < itemsEls.length; i++) {
      await user.click(itemsEls[i]);
      expect(mockOnClick).toHaveBeenCalledWith(defaultBoardArr[i]);
    }

    expect(mockOnClick).toBeCalledTimes(defaultBoardArr.length);
  });
});
