import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@components/Button';
import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import Notification from './Notification';
import { NotificationItem } from './NotificationItem';
import { showNotification } from './notificationObserver';
import { NotificationStyleOverrides, NotificationVariants } from './types';

const SAMPLE_DESCRIPTION =
  'You can insert a description for the message here. The text relates to the action that has been performed.';

const SAMPLE_DATE = '11 days ago';

export default {
  title: 'Components/Notification/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
    docs: {
      story: { height: '360px' },
      description: {
        component:
          'Mount `<Notification>` once in your app root, then call `showNotification({ variant, title, ... })` from anywhere. ' +
          'Notifications are persistent by default — they stay until the user closes them. ' +
          'Pass `timeout` to enable auto-dismiss.',
      },
    },
  },
  argTypes: {
    timeout: {
      description:
        'Default auto-dismiss duration in ms. Omit for persistent notifications. ' +
        'Individual notifications can override this via `showNotification({ timeout })`.',
      control: { type: 'number', min: 500, max: 15000, step: 500 },
    },
    maxAmount: {
      description:
        'Maximum notifications visible at once. Oldest is dropped when exceeded.',
      control: { type: 'number', min: 1, max: 20, step: 1 },
    },
    position: {
      description: 'Where in the viewport the notification stack appears.',
      options: Object.values(NotificationPositions),
      control: { type: 'select' },
      table: { type: { summary: 'NotificationPositions' } },
    },
    size: {
      description: 'Width of each notification card.',
      options: Object.values(NotificationSizes),
      control: { type: 'inline-radio' },
      table: { type: { summary: 'NotificationSizes' } },
    },
    withShadow: {
      description: 'Drop shadow on each card.',
      control: 'boolean',
    },
    withBorder: {
      description: '1 px border on each card.',
      control: 'boolean',
    },
    animationDuration: {
      description: 'Slide-in duration in ms.',
      control: { type: 'number', min: 0, max: 2000, step: 50 },
    },
    containerSelector: {
      description:
        'CSS selector for the portal target. Falls back to `document.body`.',
      control: 'text',
    },
  },
  args: {
    position: NotificationPositions.rightBottom,
    size: NotificationSizes.small,
    withShadow: true,
    withBorder: false,
    animationDuration: 300,
  },
} as Meta<typeof Notification>;

type Story = StoryObj<typeof Notification>;

// ─── Shared helpers ───────────────────────────────────────────────────────────

const NOOP_REMOVE = () => {};

const staticBase = {
  id: 'preview',
  size: NotificationSizes.small,
  cancelText: '',
  submitText: '',
  animationDuration: 0,
  position: NotificationPositions.rightBottom,
  onRemove: NOOP_REMOVE,
} as const;

// ─── Color presets ────────────────────────────────────────────────────────────

interface ColorPreset {
  label: string;
  color: string;
  note?: string;
}

/**
 * Covers the four quadrants of the contrast matrix:
 *   light theme · dark theme · light custom CSS · dark custom CSS
 */
const COLOR_PRESETS: ColorPreset[] = [
  {
    label: 'greenLighter — theme, light bg',
    color: 'greenLighter',
    note: 'Light background → dark text + darkened-green icon & border',
  },
  {
    label: 'purple — theme, dark bg',
    color: 'purple',
    note: 'Dark background → white text/icon, darkened-purple border',
  },
  {
    label: 'turquoiseLighter — theme, light bg',
    color: 'turquoiseLighter',
    note: 'Light teal background → dark text, darkened teal accents',
  },
  {
    label: '#1e293b — custom CSS, dark bg',
    color: '#1e293b',
    note: 'Arbitrary dark hex → white text/icon, darkened shade for border',
  },
  {
    label: '#f59e0b — custom CSS, light bg',
    color: '#f59e0b',
    note: 'Amber hex → dark text, darkened amber border',
  },
];

// ─── Style override presets ───────────────────────────────────────────────────

interface StylePreset {
  label: string;
  note: string;
  overrides: NotificationStyleOverrides;
}

