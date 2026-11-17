import type { Preview } from '@storybook/react-webpack5';

import { ThemeProvider } from '@emotion/react';
import theme from '../src/themes/main';
import type { GlobalTypes } from 'storybook/internal/types';
import {
  FeatureFlagRegistry,
  FeatureFlags,
  FeatureFlagsProvider,
  featureFlagRegistry as kitRegistry,
} from '../src/contexts/FeatureFlags';

import './style.css';

// One toolbar toggle per kit flag, generated from the registry, so every story
// can be eyeballed with a flag on and off. A story sets its own starting value
// via `parameters.featureFlags`; picking on/off in the toolbar overrides it,
// and `default` hands control back to the story.
// Widened: the kit registry may be empty, which types its entries as `never`.
const featureFlagRegistry: FeatureFlagRegistry = kitRegistry;
const flagGlobalName = (name: string) => `flag_${name}`;

const featureFlagGlobalTypes: GlobalTypes = Object.fromEntries(
  Object.entries(featureFlagRegistry).map(([name, definition]) => [
    flagGlobalName(name),
    {
      description: definition.description,
      toolbar: {
        title: name,
        icon: 'flag' as const,
        dynamicTitle: true,
        items: [
          { value: 'default', title: `${name}: default` },
          { value: 'on', title: `${name}: on` },
          { value: 'off', title: `${name}: off` },
        ],
      },
    },
  ]),
);

const preview: Preview = {
  globalTypes: featureFlagGlobalTypes,
  initialGlobals: Object.fromEntries(
    Object.keys(featureFlagRegistry).map((name) => [
      flagGlobalName(name),
      'default',
    ]),
  ),
  parameters: {
    controls: { expanded: true, hideNoControlsWarning: true },
    options: {
      // Design System (palettes, typography, icons, theming) reads before the
      // components that consume it. Groups not listed here keep their
      // file-load order at the `*` slot.
      storySort: {
        order: ['Design System', 'Components', '*'],
      },
    },
  },
  decorators: [
    (Story, { globals, parameters }) => {
      const flags: Record<string, boolean> = { ...parameters.featureFlags };
      for (const name of Object.keys(featureFlagRegistry)) {
        const choice = globals[flagGlobalName(name)];
        if (choice === 'on') flags[name] = true;
        if (choice === 'off') flags[name] = false;
      }

      return (
        <ThemeProvider theme={theme}>
          <FeatureFlagsProvider flags={flags as FeatureFlags}>
            <Story />
          </FeatureFlagsProvider>
        </ThemeProvider>
      );
    },
  ],
  tags: ['autodocs'],
};

export default preview;
