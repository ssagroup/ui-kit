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
      title: (
        <>
          <span style={{ fontWeight: 700 }}>SSA UI Kit</span>
          <span
            style={{
              marginLeft: 8,
              fontSize: 11,
              padding: '2px 6px',
              borderRadius: 6,
              background: 'rgba(99,102,241,0.12)',
              color: '#6366f1',
            }}
          >
            docs POC
          </span>
        </>
      ),
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
