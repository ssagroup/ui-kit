import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Avatar } from '@ssa-ui-kit/core';
import { UserProfile } from '../UserProfile';

export const StoryComponent = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <UserProfile
              name="Josh Li"
              email="Josh@gmail.com"
              link="/sing-up"
              trigger={
                <Avatar size={42} image="https://via.placeholder.com/42x42" />
              }
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );
};