const STYLE_PRESETS: StylePreset[] = [
  {
    label: 'Branded card',
    note: 'Custom border-radius + indigo title + muted date',
    overrides: {
      root: {
        borderRadius: 4,
        border: '2px solid #6366f1',
        background: '#f5f3ff',
      },
      title: { color: '#4338ca', fontWeight: 700 },
      date: { color: '#a5b4fc' },
      description: { color: '#4b5563' },
    },
  },
  {
    label: 'Minimal monochrome',
    note: 'Flat card, subtle divider look, lighter icon',
    overrides: {
      root: {
        borderRadius: 0,
        borderLeft: '3px solid #374151',
        boxShadow: 'none',
        background: '#f9fafb',
      },
      iconColor: '#9ca3af',
      title: { color: '#111827' },
      date: { color: '#6b7280', fontSize: '11px' },
    },
  },
  {
    label: 'Warning style',
    note: 'Amber accent with matching close icon and action button tint',
    overrides: {
      root: {
        background: '#fffbeb',
        border: '1px solid #fcd34d',
        borderRadius: 8,
      },
      iconColor: '#d97706',
      closeIconColor: '#92400e',
      title: { color: '#92400e' },
      date: { color: '#b45309' },
      description: { color: '#78350f' },
      actionButton: {
        color: '#d97706',
        fontWeight: 600,
      },
    },
  },
];

// ─── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        padding: '40px 32px',
        maxWidth: 860,
      }}>
      <Notification {...args} />

      {/* ── Static preview grid ─────────────────────────────────────────────── */}
      <div css={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {(
          [
            NotificationVariants.default,
            NotificationVariants.neutral,
            NotificationVariants.dark,
          ] as const
        ).map((variant) => (
          <section key={variant}>
            <p
              css={{
                margin: '0 0 10px',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#6b7280',
              }}>
              {variant}
            </p>

            <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* With description + date + action buttons */}
              <NotificationItem
                {...staticBase}
                variant={variant}
                title="Name Surname"
                date={SAMPLE_DATE}
                description={SAMPLE_DESCRIPTION}
                cancelText="Button"
                submitText="Button"
                onClose={NOOP_REMOVE}
                onSubmit={NOOP_REMOVE}
                withShadow
              />
              {/* With description + date, no buttons */}
              <NotificationItem
                {...staticBase}
                variant={variant}
                title="Name Surname"
                date={SAMPLE_DATE}
                description={SAMPLE_DESCRIPTION}
                withShadow
              />
              {/* Title + date only (no description) */}
              <NotificationItem
                {...staticBase}
                variant={variant}
                title="Name Surname"
                date={SAMPLE_DATE}
                withShadow
              />
            </div>
          </section>
        ))}
      </div>

      {/* ── Trigger buttons ───────────────────────────────────────────────── */}
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          borderTop: '1px solid #e5e7eb',
          paddingTop: 24,
        }}>
        <p css={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
          Click to fire a live notification via the portal. Use the{' '}
          <strong>Controls</strong> panel to adjust position, size, and more.
        </p>

        {/* With description */}
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(
            [
              NotificationVariants.default,
              NotificationVariants.neutral,
              NotificationVariants.dark,
            ] as const
          ).map((variant) => (
            <Button
              key={variant}
              variant="secondary"
              size="small"
              onClick={() =>
                showNotification({
                  variant,
                  title: 'Name Surname',
                  date: SAMPLE_DATE,
                  description: SAMPLE_DESCRIPTION,
                  cancelText: 'Button',
                  submitText: 'Button',
                  onClose: () => {},
                  onSubmit: () => {},
                })
              }>
              {variant}
            </Button>
          ))}
        </div>

        {/* With description, no buttons */}
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(
            [
              NotificationVariants.default,
              NotificationVariants.neutral,
              NotificationVariants.dark,
            ] as const
          ).map((variant) => (
            <Button
              key={`${variant}-no-buttons`}
              variant="secondary"
              size="small"
              onClick={() =>
                showNotification({
                  variant,
                  title: 'Name Surname',
                  date: SAMPLE_DATE,
                  description: SAMPLE_DESCRIPTION,
                })
              }>
              {variant} (no buttons)
            </Button>
          ))}
        </div>

        {/* Without description */}
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(
            [
              NotificationVariants.default,
              NotificationVariants.neutral,
              NotificationVariants.dark,
            ] as const
          ).map((variant) => (
            <Button
              key={`${variant}-collapsed`}
              variant="secondary"
              size="small"
              onClick={() =>
                showNotification({
                  variant,
                  title: 'Name Surname',
                  date: SAMPLE_DATE,
                })
              }>
              {variant} (no description)
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
          'The **static preview** grid shows all three variants across three layouts: ' +
          'with description + action buttons, with description only, and title-only (collapsed). ' +
          'The **trigger buttons** below fire live notifications via the portal — ' +
          'notifications are persistent by default (no `timeout`), so they stay until closed.',
      },
    },
  },
};

