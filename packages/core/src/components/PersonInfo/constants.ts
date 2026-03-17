/**
 * PersonInfo badge color config. Uses theme.colors only (no palette).
 * DEFAULT_BADGE_COLORS: order of MainColors keys used when badges are strings (cycled by index).
 * BADGE_COLORS(theme): map of MainColors key → { text, bg } using theme.colors.* and theme.colors.*20.
 */
import type { Theme } from '@emotion/react';

type BadgeColorName = keyof MainColors;

export const DEFAULT_BADGE_COLORS: Array<keyof MainColors> = [
  'purple',
  'blueLight',
  'green',
  'blue',
  'pink',
  'turquoise',
  'yellow',
  'yellowWarm',
];

interface BadgeColorConfig {
  text: string;
  bg: string;
}

export const BADGE_COLORS = (
  theme: Theme,
): Record<BadgeColorName, BadgeColorConfig> => ({
  purple: {
    text: theme.colors.purple as string,
    bg: theme.colors.purple20 as string,
  },
  blueLight: {
    text: theme.colors.blueLight as string,
    bg: theme.colors.blueLight20 as string,
  },
  green: {
    text: theme.colors.green as string,
    bg: theme.colors.green20 as string,
  },
  blue: {
    text: theme.colors.blue as string,
    bg: theme.colors.blue20 as string,
  },
  pink: {
    text: theme.colors.pink as string,
    bg: theme.colors.pink20 as string,
  },
  turquoise: {
    text: theme.colors.turquoise as string,
    bg: theme.colors.turquoise20 as string,
  },
  yellow: {
    text: theme.colors.yellow as string,
    bg: theme.colors.yellow20 as string,
  },
  yellowWarm: {
    text: theme.colors.yellowLighter as string,
    bg: theme.colors.yellowLighter20 as string,
  },
});
