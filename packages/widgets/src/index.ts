/* eslint-disable @typescript-eslint/no-empty-interface */
import './injectGlobal';
import '@emotion/react';

import { Theme as T } from '@ssa-ui-kit/core';

declare module '@emotion/react' {
  export interface Theme extends T {}
}

export { default as Activity } from './components/Activity';
export * from './components/Activity';
export { default as Calories } from './components/Calories';
export * from './components/Calories';
export * from './components/HeartRate';
export * from './components/MealNutrients';
export { default as NavBar } from './components/NavBar';
export * from './components/NavBar';
export { default as ProgressInfo } from './components/ProgressInfo';
export * from './components/ProgressInfo';
export { default as UpcomingWorkouts } from './components/UpcomingWorkouts';
export * from './components/UpcomingWorkouts';
export { default as WaterConsume } from './components/WaterConsume';
export * from './components/WaterConsume';
export { default as Bmi } from './components/Bmi';
export * from './components/Bmi';
export { default as CardList } from './components/CardList';
export * from './components/CardList';
export { default as ListGoals } from './components/ListGoals';
export * from './components/ListGoals';
export { default as MealPlanner } from './components/MealPlanner';
export * from './components/MealPlanner';
export { default as StepsCounter } from './components/StepsCounter';
export * from './components/StepsCounter';
export { default as UserCard } from './components/UserCard';
export * from './components/UserCard';
export * from './components/Pagination';
export * from './components/TradingInfoCard';
export * from './components/TradingScoreboard';
export * from './components/NotificationCard';
