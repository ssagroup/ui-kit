import { useRef } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@components/Button';
import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import Alert from './Alert';
import { AlertItem } from './AlertItem';
import { showAlert } from './alertObserver';
import { AlertStyleOverrides, AlertVariants } from './types';

const SAMPLE_DESCRIPTION =
  'You can insert a description for the message here. The text relates to the action that has been performed.';

export default {
  title: 'Components/Notification/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      story: { height: '320px' },
      description: {
        component:
          'Mount `<Alert>` once in your app root, then call `showAlert({ variant, title, ... })` from anywhere. ' +
          'Alerts portal to `document.body` (or a custom `containerSelector`) and stack by position.',
      },
    },
  },
  argTypes: {
    maxAmount: {
      description:
        'Maximum alerts visible at once. When the limit is exceeded the oldest alert is dropped — ' +
        'from the bottom of the stack for `*-top` positions, from the top for `*-bottom` positions. ' +
        'No limit when omitted.',
      control: { type: 'number', min: 1, max: 20, step: 1 },
    },
    position: {
      description: 'Where in the viewport new alerts appear.',
      options: Object.values(NotificationPositions),
      control: { type: 'select' },
      table: { type: { summary: 'NotificationPositions' } },
    },
    size: {
      description: 'Width of each alert card (400 px / 760 px).',
      options: Object.values(NotificationSizes),
      control: { type: 'inline-radio' },
      table: { type: { summary: 'NotificationSizes' } },
    },
    withShadow: {
      description: 'Drop shadow on each alert card.',
      control: 'boolean',
    },
    withBorder: {
      description: 'Border on each alert card.',
      control: 'boolean',
    },
    inheritMainColor: {
      description:
        'When true, the border and close icon color inherit the variant accent color, and the background gets a subtle tint.',
      control: 'boolean',
    },
    animationDuration: {
      description: 'Slide-in duration in ms (component-level, not per-alert).',
      control: { type: 'number', min: 0, max: 2000, step: 50 },
    },
    cancelText: {
      description: 'Default label for the cancel/dismiss action.',
      control: 'text',
    },
    submitText: {
      description: 'Default label for the submit/confirm action.',
      control: 'text',
    },
    containerSelector: {
      description:
        'CSS selector for the portal target. Falls back to `document.body` when omitted or not found.',
      control: 'text',
    },
  },
  args: {
    position: NotificationPositions.rightTop,
    size: NotificationSizes.small,
    withShadow: true,
    withBorder: false,
    inheritMainColor: false,
    animationDuration: 300,
    cancelText: 'Cancel',
    submitText: 'Submit',
  },
} as Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

// ─── Default ─────────────────────────────────────────────────────────────────

// ─── Shared story helpers ─────────────────────────────────────────────────────

const NOOP_REMOVE = () => {};

/** Minimal static AlertItem props — no animation, no side-effects */
const staticItemBase = {
  id: 'preview',
  size: NotificationSizes.small,
  cancelText: 'Cancel',
  submitText: 'Submit',
  animationDuration: 0,
  position: NotificationPositions.rightTop,
  onRemove: NOOP_REMOVE,
} as const;

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        padding: '40px 32px',
      }}>
      <Alert {...args} />

      <p
        css={{
          margin: 0,
          fontSize: 13,
          color: '#6b7280',
          textAlign: 'center',
          maxWidth: 360,
        }}>
        Click a button below to trigger an alert. Use the{' '}
        <strong>Controls</strong> panel to adjust position, size, borders, and
        more.
      </p>

      <div
        css={{
          display: 'flex',
          width: '100%',
          flexWrap: 'wrap',
          gap: 8,
          justifyContent: 'flex-start',
        }}>
        {Object.values(AlertVariants).map((variant) => (
          <Button
            key={variant}
            variant="secondary"
            size="small"
            onClick={() =>
              showAlert({
                variant,
                title: 'Headline',
                description: SAMPLE_DESCRIPTION,
                cancelText: args.cancelText,
                submitText: args.submitText,
                onClose: () => null,
                onSubmit: () => null,
              })
            }>
            {variant}
          </Button>
        ))}
      </div>

      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          width: '100%',
          justifyContent: 'flex-start',
        }}>
        {Object.values(AlertVariants).map((variant) => (
          <Button
            key={`${variant}-no-desc`}
            variant="secondary"
            size="small"
            onClick={() =>
              showAlert({
                variant,
                title: 'Headline',
                cancelText: args.cancelText,
                submitText: args.submitText,
                onClose: () => null,
                onSubmit: () => null,
              })
            }>
            {variant} (no description)
          </Button>
        ))}
      </div>

      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          width: '100%',
          justifyContent: 'flex-start',
        }}>
        {Object.values(AlertVariants).map((variant) => (
          <Button
            key={`${variant}-no-desc`}
            variant="secondary"
            size="small"
            onClick={() =>
              showAlert({
                variant,
                title: 'Headline',
                cancelText: args.cancelText,
                submitText: args.submitText,
              })
            }>
            {variant} (without buttons)
          </Button>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The top row triggers **expanded** alerts (with description). The bottom row triggers **collapsed** alerts (title-only inline layout). ' +
          'Adjust the `position` control to see alerts appear in different corners of the viewport.',
      },
    },
  },
};