// ─── Custom Color ─────────────────────────────────────────────────────────────

export const CustomColor: Story = {
  render: (args) => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        padding: '40px 32px',
        maxWidth: 860,
      }}>
      <Notification {...args} />

      {/* ── Static preview grid ─────────────────────────────────────────────── */}
      <div css={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {COLOR_PRESETS.map((preset) => (
          <section key={preset.label}>
            <div css={{ marginBottom: 10 }}>
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
              {/* Expanded with date + description */}
              <NotificationItem
                {...staticBase}
                variant={NotificationVariants.default}
                color={preset.color}
                title="Name Surname"
                date={SAMPLE_DATE}
                description={SAMPLE_DESCRIPTION}
                cancelText="Dismiss"
                submitText="View"
                onClose={NOOP_REMOVE}
                onSubmit={NOOP_REMOVE}
                withShadow
                withBorder
              />
              {/* Collapsed — title + date only */}
              <NotificationItem
                {...staticBase}
                variant={NotificationVariants.default}
                color={preset.color}
                title="Name Surname"
                date={SAMPLE_DATE}
                withShadow
              />
            </div>
          </section>
        ))}

        {/* ── Named icon ──────────────────────────────────────────────────────── */}
        <section>
          <div css={{ marginBottom: 10 }}>
            <p
              css={{
                margin: '0 0 2px',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#6b7280',
              }}>
              icon="comments" — named icon string
            </p>
            <p css={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>
              Pass any icon name from the icon set. Color is auto-derived to
              contrast the background.
            </p>
          </div>
          <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <NotificationItem
              {...staticBase}
              variant={NotificationVariants.default}
              color="purple"
              icon="comments"
              title="New message"
              date="Just now"
              description={SAMPLE_DESCRIPTION}
              withShadow
              withBorder
            />
            <NotificationItem
              {...staticBase}
              variant={NotificationVariants.default}
              color="#f59e0b"
              icon="comments"
              title="New message"
              date="Just now"
              withShadow
            />
          </div>
        </section>

        {/* ── Custom ReactNode avatar ──────────────────────────────────────────── */}
        <section>
          <div css={{ marginBottom: 10 }}>
            <p
              css={{
                margin: '0 0 2px',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#6b7280',
              }}>
              icon={'{<div>}'} — custom ReactNode (avatar)
            </p>
            <p css={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>
              Pass any ReactNode — img, Avatar component, initials div, etc.
              Sizing is controlled by the consumer.
            </p>
          </div>
          <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <NotificationItem
              {...staticBase}
              variant={NotificationVariants.default}
              color="greenLighter"
              icon={
                <div
                  css={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.04em',
                  }}>
                  NS
                </div>
              }
              title="Name Surname"
              date="5 min ago"
              description={SAMPLE_DESCRIPTION}
              cancelText="Dismiss"
              submitText="View"
              onClose={NOOP_REMOVE}
              onSubmit={NOOP_REMOVE}
              withShadow
              withBorder
            />
            <NotificationItem
              {...staticBase}
              variant={NotificationVariants.default}
              color="#1e293b"
              icon={
                <div
                  css={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#fff',
                    letterSpacing: '0.04em',
                  }}>
                  JD
                </div>
              }
              title="Jane Doe"
              date="2 hours ago"
              withShadow
            />
          </div>
        </section>
      </div>

      {/* ── Trigger buttons ──────────────────────────────────────────────────── */}
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          borderTop: '1px solid #e5e7eb',
          paddingTop: 24,
        }}>
        <p css={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
          Fire live notifications — persistent by default, close with the ×
          button.
        </p>

        {/* Color presets */}
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLOR_PRESETS.map((preset) => (
            <Button
              key={preset.label}
              variant="secondary"
              size="small"
              onClick={() =>
                showNotification({
                  variant: NotificationVariants.default,
                  color: preset.color,
                  title: 'Name Surname',
                  date: SAMPLE_DATE,
                  description: SAMPLE_DESCRIPTION,
                  cancelText: 'Dismiss',
                  submitText: 'View',
                  onClose: () => {},
                  onSubmit: () => {},
                })
              }>
              {preset.color}
            </Button>
          ))}
        </div>

        {/* Named icon */}
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Button
            variant="secondary"
            size="small"
            onClick={() =>
              showNotification({
                variant: NotificationVariants.default,
                color: 'purple',
                icon: 'comments',
                title: 'New message',
                date: 'Just now',
                description: SAMPLE_DESCRIPTION,
              })
            }>
            icon="comments" (purple)
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() =>
              showNotification({
                variant: NotificationVariants.default,
                color: '#f59e0b',
                icon: 'comments',
                title: 'New message',
                date: 'Just now',
              })
            }>
            icon="comments" (amber)
          </Button>
        </div>

        {/* Custom ReactNode avatar */}
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <Button
            variant="secondary"
            size="small"
            onClick={() =>
              showNotification({
                variant: NotificationVariants.default,
                color: 'greenLighter',
                icon: (
                  <div
                    css={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#059669',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#fff',
                    }}>
                    NS
                  </div>
                ),
                title: 'Name Surname',
                date: '5 min ago',
                description: SAMPLE_DESCRIPTION,
                cancelText: 'Dismiss',
                submitText: 'View',
                onClose: () => {},
                onSubmit: () => {},
              })
            }>
            avatar div (green)
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() =>
              showNotification({
                variant: NotificationVariants.default,
                color: '#1e293b',
                icon: (
                  <div
                    css={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#fff',
                    }}>
                    JD
                  </div>
                ),
                title: 'Jane Doe',
                date: '2 hours ago',
              })
            }>
            avatar div (dark)
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Demonstrates the `color` prop auto-contrast system alongside the flexible `icon` prop. ' +
          'Five color presets span the full contrast matrix (light/dark theme keys + custom hex). ' +
          'Two extra sections show `icon` as a **named icon string** (`"comments"`) and as a **custom ReactNode** (initials avatar div). ' +
          'Text, icon tint, and border colors are all derived automatically for legibility.',
      },
    },
  },
};

