import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@components/Button';
import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import Toast from './Toast';
import { ToastItem } from './ToastItem';
import { showToast } from './toastObserver';
import { ToastVariants } from './types';

const SAMPLE_DESCRIPTION =
  'You can insert a description for the message here. The text relates to the action that has been performed.';

export default {
  title: 'Components/Notification/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      story: { height: '360px' },
      description: {
        component:
          'Mount `<Toast>` once in your app root, then call `showToast({ variant, title, ... })` from anywhere. ' +
          'Toasts auto-dismiss after `timeout` ms (default 4 s), portal to `document.body`, and stack by position.',
      },
    },
  },
  argTypes: {
    timeout: {
      description:
        'Default auto-dismiss duration in ms. Pass `undefined` to disable auto-dismiss entirely. ' +
        'Individual toasts can override this via `showToast({ timeout })`. Has no effect on the progress bar when `undefined`.',
      control: { type: 'number', min: 500, max: 15000, step: 500 },
    },
    withProgress: {
      description:
        'Show an animated drain bar at the bottom of every toast by default. ' +
        'Suppressed automatically when `timeout` is `undefined`. Per-toast override available via `showToast({ withProgress })`.',
      control: 'boolean',
    },
    maxAmount: {
      description:
        'Maximum toasts visible at once. Oldest is dropped when exceeded — from the bottom for `*-top` positions, from the top for `*-bottom` positions.',
      control: { type: 'number', min: 1, max: 20, step: 1 },
    },
    position: {
      description: 'Where in the viewport the toast stack appears.',
      options: Object.values(NotificationPositions),
      control: { type: 'select' },
      table: { type: { summary: 'NotificationPositions' } },
    },
    size: {
      description: 'Width of each toast card.',
      options: Object.values(NotificationSizes),
      control: { type: 'inline-radio' },
      table: { type: { summary: 'NotificationSizes' } },
    },
    withShadow: {
      description: 'Drop shadow on each toast card.',
      control: 'boolean',
    },
    withBorder: {
      description: '1 px border on each toast card.',
      control: 'boolean',
    },
    animationDuration: {
      description: 'Slide-in duration in ms.',
      control: { type: 'number', min: 0, max: 2000, step: 50 },
    },
    containerSelector: {
      description:
        'CSS selector for the portal target. Falls back to `document.body` when omitted or not found.',
      control: 'text',
    },
  },
  args: {
    position: NotificationPositions.rightBottom,
    size: NotificationSizes.small,
    withShadow: true,
    withBorder: false,
    timeout: 4000,
    withProgress: false,
    animationDuration: 300,
  },
} as Meta<typeof Toast>;

type Story = StoryObj<typeof Toast>;

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
  /** Theme key or arbitrary CSS color passed to `color` prop */
  color: string;
  /** When set, overrides the auto-darkened progress bar color */
  progressColor?: string;
  note?: string;
}

/**
 * Four presets covering each quadrant of the color/contrast matrix:
 *   light theme color · dark theme color · light custom CSS · dark custom CSS
 * The fifth entry demonstrates an explicit `progressColor` override.
 */
