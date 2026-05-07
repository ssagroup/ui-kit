/**
 * Integration tests for the Notification + showNotification Observer flow.
 *
 * Architecture under test:
 *   showNotification(params)
 *     → notificationObserver.dispatch(params)
 *       → Notification subscription callback (registered in useEffect)
 *         → setNotifications(...)
 *           → createPortal renders NotificationItem into the target container
 *
 * Notes:
 * - RTL's `render` flushes effects synchronously (wrapped in act), so by the
 *   time `render` returns the observer subscription is already in place.
 * - `act(async () => showNotification(...))` flushes the resulting React state
 *   update before assertions run.
 * - Portal content is rendered into `document.body`, which is also RTL's
 *   default `baseElement`, so `screen.*` queries find portal nodes correctly.
 * - Each <Notification> instance subscribes under a unique `useId()` key, so
 *   tests are fully isolated — RTL's afterEach cleanup unmounts the component
 *   and triggers the useEffect teardown (unsubscribe).
 * - Timer tests use jest.useFakeTimers() to control auto-dismiss without
 *   waiting for real time to pass.
 */

import { act, screen, within } from '@testing-library/react';

import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import Notification from './Notification';
import { showNotification } from './notificationObserver';
import { NotificationVariants } from './types';

// Wrap showNotification in act() so React flushes the resulting state update.
async function fireNotification(
  params: Parameters<typeof showNotification>[0],
) {
  await act(() => showNotification(params));
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Notification', () => {
  describe('initial state', () => {
    it('renders nothing when no notifications have been dispatched', () => {
      render(<Notification />);
      expect(
        screen.queryByRole('button', { name: /close notification/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('showNotification integration', () => {
    it('shows a notification card in the portal after showNotification is called', async () => {
      render(<Notification />);

      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Jane Doe',
      });

      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });

    it('renders the date when provided', async () => {
      render(<Notification />);

      await fireNotification({
        variant: NotificationVariants.neutral,
        title: 'Jane Doe',
        date: '11 days ago',
      });

      expect(screen.getByText('11 days ago')).toBeInTheDocument();
    });

    it('renders the description when provided', async () => {
      render(<Notification />);

      await fireNotification({
        variant: NotificationVariants.neutral,
        title: 'Jane Doe',
        description: 'Left a comment on your post.',
      });

      expect(
        screen.getByText('Left a comment on your post.'),
      ).toBeInTheDocument();
    });

    it('renders multiple notifications for multiple showNotification calls', async () => {
      render(<Notification />);

      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'First notification',
      });
      await fireNotification({
        variant: NotificationVariants.dark,
        title: 'Second notification',
      });

      expect(screen.getByText('First notification')).toBeInTheDocument();
      expect(screen.getByText('Second notification')).toBeInTheDocument();
    });
  });

  describe('default prop pass-through', () => {
    it('uses component-level cancelText when onClose is provided', async () => {
      render(<Notification cancelText="Dismiss" />);

      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Hi',
        onClose: jest.fn(),
      });

      expect(screen.getByText('Dismiss')).toBeInTheDocument();
    });

    it('uses component-level submitText when onSubmit is provided', async () => {
      render(<Notification submitText="View" />);

      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Hi',
        onSubmit: jest.fn(),
      });

      expect(screen.getByText('View')).toBeInTheDocument();
    });

    it('per-notification cancelText overrides the component-level default', async () => {
      render(<Notification cancelText="Global dismiss" />);

      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Hi',
        cancelText: 'Per-notification dismiss',
        onClose: jest.fn(),
      });

      expect(screen.getByText('Per-notification dismiss')).toBeInTheDocument();
      expect(screen.queryByText('Global dismiss')).not.toBeInTheDocument();
    });

    it('per-notification size from showNotification overrides the component-level size (smoke test)', async () => {
      render(<Notification size={NotificationSizes.small} />);

      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Large notification',
        size: NotificationSizes.large,
      });

      expect(screen.getByText('Large notification')).toBeInTheDocument();
    });
  });

  describe('persistent by default', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('does not auto-dismiss when no component-level timeout is set (default behavior)', async () => {
      render(<Notification />);
      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Persistent',
      });

      act(() => jest.advanceTimersByTime(60_000));

      expect(screen.getByText('Persistent')).toBeInTheDocument();
    });
  });

  describe('timeout precedence', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('auto-dismisses using the component-level timeout', async () => {
      render(<Notification timeout={3000} />);
      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Auto',
      });

      act(() => jest.advanceTimersByTime(3000));

      expect(screen.queryByText('Auto')).not.toBeInTheDocument();
    });

    it('per-notification timeout overrides the component-level default', async () => {
      render(<Notification timeout={10000} />);
      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Quick',
        timeout: 1000,
      });

      act(() => jest.advanceTimersByTime(1000));

      expect(screen.queryByText('Quick')).not.toBeInTheDocument();
    });

    it('per-notification timeout: undefined keeps notification persistent even when component has a timeout', async () => {
      render(<Notification timeout={2000} />);
      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Persistent override',
        timeout: undefined,
      });

      act(() => jest.advanceTimersByTime(60_000));

      expect(screen.getByText('Persistent override')).toBeInTheDocument();
    });
  });

  describe('maxAmount', () => {
    it('limits visible notifications for top-* positions — drops the oldest (end of array)', async () => {
      render(
        <Notification
          maxAmount={2}
          position={NotificationPositions.rightTop}
        />,
      );

      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'First',
      });
      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Second',
      });
      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Third',
      });

      expect(screen.queryByText('First')).not.toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText('Third')).toBeInTheDocument();
    });

    it('limits visible notifications for bottom-* positions — drops the oldest (start of array)', async () => {
      render(
        <Notification
          maxAmount={2}
          position={NotificationPositions.rightBottom}
        />,
      );

      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'First',
      });
      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Second',
      });
      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Third',
      });

      expect(screen.queryByText('First')).not.toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText('Third')).toBeInTheDocument();
    });

    it('keeps all notifications when count is below maxAmount', async () => {
      render(<Notification maxAmount={5} />);

      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Alpha',
      });
      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Beta',
      });

      expect(screen.getByText('Alpha')).toBeInTheDocument();
      expect(screen.getByText('Beta')).toBeInTheDocument();
    });

    it('applies no limit when maxAmount is omitted', async () => {
      render(<Notification />);

      for (let i = 1; i <= 6; i++) {
        await fireNotification({
          variant: NotificationVariants.secondary,
          title: `Notification ${i}`,
        });
      }

      for (let i = 1; i <= 6; i++) {
        expect(screen.getByText(`Notification ${i}`)).toBeInTheDocument();
      }
    });
  });

  describe('styles prop (style overrides pass-through)', () => {
    it('renders without throwing when styles overrides are provided', async () => {
      render(
        <Notification
          styles={{
            root: { borderRadius: 4 },
            title: { color: '#4338ca' },
          }}
        />,
      );

      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Styled notification',
      });

      expect(screen.getByText('Styled notification')).toBeInTheDocument();
    });
  });

  describe('portal target', () => {
    it('portals notifications into a custom container when containerSelector matches', async () => {
      const customContainer = document.createElement('div');
      customContainer.id = 'custom-notification-portal';
      document.body.appendChild(customContainer);

      render(<Notification containerSelector="#custom-notification-portal" />);
      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Custom portal',
      });

      expect(
        within(customContainer).getByText('Custom portal'),
      ).toBeInTheDocument();

      document.body.removeChild(customContainer);
    });

    it('falls back to document.body when containerSelector does not match', async () => {
      render(<Notification containerSelector="#does-not-exist" />);
      await fireNotification({
        variant: NotificationVariants.secondary,
        title: 'Fallback',
      });

      expect(screen.getByText('Fallback')).toBeInTheDocument();
    });
  });
});