// ─── Custom Styles ────────────────────────────────────────────────────────────

export const CustomStyles: Story = {
  render: (args) => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        padding: '40px 32px',
        maxWidth: 860,
      }}>
      {/*
        Each <Notification> instance below receives a unique `styles` override.
        The portal renders inside that instance, so overrides apply to every
        notification fired through it. In this preview the grid is static —
        use the trigger buttons to see the overrides in the live portal.
      */}
      {STYLE_PRESETS.map((preset) => (
        <Notification key={preset.label} {...args} styles={preset.overrides} />
      ))}

      {/* ── Static preview grid ─────────────────────────────────────────────── */}
      <div css={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {STYLE_PRESETS.map((preset) => (
          <section key={preset.label}>
            <div css={{ marginBottom: 10 }}>
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
              <p css={{ margin: 0, fontSize: 11, color: '#9ca3af' }}>
                {preset.note}
              </p>
            </div>

            <div css={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Expanded with date + description + action buttons */}
              <NotificationItem
                {...staticBase}
                variant={NotificationVariants.default}
                styleOverrides={preset.overrides}
                title="Name Surname"
                date={SAMPLE_DATE}
                description={SAMPLE_DESCRIPTION}
                cancelText="Dismiss"
                submitText="View"
                onClose={NOOP_REMOVE}
                onSubmit={NOOP_REMOVE}
              />
              {/* Collapsed — title + date only */}
              <NotificationItem
                {...staticBase}
                variant={NotificationVariants.default}
                styleOverrides={preset.overrides}
                title="Name Surname"
                date={SAMPLE_DATE}
              />
            </div>
          </section>
        ))}
      </div>

      {/* ── Trigger buttons ──────────────────────────────────────────────────── */}
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          borderTop: '1px solid #e5e7eb',
          paddingTop: 24,
        }}>
        <p css={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
          Each button fires a live notification with the corresponding style
          override applied. Because multiple <code>&lt;Notification&gt;</code>{' '}
          instances are mounted in this story (one per preset), each button
          dispatches to <em>all</em> instances — you will see a card appear in
          every style simultaneously.
        </p>
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {STYLE_PRESETS.map((preset) => (
            <Button
              key={preset.label}
              variant="secondary"
              size="small"
              onClick={() =>
                showNotification({
                  variant: NotificationVariants.default,
                  title: 'Name Surname',
                  date: SAMPLE_DATE,
                  description: SAMPLE_DESCRIPTION,
                  cancelText: 'Dismiss',
                  submitText: 'View',
                  onClose: () => {},
                  onSubmit: () => {},
                })
              }>
              {preset.label}
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
          'Demonstrates the `styles` prop per-slot override system. ' +
          'Pass a `NotificationStyleOverrides` object to `<Notification>` to customize any part of the card ' +
          '— background, border-radius, title color, date style, icon tint, close icon, and action buttons — ' +
          'without touching the global theme. Three presets: **Branded card** (indigo), **Minimal monochrome** (flat), **Warning style** (amber).',
      },
    },
  },
};

