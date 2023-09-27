// This file is also imported into the Button/Button.stories.tsx
// and into the ./index.tsx
// We need such a file to let webpack create a chunk for
// the <Icon /> component which uses React.lazy().
// If we import <Icon /> directly into the Button/Button.stories.tsx,
// webpack will consider that as an objection to the chunk creation.
//
// Make sure the order in this array corresponds to the one in the
// ./index.tsx
export const iconsList = [
  'diet',
  'calendar',
  'home',
  'stats',
  'sleep',
  'trainings',
  'measurements',
  'settings',
  'plus',
  'minus',
  'more',
  'check',
  'cross',
  'user',
  'union',
  'notification',
  'visible',
  'invisible',
  'carrot-down',
  'carrot-up',
  'carrot-left',
  'carrot-right',
  'radio-on',
  'circle',
  'arrow-up',
  'arrow-down',
  'filter',
] as const;
