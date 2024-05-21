import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';
import { Button } from '@ssa-ui-kit/core';
import TradingScoreboard from './TradingScoreboard';
import { TradingScoreboardProps } from './types';
import { defaultBoardArr, linkBoardArr, oneLineBoardArr } from './helpers';

export default {
  title: 'Widgets/TradingScoreboard',
  component: TradingScoreboard,
} as Meta<typeof TradingScoreboard>;

export const Default: StoryObj<typeof TradingScoreboard> = (
  args: TradingScoreboardProps,
) => {
  return (
    <TradingScoreboard
      items={args.items}
      itemsPerRow={args.itemsPerRow}
      onClick={() => alert('clicked!')}
      css={css`
        gap: 4px;
      `}
    />
  );
};

Default.args = {
  itemsPerRow: 5,
  items: defaultBoardArr,
};

export const OneLine: StoryObj<typeof TradingScoreboard> = (
  args: TradingScoreboardProps,
) => {
  return (
    <TradingScoreboard
      items={args.items}
      itemsPerRow={args.itemsPerRow}
      onClick={() => alert('clicked!')}
      css={css`
        gap: 4px;
      `}
    />
  );
};

OneLine.args = {
  itemsPerRow: 7,
  items: oneLineBoardArr,
};

export const WithCustomComponent: StoryObj<typeof TradingScoreboard> = (
  args: TradingScoreboardProps,
) => {
  return (
    <TradingScoreboard
      items={args.items}
      itemsPerRow={args.itemsPerRow}
      renderCard={(item, onClick) => (
        <Button
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            height: 'auto',
            padding: '10px',
            boxShadow: 'none',
          }}
          variant="secondary"
          onClick={() => onClick?.(item)}>
          <span css={{ fontWeight: '600' }}>
            {item.value} {item.unit}
          </span>
          <span>{item.title}</span>
        </Button>
      )}
      css={css`
        gap: 4px;
        color: white;
      `}
    />
  );
};

WithCustomComponent.args = {
  itemsPerRow: 7,
  items: oneLineBoardArr,
};

export const WithLink: StoryObj<typeof TradingScoreboard> = (
  args: TradingScoreboardProps,
) => {
  return (
    <MemoryRouter>
      <Routes>
        <Route
          path={'/*'}
          element={
            <TradingScoreboard
              items={args.items}
              itemsPerRow={args.itemsPerRow}
              css={css`
                gap: 4px;
              `}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

WithLink.args = {
  itemsPerRow: 7,
  items: linkBoardArr,
};
