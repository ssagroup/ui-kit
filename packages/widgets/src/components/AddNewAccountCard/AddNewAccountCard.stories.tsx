import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { AddNewAccountCard } from './AddNewAccountCard';
import { Icon, mainTheme } from '@ssa-ui-kit/core';

export default {
  title: 'Widgets/AddNewAccountCard',
  component: AddNewAccountCard,
} as Meta<typeof AddNewAccountCard>;

export const Default: StoryObj<typeof AddNewAccountCard> = () => {
  return (
    <div css={{ width: '100%', maxWidth: '500px' }}>
      <AddNewAccountCard onClick={() => alert('Clicked!')}>
        <Icon name="plus" size={12} color={mainTheme.colors.blueRoyal} />
        Add new account
      </AddNewAccountCard>
    </div>
  );
};

Default.args = {};

export const WithLink: StoryObj<typeof AddNewAccountCard> = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <div css={{ width: '100%', maxWidth: '500px' }}>
              <AddNewAccountCard link="/link">
                <Icon
                  name="plus"
                  size={12}
                  color={mainTheme.colors.blueRoyal}
                />
                Add new account
              </AddNewAccountCard>
            </div>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

WithLink.args = {};
