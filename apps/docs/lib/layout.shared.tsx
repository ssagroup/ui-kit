import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout options (nav bar) used by both the home and docs layouts.
 */
export function baseOptions(): BaseLayoutProps {
  return {
    themeSwitch: {
      enabled: false,
    },
    nav: {
      title: <span style={{ fontWeight: 700 }}>SSA UI Kit</span>,
    },
    links: [
      {
        text: 'Storybook',
        url: 'https://ui-kit-core.web.app',
        external: true,
      },
      {
        text: 'GitHub',
        url: 'https://github.com/ssa-group',
        external: true,
      },
    ],
  };
}
