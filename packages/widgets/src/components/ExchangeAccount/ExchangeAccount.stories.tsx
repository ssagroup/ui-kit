import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { css, useTheme } from '@emotion/react';
import { css as cssClassname } from '@emotion/css';
import { Icon, AddNewAccountCard } from '@ssa-ui-kit/core';
import { ExchangeAccount } from './ExchangeAccount';
import { dataValues } from './helpers';

export default {
  title: 'Trading/ExchangeAccount',
  component: ExchangeAccount,
} as Meta<typeof ExchangeAccount>;

export const Default: StoryObj<typeof ExchangeAccount> = () => {
  return (
    <ExchangeAccount
      platform={dataValues[0].platform}
      title={dataValues[0].title}
      status={dataValues[0].status}
      data={dataValues[0].data}
      onClick={() => alert('Card is clicked!')}
      onDelete={() => alert('Card is deleted!')}
      pieChartProps={{
        className: cssClassname`
          align-self: center;
          max-width: 300px;
        `,
      }}
    />
  );
};

Default.args = {};

export const WithLink: StoryObj<typeof ExchangeAccount> = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <ExchangeAccount
              platform={dataValues[0].platform}
              title={dataValues[0].title}
              status={dataValues[0].status}
              data={dataValues[0].data}
              link="/link"
              onClick={() => alert('Card is clicked!')}
              onDelete={() => alert('Card is deleted!')}
              pieChartProps={{
                className: cssClassname`
                  align-self: center;
                  max-width: 300px;
                `,
              }}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

WithLink.args = {};

export const List: StoryObj<typeof ExchangeAccount> = () => {
  const theme = useTheme();
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        gap: 10px;

        ${theme.mediaQueries.md} {
          max-width: 1542px;
          grid-template-columns: repeat(3, minmax(270px, 1fr));
          gap: 20px;
        }
      `}>
      <AddNewAccountCard>
        <Icon name="plus" size={12} color={theme.colors.blueRoyal} />
        Add new account
      </AddNewAccountCard>
      {dataValues.map((item, index) => {
        return (
          <ExchangeAccount
            key={index}
            platform={item.platform}
            title={item.title}
            status={item.status}
            data={item.data}
            onClick={() => alert('Card is clicked!')}
            onDelete={() => alert('Card is deleted!')}
            pieChartProps={{
              className: cssClassname`
                align-self: center;
                max-width: 300px;
              `,
            }}
          />
        );
      })}
    </div>
  );
};

List.args = {};
