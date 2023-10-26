import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Meta, StoryObj } from '@storybook/react';
import { AddNewAccountCard } from './AddNewAccountCard';

export default {
  title: 'Widgets/AddNewAccountCard',
  component: AddNewAccountCard,
} as Meta<typeof AddNewAccountCard>;

export const Default: StoryObj<typeof AddNewAccountCard> = () => {
  return (
    <div css={{ width: '100%', maxWidth: '500px' }}>
      <AddNewAccountCard onclick={() => alert('click!')} />
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
              <AddNewAccountCard link="/link" />
            </div>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

WithLink.args = {};