// ─── Custom Styles ────────────────────────────────────────────────────────────

interface StylePreset {
  label: string;
  styles: AlertStyleOverrides;
  withBorder?: boolean;
}

const STYLE_PRESETS: StylePreset[] = [
  {
    label: 'Default (no overrides)',
    styles: {},
  },
  {
    label: 'Dark',
    styles: {
      root: {
        background: '#1e1e2e',
        borderRadius: 6,
      },
      title: { color: '#e2e8f0' },
      description: { color: 'rgba(226, 232, 240, 0.6)' },
      actionButton: { color: '#a78bfa' },
      iconColor: '#a78bfa',
      closeIconColor: 'rgba(226, 232, 240, 0.45)',
    },
  },
  {
    label: 'Brand blue',
    withBorder: true,
    styles: {
      root: {
        background: '#f0f5ff',
      },
      title: { color: '#1e3a8a', fontWeight: 700 },
      description: { color: '#1d4ed8' },
      actionButton: { color: '#2563eb', fontWeight: 600 },
      iconColor: '#2563eb',
      closeIconColor: '#2563eb',
    },
  },
  {
    label: 'High contrast',
    withBorder: true,
    styles: {
      root: {
        background: '#000000',
        border: '2px solid #ffffff',
        borderRadius: 0,
      },
      title: {
        color: '#ffffff',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        fontSize: 12,
      },
      description: { color: 'rgba(255,255,255,0.75)', fontSize: 12 },
      actionButton: {
        color: '#facc15',
        fontWeight: 700,
        textTransform: 'uppercase',
        fontSize: 11,
      },
      iconColor: '#facc15',
      closeIconColor: '#ffffff',
    },
  },
];

export const CustomStyles: Story = {
  render: () => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        padding: '32px 24px',
        maxWidth: 900,
      }}>
      {/* ── Static preview grid ───────────────────────────────────────────── */}
      {STYLE_PRESETS.map((preset) => (
        <section key={preset.label}>
          <p
            css={{
              margin: '0 0 12px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#6b7280',
            }}>
            {preset.label}
          </p>

          <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Expanded layout */}
            <AlertItem
              {...staticItemBase}
              variant={AlertVariants.success}
              title="Headline"
              description={SAMPLE_DESCRIPTION}
              withShadow
              withBorder={preset.withBorder}
              styleOverrides={preset.styles}
            />

            {/* Collapsed layout */}
            <AlertItem
              {...staticItemBase}
              variant={AlertVariants.hint}
              title="Headline"
              withShadow
              withBorder={preset.withBorder}
              styleOverrides={preset.styles}
            />
          </div>
        </section>
      ))}
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'The **static preview** grid (top) renders `AlertItem` directly — no portal, no clicks needed — ' +
          'so you can compare every preset side-by-side at a glance. ' +
          'The **live demo** (bottom) mounts a real `<Alert>` with the dark-theme `styles` preset; ' +
          'click any variant button to see portaled alerts with the custom look.',
      },
    },
  },
};

// ─── Custom Color ─────────────────────────────────────────────────────────────

interface ColorPreset {
  label: string;
  color: string;
  note?: string;
}

