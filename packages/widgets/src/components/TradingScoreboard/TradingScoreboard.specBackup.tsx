import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Button } from '@ssa-ui-kit/core';
import TradingScoreboard from './TradingScoreboard';
import { defaultBoardArr, linkBoardArr } from './helpers';

describe('TradingScoreboard', () => {
  it('Renders all items', () => {
    const { getAllByRole, getByRole } = render(
      <TradingScoreboard
        itemsPerRow={5}
        items={defaultBoardArr}
        onClick={(item) => item}
      />,
    );
    const itemsEls = getAllByRole('button');
    expect(itemsEls.length).toBe(defaultBoardArr.length);

    for (const item of defaultBoardArr) {
      getByRole('button', { name: new RegExp(item.title, 'i') });
    }
  });

  it('Renders with Render Prop', () => {
    const { getAllByTestId } = render(
      <TradingScoreboard
        itemsPerRow={5}
        items={defaultBoardArr}
        renderCard={(item) => (
          <Button data-testid="fintech-board">
            <span>
              {item.value} {item.unit}
            </span>
            <span>{item.title}</span>
          </Button>
        )}
      />,
    );
    const itemsEls = getAllByTestId('fintech-board');
    expect(itemsEls.length).toBe(defaultBoardArr.length);

    for (let i = 0; i < itemsEls.length; i++) {
      expect(itemsEls[i]).toHaveTextContent(defaultBoardArr[i].title);
    }
  });

  it('Calls onClick handlers when clicked', async () => {
    const user = userEvent.setup();
    const mockOnClick = jest.fn();

    const { getByRole } = render(
      <TradingScoreboard
        itemsPerRow={5}
        items={defaultBoardArr}
        onClick={mockOnClick}
      />,
    );

    for (const item of defaultBoardArr) {
      const buttonEl = getByRole('button', {
        name: new RegExp(item.title, 'i'),
      });
      await user.click(buttonEl);
      expect(mockOnClick).toHaveBeenCalledWith(item);
    }

    expect(mockOnClick).toBeCalledTimes(defaultBoardArr.length);
  });

  it('Renders with link prop', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/*"
            element={<TradingScoreboard itemsPerRow={5} items={linkBoardArr} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    for (const item of linkBoardArr) {
      getByRole('link', { name: new RegExp(item.title, 'i') });
    }
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
          <Button data-testid="fintech-board" onClick={() => onClick?.(item)}>
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

    const itemsEls = getAllByTestId('fintech-board');
    expect(itemsEls.length).toBe(defaultBoardArr.length);

    for (let i = 0; i < itemsEls.length; i++) {
      await user.click(itemsEls[i]);
      expect(mockOnClick).toHaveBeenCalledWith(defaultBoardArr[i]);
    }

    expect(mockOnClick).toBeCalledTimes(defaultBoardArr.length);
  });
});