const COLOR_PRESETS: ColorPreset[] = [
  {
    label: 'greenLighter — theme, light bg',
    color: 'greenLighter',
    note: 'Light background → dark text + darkened-green icon & progress',
    progressColor: 'purple',
  },
  {
    label: 'purple — theme, dark bg',
    color: 'purple',
    note: 'Dark background → white text/icon, darkened-purple progress',
  },
  {
    label: 'turquoiseLighter — theme, light bg',
    color: 'turquoiseLighter',
    note: 'Light background → dark text, custom progressColor overrides the auto-darkened teal',
    progressColor: 'rgba(123, 71, 235, 1)', // purple from theme — explicit override
  },
  {
    label: '#1e293b — custom CSS, dark bg',
    color: '#1e293b',
    note: 'Arbitrary hex color → white text/icon, darkened shade for progress',
    progressColor: 'purple',
  },
  {
    label: '#f59e0b — custom CSS, light bg',
    color: '#f59e0b',
    note: 'Amber hex → dark text, darkened amber progress',
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
      <Toast {...args} />

      {/* ── Static preview grid ─────────────────────────────────────────────── */}
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}>
        {(
          [
            ToastVariants.default,
            ToastVariants.neutral,
            ToastVariants.dark,
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
              {/* Expanded */}
              <ToastItem
                {...staticBase}
                variant={variant}
                title="Headline"
                description={SAMPLE_DESCRIPTION}
                withShadow
              />
              {/* Collapsed */}
              <ToastItem
                {...staticBase}
                variant={variant}
                title="Headline"
                withShadow
              />
              {/* With action buttons */}
              <ToastItem
                {...staticBase}
                variant={variant}
                title="Unsaved changes"
                description="Do you want to save before leaving?"
                cancelText="Discard"
                submitText="Save"
                onClose={NOOP_REMOVE}
                onSubmit={NOOP_REMOVE}
                withShadow
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
        <p
          css={{
            margin: 0,
            fontSize: 13,
            color: '#6b7280',
          }}>
          Click to fire a live toast via the portal. Adjust controls in the{' '}
          <strong>Controls</strong> panel to change position, timeout, and more.
        </p>

        {/* Expanded — with description */}
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(
            [
              ToastVariants.default,
              ToastVariants.neutral,
              ToastVariants.dark,
            ] as const
          ).map((variant) => (
            <Button
              key={variant}
              variant="secondary"
              size="small"
              onClick={() =>
                showToast({
                  variant,
                  title: 'Headline',
                  description: SAMPLE_DESCRIPTION,
                })
              }>
              {variant}
            </Button>
          ))}
        </div>

        {/* Collapsed — no description */}
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(
            [
              ToastVariants.default,
              ToastVariants.neutral,
              ToastVariants.dark,
            ] as const
          ).map((variant) => (
            <Button
              key={`${variant}-collapsed`}
              variant="secondary"
              size="small"
              onClick={() => showToast({ variant, title: 'Headline' })}>
              {variant} (no description)
            </Button>
          ))}
        </div>

        {/* With progress bar */}
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(
            [
              ToastVariants.default,
              ToastVariants.neutral,
              ToastVariants.dark,
            ] as const
          ).map((variant) => (
            <Button
              key={`${variant}-progress`}
              variant="secondary"
              size="small"
              onClick={() =>
                showToast({
                  variant,
                  title: 'Headline',
                  description: SAMPLE_DESCRIPTION,
                  withProgress: true,
                })
              }>
              {variant} + progress
            </Button>
          ))}
        </div>

        {/* With action buttons */}
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {(
            [
              ToastVariants.default,
              ToastVariants.neutral,
              ToastVariants.dark,
            ] as const
          ).map((variant) => (
            <Button
              key={`${variant}-actions`}
              variant="secondary"
              size="small"
              onClick={() =>
                showToast({
                  variant,
                  title: 'Unsaved changes',
                  description: 'Do you want to save before leaving?',
                  cancelText: 'Discard',
                  submitText: 'Save',
                  onClose: () => {},
                  onSubmit: () => {},
                })
              }>
              {variant} + actions
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
          'The **static preview** grid shows all three variants in expanded and collapsed layouts without any portal or timer. ' +
          'The **trigger buttons** below fire live toasts via the portal — use the Controls panel to adjust `timeout`, `withProgress`, `position`, and more.',
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
      <Toast {...args} withProgress timeout={6000} />

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
              {/* Expanded with progress bar */}
              <ToastItem
                {...staticBase}
                variant={ToastVariants.default}
                color={preset.color}
                progressColor={preset.progressColor}
                title="Headline"
                description={SAMPLE_DESCRIPTION}
                withShadow
                withBorder
                withProgress
                timeout={6000}
              />
              {/* Collapsed */}
              <ToastItem
                {...staticBase}
                variant={ToastVariants.default}
                color={preset.color}
                progressColor={preset.progressColor}
                title="Headline"
                withShadow
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
          gap: 12,
          borderTop: '1px solid #e5e7eb',
          paddingTop: 24,
        }}>
        <p css={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
          Fire live toasts with each color preset. Progress bar drains over 6 s
          — hover to pause.
        </p>
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLOR_PRESETS.map((preset) => (
            <Button
              key={preset.label}
              variant="secondary"
              size="small"
              onClick={() =>
                showToast({
                  variant: ToastVariants.default,
                  color: preset.color,
                  progressColor: preset.progressColor,
                  title: 'Headline',
                  description: SAMPLE_DESCRIPTION,
                  withProgress: true,
                  timeout: 6000,
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
          'Demonstrates the `color` prop auto-contrast system across light and dark backgrounds, ' +
          'and the `progressColor` override. ' +
          'Two **light** theme colors (`greenLighter`, `turquoiseLighter`), one **dark** theme color (`purple`), ' +
          'and two **custom CSS** colors (`#1e293b` dark slate, `#f59e0b` amber). ' +
          'The `turquoiseLighter` preset also sets a contrasting `progressColor` (purple) to show the explicit override.',
      },
    },
  },
};

// ─── Persistent (no timeout) ──────────────────────────────────────────────────

export const Persistent: Story = {
  render: (args) => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        padding: '40px 32px',
      }}>
      <Toast {...args} />

      <div
        css={{
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: '16px 20px',
          maxWidth: 440,
          width: '100%',
          fontSize: 13,
          lineHeight: '20px',
          color: '#374151',
        }}>
        <strong>How it works</strong>
        <ul css={{ margin: '8px 0 0', paddingLeft: 18 }}>
          <li>
            <code>timeout</code> is set to <code>undefined</code> — toasts never
            auto-dismiss.
          </li>
          <li>
            <code>maxAmount</code> is <strong>5</strong> — once the stack is
            full the oldest toast is dropped when a new one arrives.
          </li>
          <li>
            Each toast still has a close (×) button so the user can dismiss
            manually.
          </li>
        </ul>
      </div>

      <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {(
          [
            ToastVariants.default,
            ToastVariants.neutral,
            ToastVariants.dark,
          ] as const
        ).map((variant) => (
          <Button
            key={variant}
            variant="secondary"
            size="small"
            onClick={() =>
              showToast({
                variant,
                title: 'Persistent toast',
                description: SAMPLE_DESCRIPTION,
                timeout: undefined,
                onClose: () => {},
              })
            }>
            {variant}
          </Button>
        ))}
      </div>
    </div>
  ),
  args: {
    timeout: undefined,
    maxAmount: 5,
    withShadow: true,
    position: NotificationPositions.rightBottom,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `timeout` is `undefined` toasts stay until the user closes them — ' +
          'useful for critical messages that must be acknowledged. ' +
          '`maxAmount: 5` caps the stack; firing more than 5 toasts drops the oldest automatically. ' +
          'Progress bar is suppressed regardless of `withProgress` when there is no `timeout`.',
      },
    },
  },
};

