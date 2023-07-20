/* eslint-disable react/display-name */
import { useEffect } from 'react';
import { css, Theme, useTheme } from '@emotion/react';

import {
  Typography,
  ResponsiveImage,
  Avatar,
  Button,
  Icon,
} from '@ssa-ui-kit/core';

import { useApi } from '@ssa-ui-kit/hooks';

import UpcomingWorkouts from '@components/UpcomingWorkouts';
import ListGoals from '@components/ListGoals';
import Bmi from '@components/Bmi';
import UserCard from '@components/UserCard';
import NavBar from '@components/NavBar';

import { useAuth } from '@hooks/useAuth';

import API from '@apis/index';

import { Layout, Nav, Sidebar } from './layout/NavTwoColumns';

const Default = (Component) => (props) => {
  const theme = useTheme();
  const { user } = useAuth();
  const { data: goals, query: loadGoals } = useApi(API.goals.get, []);
  const { data: workouts, query: loadWorkouts } = useApi(API.workouts.get, []);

  useEffect(() => {
    loadGoals();
    loadWorkouts();
  }, []);

  return (
    <Layout>
      {/* aside toggle */}
      <input type="checkbox" id="aside" />
      <div
        css={css`
          display: flex;

          grid-area: header;
          grid-column-start: 2;
          grid-column-end: -1;

          align-items: center;
          justify-content: flex-end;

          height: 55px;

          padding-top: 16px;
          padding-right: 11px;

          ${theme.mediaQueries.lg} {
            display: none;
          }
        `}>
        <label htmlFor="aside">
          <Avatar size={42} image={'/img/face/face_46.png'} />
        </label>

        <Button
          size="large"
          variant="tertiary"
          endIcon={<Icon name="notification" />}
          onClick={console.log}
        />
      </div>

      <Nav>
        <NavBar />

        <div
          css={(theme: Theme) => css`
            padding-left: 20px;

            ${theme.mediaQueries.lg} {
              display: none;
            }
          `}>
          <Typography variant="body1">Good Morning, {user?.name}</Typography>
          <Typography variant="h2" css={{ display: 'flex' }}>
            Welcome Back
            <ResponsiveImage
              srcSet=""
              sizes=""
              src="/img/dumbbell/dumbbell_hand_24.png"
              alt="Dumbbell with hand"
            />
          </Typography>
        </div>
      </Nav>

      <Component {...props} />

      <Sidebar>
        <UserCard user={user} />

        <section>
          {user && <Bmi height={user.height} weight={user.weight} />}
        </section>

        <section>
          <ListGoals goals={goals} />
        </section>

        <section>
          <UpcomingWorkouts workouts={workouts} />
        </section>
      </Sidebar>
    </Layout>
  );
};

Default.displayName = 'Default';

export default Default;