// ─── Auto Dismiss (timeout + maxAmount) ──────────────────────────────────────

export const AutoDismiss: Story = {
  render: (args) => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        padding: '40px 32px',
      }}>
      <Notification {...args} />

      <div
        css={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: '16px 20px',
          maxWidth: 480,
          width: '100%',
          fontSize: 13,
          lineHeight: '20px',
          color: '#374151',
        }}>
        <strong>How it works</strong>
        <ul css={{ margin: '8px 0 0', paddingLeft: 18 }}>
          <li>
            Component-level <code>timeout</code> is <strong>5 000 ms</strong> —
            all notifications auto-dismiss after 5 s by default.
          </li>
          <li>
            The <em>persistent</em> buttons override this with{' '}
            <code>{'showNotification({ timeout: undefined })'}</code> — those
            notifications stay until closed.
          </li>
          <li>
            <code>maxAmount</code> is <strong>4</strong> — when the stack is
            full the oldest notification is dropped when a new one arrives.
          </li>
        </ul>
      </div>

      {/* Timed notifications */}
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          width: '100%',
          maxWidth: 480,
        }}>
        <p
          css={{
            margin: 0,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#6b7280',
          }}>
          Auto-dismiss in 5 s
        </p>
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(
            [
              NotificationVariants.default,
              NotificationVariants.neutral,
              NotificationVariants.dark,
            ] as const
          ).map((variant) => (
            <Button
              key={variant}
              variant="secondary"
              size="small"
              onClick={() =>
                showNotification({
                  variant,
                  title: 'Name Surname',
                  date: 'Just now',
                  description: SAMPLE_DESCRIPTION,
                })
              }>
              {variant}
            </Button>
          ))}
        </div>
      </div>

      {/* Persistent override */}
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          width: '100%',
          maxWidth: 480,
        }}>
        <p
          css={{
            margin: 0,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#6b7280',
          }}>
          Persistent override (<code>timeout: undefined</code>)
        </p>
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(
            [
              NotificationVariants.default,
              NotificationVariants.neutral,
              NotificationVariants.dark,
            ] as const
          ).map((variant) => (
            <Button
              key={`${variant}-persistent`}
              variant="secondary"
              size="small"
              onClick={() =>
                showNotification({
                  variant,
                  title: 'Name Surname',
                  date: '2 hours ago',
                  description:
                    'This notification will stay until manually closed.',
                  timeout: undefined,
                  cancelText: 'Dismiss',
                  onClose: () => {},
                })
              }>
              {variant} (persistent)
            </Button>
          ))}
        </div>
      </div>
    </div>
  ),
  args: {
    timeout: 5000,
    maxAmount: 4,
    withShadow: true,
    position: NotificationPositions.rightBottom,
  },
  parameters: {
    docs: {
      description: {
        story:
          'By default `<Notification>` is **persistent** (no `timeout`). ' +
          'This story mounts the component with `timeout: 5000` so notifications auto-dismiss after 5 s. ' +
          'Individual notifications can still override this by passing `timeout: undefined` to `showNotification` — ' +
          'demonstrated in the second row of buttons. `maxAmount: 4` caps the visible stack.',
      },
    },
  },
};
