/**
 * Integration tests for the Toast + showToast Observer flow.
 *
 * Architecture under test:
 *   showToast(params)
 *     → toastObserver.dispatch(params)
 *       → Toast subscription callback (registered in useEffect)
 *         → setToasts(...)
 *           → createPortal renders ToastItem into the target container
 *
 * Notes:
 * - RTL's `render` flushes effects synchronously (wrapped in act), so by the
 *   time `render` returns the observer subscription is already in place.
 * - `act(async () => showToast(...))` flushes the resulting React state update
 *   before assertions run.
 * - Portal content is rendered into `document.body`, which is also RTL's
 *   default `baseElement`, so `screen.*` queries find portal nodes correctly.
 * - Each <Toast> instance subscribes under a unique `useId()` key, so tests
 *   are fully isolated — RTL's afterEach cleanup unmounts the component and
 *   triggers the useEffect teardown (unsubscribe).
 * - Timer tests use jest.useFakeTimers() to control auto-dismiss without
 *   waiting for real time to pass.
 */

import { act, screen, within } from '@testing-library/react';

import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import Toast from './Toast';
import { showToast } from './toastObserver';
import { ToastVariants } from './types';

// Wrap showToast in act() so React flushes the resulting state update before assertions.
async function fireToast(params: Parameters<typeof showToast>[0]) {
  await act(() => showToast(params));
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('Toast', () => {
  describe('initial state', () => {
    it('renders nothing when no toasts have been dispatched', () => {
      render(<Toast />);
      expect(
        screen.queryByRole('button', { name: /close toast/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('showToast integration', () => {
    it('shows a toast card in the portal after showToast is called', async () => {
      render(<Toast />);

      await fireToast({ variant: ToastVariants.secondary, title: 'Saved!' });

      expect(screen.getByText('Saved!')).toBeInTheDocument();
    });

    it('renders the description text when provided', async () => {
      render(<Toast />);

      await fireToast({
        variant: ToastVariants.neutral,
        title: 'FYI',
        description: 'Some context here.',
      });

      expect(screen.getByText('Some context here.')).toBeInTheDocument();
    });

    it('renders multiple toasts for multiple showToast calls', async () => {
      render(<Toast />);

      await fireToast({
        variant: ToastVariants.secondary,
        title: 'First toast',
      });
      await fireToast({ variant: ToastVariants.dark, title: 'Second toast' });

      expect(screen.getByText('First toast')).toBeInTheDocument();
      expect(screen.getByText('Second toast')).toBeInTheDocument();
    });
  });

  describe('default prop pass-through', () => {
    it('shows the cancel button using component-level cancelText when onClose is provided', async () => {
      render(<Toast cancelText="Dismiss" timeout={undefined} />);

      await fireToast({
        variant: ToastVariants.secondary,
        title: 'Hi',
        onClose: jest.fn(),
      });

      expect(screen.getByText('Dismiss')).toBeInTheDocument();
    });

    it('shows the submit button using component-level submitText when onSubmit is provided', async () => {
      render(<Toast submitText="Confirm" timeout={undefined} />);

      await fireToast({
        variant: ToastVariants.secondary,
        title: 'Hi',
        onSubmit: jest.fn(),
      });

      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('per-toast cancelText from showToast overrides the component-level default', async () => {
      render(<Toast cancelText="Global dismiss" timeout={undefined} />);

      await fireToast({
        variant: ToastVariants.secondary,
        title: 'Hi',
        cancelText: 'Per-toast dismiss',
        onClose: jest.fn(),
      });

      expect(screen.getByText('Per-toast dismiss')).toBeInTheDocument();
      expect(screen.queryByText('Global dismiss')).not.toBeInTheDocument();
    });

    it('per-toast size from showToast overrides the component-level size (smoke test)', async () => {
      render(<Toast size={NotificationSizes.small} timeout={undefined} />);

      await fireToast({
        variant: ToastVariants.secondary,
        title: 'Large toast',
        size: NotificationSizes.large,
      });

      expect(screen.getByText('Large toast')).toBeInTheDocument();
    });
  });

  describe('timeout precedence', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('auto-dismisses using the component-level timeout', async () => {
      render(<Toast timeout={3000} />);
      await fireToast({ variant: ToastVariants.secondary, title: 'Auto' });

      act(() => jest.advanceTimersByTime(3000));

      expect(screen.queryByText('Auto')).not.toBeInTheDocument();
    });

    it('per-toast timeout overrides the component-level default', async () => {
      render(<Toast timeout={10000} />);
      await fireToast({
        variant: ToastVariants.secondary,
        title: 'Quick',
        timeout: 1000,
      });

      act(() => jest.advanceTimersByTime(1000));

      expect(screen.queryByText('Quick')).not.toBeInTheDocument();
    });

    it('per-toast timeout: undefined disables auto-dismiss even when component has a timeout', async () => {
      render(<Toast timeout={2000} />);
      await fireToast({
        variant: ToastVariants.secondary,
        title: 'Persistent',
        timeout: undefined,
      });

      act(() => jest.advanceTimersByTime(60_000));

      expect(screen.getByText('Persistent')).toBeInTheDocument();
    });

    it('does not auto-dismiss when component timeout is undefined', async () => {
      render(<Toast timeout={undefined} />);
      await fireToast({ variant: ToastVariants.secondary, title: 'No timer' });

      act(() => jest.advanceTimersByTime(5_000));

      expect(screen.getByText('No timer')).toBeInTheDocument();
    });
  });

  describe('maxAmount', () => {
    it('limits visible toasts for top-* positions — drops the oldest (end of array)', async () => {
      render(
        <Toast
          maxAmount={2}
          position={NotificationPositions.rightTop}
          timeout={undefined}
        />,
      );

      await fireToast({ variant: ToastVariants.secondary, title: 'First' });
      await fireToast({ variant: ToastVariants.secondary, title: 'Second' });
      await fireToast({ variant: ToastVariants.secondary, title: 'Third' });

      expect(screen.queryByText('First')).not.toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText('Third')).toBeInTheDocument();
    });

    it('limits visible toasts for bottom-* positions — drops the oldest (start of array)', async () => {
      render(
        <Toast
          maxAmount={2}
          position={NotificationPositions.rightBottom}
          timeout={undefined}
        />,
      );

      await fireToast({ variant: ToastVariants.secondary, title: 'First' });
      await fireToast({ variant: ToastVariants.secondary, title: 'Second' });
      await fireToast({ variant: ToastVariants.secondary, title: 'Third' });

      expect(screen.queryByText('First')).not.toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText('Third')).toBeInTheDocument();
    });

    it('keeps all toasts when count is below maxAmount', async () => {
      render(<Toast maxAmount={5} timeout={undefined} />);

      await fireToast({ variant: ToastVariants.secondary, title: 'Alpha' });
      await fireToast({ variant: ToastVariants.secondary, title: 'Beta' });

      expect(screen.getByText('Alpha')).toBeInTheDocument();
      expect(screen.getByText('Beta')).toBeInTheDocument();
    });

    it('applies no limit when maxAmount is omitted', async () => {
      render(<Toast timeout={undefined} />);

      for (let i = 1; i <= 6; i++) {
        await fireToast({
          variant: ToastVariants.secondary,
          title: `Toast ${i}`,
        });
      }

      for (let i = 1; i <= 6; i++) {
        expect(screen.getByText(`Toast ${i}`)).toBeInTheDocument();
      }
    });
  });

  describe('semantic variants', () => {
    it.each([
      ToastVariants.success,
      ToastVariants.warning,
      ToastVariants.error,
      ToastVariants.primary,
    ])(
      'renders variant "%s" with title and description via showToast',
      async (variant) => {
        render(<Toast timeout={undefined} />);

        await fireToast({
          variant,
          title: `${variant} title`,
          description: `${variant} description`,
        });

        expect(screen.getByText(`${variant} title`)).toBeInTheDocument();
        expect(screen.getByText(`${variant} description`)).toBeInTheDocument();
      },
    );

    it('renders a semantic variant with progress bar without throwing', async () => {
      render(<Toast timeout={4000} withProgress />);

      await fireToast({
        variant: ToastVariants.success,
        title: 'All done',
        withProgress: true,
      });

      expect(screen.getByText('All done')).toBeInTheDocument();
    });
  });

  describe('renderProp', () => {
    it('renders custom content from renderProp', async () => {
      render(<Toast timeout={undefined} />);

      await fireToast({
        variant: ToastVariants.secondary,
        renderProp: () => <div>Custom toast content</div>,
      });

      expect(screen.getByText('Custom toast content')).toBeInTheDocument();
    });
  });

  describe('portal target', () => {
    it('portals toasts into a custom container when containerSelector matches', async () => {
      const customContainer = document.createElement('div');
      customContainer.id = 'custom-toast-portal';
      document.body.appendChild(customContainer);

      render(
        <Toast containerSelector="#custom-toast-portal" timeout={undefined} />,
      );
      await fireToast({
        variant: ToastVariants.secondary,
        title: 'Custom portal',
      });

      expect(
        within(customContainer).getByText('Custom portal'),
      ).toBeInTheDocument();

      document.body.removeChild(customContainer);
    });

    it('falls back to document.body when containerSelector does not match', async () => {
      render(<Toast containerSelector="#does-not-exist" timeout={undefined} />);
      await fireToast({ variant: ToastVariants.secondary, title: 'Fallback' });

      expect(screen.getByText('Fallback')).toBeInTheDocument();
    });
  });
});
