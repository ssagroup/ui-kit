import './injectGlobal';
import '@emotion/react';

import { Theme as T } from '@ssa-ui-kit/core';

declare module '@emotion/react' {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  export interface Theme extends T {}
}

export * from './components/AccountBalance';
export * from './components/AccountKeys';
export { default as Activity } from './components/Activity';
export * from './components/Activity';
export { default as Bmi } from './components/Bmi';
export * from './components/Bmi';
export { default as Calories } from './components/Calories';
export * from './components/Calories';
export * from './components/ExchangeAccount';
export * from './components/HeartRate';
export { default as ListGoals } from './components/ListGoals';
export * from './components/ListGoals';
export * from './components/MealNutrients';
export { default as MealPlanner } from './components/MealPlanner';
export * from './components/MealPlanner';
export { default as StepsCounter } from './components/StepsCounter';
export * from './components/StepsCounter';
export * from './components/TradingInfoCard';
export * from './components/TradingScoreboard';
export { default as UpcomingWorkouts } from './components/UpcomingWorkouts';
export * from './components/UpcomingWorkouts';
export { default as UserCard } from './components/UserCard';
export * from './components/UserCard';
export { default as WaterConsume } from './components/WaterConsume';
export * from './components/WaterConsume';