const COLOR_PRESETS: ColorPreset[] = [
  {
    label: 'purple — theme, dark bg',
    color: 'purple',
    note: 'Dark background → white text/icons, darkened-purple border',
  },
  {
    label: 'greenLighter — theme, light bg',
    color: 'greenLighter',
    note: 'Light background → dark text, darkened-green icon & border',
  },
  {
    label: 'turquoiseLighter — theme, light bg',
    color: 'turquoiseLighter',
    note: 'Light background → dark text, darkened-teal accent',
  },
  {
    label: '#1e293b — custom CSS, dark bg',
    color: '#1e293b',
    note: 'Arbitrary dark hex → white text/icons, darkened border',
  },
  {
    label: '#f59e0b — custom CSS, light bg',
    color: '#f59e0b',
    note: 'Amber hex → dark text, darkened amber border',
  },
];

export const CustomColor: Story = {
  render: (args) => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        padding: '32px 24px',
        maxWidth: 900,
      }}>
      <Alert {...args} />

      {COLOR_PRESETS.map((preset) => (
        <section key={preset.label}>
          <div css={{ marginBottom: 12 }}>
            <p
              css={{
                margin: '0 0 2px',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#6b7280',
              }}>
              {preset.label}
            </p>
            {preset.note && (
              <p css={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>
                {preset.note}
              </p>
            )}
          </div>

          <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Expanded */}
            <AlertItem
              {...staticItemBase}
              variant={AlertVariants.success}
              color={preset.color}
              title="Headline"
              description={SAMPLE_DESCRIPTION}
              withShadow
              withBorder
            />
            {/* Collapsed */}
            <AlertItem
              {...staticItemBase}
              variant={AlertVariants.hint}
              color={preset.color}
              title="Headline"
              withShadow
            />
          </div>
        </section>
      ))}

      <div
        css={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
        <p css={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
          Fire live alerts with each color preset.
        </p>
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLOR_PRESETS.map((preset) => (
            <Button
              key={preset.label}
              variant="secondary"
              size="small"
              onClick={() =>
                showAlert({
                  variant: AlertVariants.success,
                  color: preset.color,
                  title: 'Headline',
                  description: SAMPLE_DESCRIPTION,
                  onClose: () => {},
                })
              }>
              {preset.color}
            </Button>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Demonstrates the `color` prop auto-contrast system. ' +
          'Two **dark** backgrounds (`purple`, `#1e293b`) produce white text and icons. ' +
          'Three **light** backgrounds (`greenLighter`, `turquoiseLighter`, `#f59e0b`) produce dark text with a darkened accent for the icon and border. ' +
          'The `variant` prop is still required (it picks the icon shape) but its token colors are fully overridden by `color`.',
      },
    },
  },
};

// ─── Max Amount ───────────────────────────────────────────────────────────────

const VARIANTS = Object.values(AlertVariants);

export const MaxAmount: Story = {
  render: (args) => {
    const counterRef = useRef(0);

    const fireNext = () => {
      const n = ++counterRef.current;
      const variant = VARIANTS[(n - 1) % VARIANTS.length];
      showAlert({
        variant,
        title: `Alert #${n}`,
        description: n % 2 === 0 ? SAMPLE_DESCRIPTION : undefined,
        onClose: () => {},
      });
    };

    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          padding: '40px 32px',
        }}>
        <Alert {...args} />

        <div
          css={{
            background: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            padding: '16px 20px',
            maxWidth: 420,
            width: '100%',
            fontSize: 13,
            lineHeight: '20px',
            color: '#374151',
          }}>
          <strong>How it works</strong>
          <ul css={{ margin: '8px 0 0', paddingLeft: 18 }}>
            <li>
              The <code>maxAmount</code> control (default: <strong>3</strong>)
              caps how many alerts are shown at once.
            </li>
            <li>
              Each click fires a new alert cycling through all 6 variants — when
              the stack is full the oldest is silently dropped.
            </li>
            <li>
              Even-numbered alerts include a description; odd ones are
              collapsed.
            </li>
          </ul>
        </div>

        <div css={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button variant="primary" size="small" onClick={fireNext}>
            Fire next alert
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => {
              for (let i = 0; i < (args.maxAmount ?? 3) + 2; i++) {
                setTimeout(() => fireNext(), i * 120);
              }
            }}>
            Spam ({(args.maxAmount ?? 3) + 2} at once)
          </Button>
        </div>
      </div>
    );
  },
  args: {
    maxAmount: 3,
    position: NotificationPositions.rightTop,
    withShadow: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Fire next alert** adds one alert at a time so you can observe each arrival. ' +
          '**Spam** fires `maxAmount + 2` alerts in quick succession — the stack never grows past the limit. ' +
          'Change the `maxAmount` and `position` controls to see how trimming works from the other end of the stack.',
      },
    },
  },
};