// ─── Render prop ──────────────────────────────────────────────────────────────

const RENDER_PROP_PRESETS = [
  {
    label: 'Upload progress',
    render: (close: () => void) => (
      <div
        css={{
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          width: '100%',
        }}>
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <span css={{ fontWeight: 600, fontSize: 14 }}>
            Uploading report.pdf
          </span>
          <button
            type="button"
            onClick={close}
            css={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
              color: '#6b7280',
              padding: 0,
            }}>
            ×
          </button>
        </div>
        <div
          css={{
            height: 6,
            borderRadius: 9999,
            background: '#e5e7eb',
            overflow: 'hidden',
          }}>
          <div
            css={{
              height: '100%',
              width: '62%',
              borderRadius: 9999,
              background: '#6366f1',
            }}
          />
        </div>
        <span css={{ fontSize: 12, color: '#6b7280' }}>
          62% — 1.4 MB / 2.3 MB
        </span>
      </div>
    ),
  },
  {
    label: 'Update available',
    render: (close: () => void) => (
      <div
        css={{
          padding: '14px 16px',
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
          width: '100%',
        }}>
        <span css={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>🚀</span>
        <div css={{ flex: 1, minWidth: 0 }}>
          <p css={{ margin: '0 0 4px', fontWeight: 600, fontSize: 14 }}>
            v2.4 is ready
          </p>
          <p css={{ margin: '0 0 10px', fontSize: 13, color: '#6b7280' }}>
            Includes performance improvements and bug fixes.
          </p>
          <div css={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={close}
              css={{
                background: '#6366f1',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                padding: '5px 14px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}>
              Update now
            </button>
            <button
              type="button"
              onClick={close}
              css={{
                background: 'none',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                padding: '5px 14px',
                fontSize: 13,
                cursor: 'pointer',
                color: '#374151',
              }}>
              Later
            </button>
          </div>
        </div>
      </div>
    ),
  },
];

export const RenderProp: Story = {
  render: (args) => (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        padding: '40px 32px',
        maxWidth: 860,
      }}>
      <Toast {...args} />

      {/* ── Static preview ────────────────────────────────────────────────── */}
      <div css={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {RENDER_PROP_PRESETS.map((preset) => (
          <section key={preset.label}>
            <p
              css={{
                margin: '0 0 10px',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#6b7280',
              }}>
              {preset.label}
            </p>
            <ToastItem
              id="preview"
              variant={ToastVariants.default}
              size={NotificationSizes.small}
              cancelText=""
              submitText=""
              animationDuration={0}
              position={NotificationPositions.rightBottom}
              onRemove={NOOP_REMOVE}
              withShadow
              withBorder
              renderProp={preset.render}
            />
          </section>
        ))}
      </div>

      {/* ── Trigger buttons ───────────────────────────────────────────────── */}
      <div
        css={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
        <p css={{ margin: 0, fontSize: 13, color: '#6b7280' }}>
          Fire live toasts with fully custom content via <code>renderProp</code>
          .
        </p>
        <div css={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {RENDER_PROP_PRESETS.map((preset) => (
            <Button
              key={preset.label}
              variant="secondary"
              size="small"
              onClick={() =>
                showToast({
                  variant: ToastVariants.default,
                  renderProp: preset.render,
                })
              }>
              {preset.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  ),
  args: {
    timeout: undefined,
    withShadow: true,
    withBorder: true,
    position: NotificationPositions.rightBottom,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'When `renderProp` is provided, it **fully replaces the inner content** of the toast card. ' +
          'The outer wrapper (border-radius, shadow, border) still renders — only the content area is custom. ' +
          'The `renderProp` receives a `close` callback so custom content can dismiss the toast. ' +
          'Progress bar is suppressed (no `timeout`). ' +
          'Two presets: an upload progress bar and a version-update prompt with action buttons.',
      },
    },
  },
};
