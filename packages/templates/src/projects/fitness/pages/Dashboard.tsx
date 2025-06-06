import { useEffect } from 'react';
import { css, Theme } from '@emotion/react';

import { Typography, ResponsiveImage, ProgressInfo } from '@ssa-ui-kit/core';
import { useApi } from '@ssa-ui-kit/hooks';
import {
  HeartRate,
  Activity,
  Calories,
  MealPlanner,
  StepsCounter,
  WaterConsume,
} from '@ssa-ui-kit/widgets';
import API from '@fitness/apis/index';
import { useAuth } from '@fitness/hooks/useAuth';
import { default as MealNutrients } from './components/MealNutrients';
import DefaultTemplate from './Template/Default';

const layoutContainer = (theme: Theme) => css`
  display: grid;

  width: 100%;
  height: 100%;
  max-width: 1260px;

  grid-area: main;
  grid-template-columns: auto;

  margin: 0 auto;
  padding: 16px;

  ${theme.mediaQueries.lg} {
    grid-template-rows: 50px auto;

    padding: 36px;
  }

  section {
    padding-block: 20px;
  }
`;
const content = (theme: Theme) => css`
  display: grid;
  grid-column: 1/-1;
  grid-template-rows: auto;

  ${theme.mediaQueries.lg} {
    grid-template-rows: 50px auto;
  }
`;
const msgWrapper = (theme: Theme) => css`
  display: none;
  padding-left: 20px;

  ${theme.mediaQueries.lg} {
    display: block;
  }
`;
const sectionsSmallCards = css`
  display: grid;

  grid-template-columns: repeat(2, minmax(10px, 1fr));
  grid-gap: 10px;

  @container (max-width: 300px) {
    grid-template-columns: 1fr;
  }

  @container (min-width: 600px) {
    grid-template-columns: repeat(4, minmax(10px, 1fr));
  }
`;
const sectionActivity = css`
  display: grid;
  gap: 30px;

  grid-template-columns: minmax(10px, auto);

  @container (max-width: 300px) {
    grid-template-columns: 1fr;
  }

  @container (min-width: 600px) {
    grid-template-columns: minmax(10px, 2fr) minmax(10px, 2fr);
  }
`;

const Dashboard = () => {
  const { user } = useAuth();
  const { data, query: loadData } = useApi(API.topWidgets.get, {
    steps: { current: 0, max: 0, unit: '' },
    water: { current: 0, max: 0, steps: [] },
    calories: { current: 0, max: 0 },
    heartRate: { id: '', data: [] },
  });
  const { data: mealData, query: loadMealData } = useApi(
    API.mealPlanner.get,
    {},
  );
  const { data: activitiesData, query: loadActivitiesData } = useApi(
    API.activity.getActivities,
    {},
  );

  const { data: progressData, query: loadProgress } = useApi(
    API.progress.getProgress,
    {},
  );

  useEffect(() => {
    loadData();
    loadMealData();
    loadActivitiesData();
    loadProgress();
  }, []);

  return (
    <main css={layoutContainer}>
      <div css={content}>
        <div css={msgWrapper}>
          <Typography variant="body1" weight="medium">
            Good Morning, {user?.name}
          </Typography>
          <Typography variant="h2" weight="bold" css={{ display: 'flex' }}>
            Welcome Back
            <ResponsiveImage
              srcSet=""
              sizes=""
              src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/img%2Fdumbbell%2Fdumbbell_hand_42.png?alt=media&token=9a727b96-a781-4338-aad4-174121a6686d"
              alt="Dumbbell with hand"
            />
          </Typography>
        </div>

        <div
          css={css`
            container-type: inline-size;
          `}>
          <section css={sectionsSmallCards}>
            <StepsCounter
              max={data?.steps.max}
              currentValue={data?.steps.current}
            />

            <WaterConsume
              minValue={0}
              maxValue={3}
              unit={'L'}
              active={2}
              currentValue={data?.water.current}
              steps={data?.water.steps}
            />

            <Calories
              max={data?.calories.max}
              currentValue={data?.calories.current}
            />

            <HeartRate data={data?.heartRate} />
          </section>

          <section css={sectionActivity}>
            <Activity data={activitiesData} />
            <ProgressInfo data={progressData} />
          </section>

          <section css={sectionActivity}>
            <MealPlanner data={mealData} />
            <MealNutrients />
          </section>
        </div>
      </div>
    </main>
  );
};

export default DefaultTemplate(Dashboard);
