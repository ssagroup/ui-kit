/**
 * Integration tests for the Alert + showAlert Observer flow.
 *
 * Architecture under test:
 *   showAlert(params)
 *     → alertObserver.dispatch(params)
 *       → Alert subscription callback (registered in useEffect)
 *         → setAlerts(...)
 *           → createPortal renders AlertItem into the target container
 *
 * Notes:
 * - RTL's `render` flushes effects synchronously (wrapped in act), so by the
 *   time `render` returns the observer subscription is already in place.
 * - `act(async () => showAlert(...))` flushes the resulting React state update
 *   before assertions run.
 * - Portal content is rendered into `document.body`, which is also RTL's
 *   default `baseElement`, so `screen.*` queries find portal nodes correctly.
 * - Each <Alert> instance subscribes under a unique `useId()` key, so tests
 *   are fully isolated — RTL's afterEach cleanup unmounts the component and
 *   triggers the useEffect teardown (unsubscribe).
 */

import { act, screen, within } from '@testing-library/react';

import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import Alert from './Alert';
import { showAlert } from './alertObserver';
import { AlertVariants } from './types';

// Wrap showAlert in act() so React flushes the resulting state update before assertions.
async function fireAlert(params: Parameters<typeof showAlert>[0]) {
  await act(() => showAlert(params));
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Alert', () => {
  describe('initial state', () => {
    it('renders nothing when no alerts have been dispatched', () => {
      render(<Alert />);
      expect(
        screen.queryByRole('button', { name: /close alert/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('showAlert integration', () => {
    it('shows an alert card in the portal after showAlert is called', async () => {
      render(<Alert />);

      await fireAlert({ variant: AlertVariants.success, title: 'Saved!' });

      expect(screen.getByText('Saved!')).toBeInTheDocument();
    });

    it('renders the description text when provided', async () => {
      render(<Alert />);

      await fireAlert({
        variant: AlertVariants.primary,
        title: 'FYI',
        description: 'Some context here.',
      });

      expect(screen.getByText('Some context here.')).toBeInTheDocument();
    });

    it('renders multiple alerts for multiple showAlert calls', async () => {
      render(<Alert />);

      await fireAlert({ variant: AlertVariants.success, title: 'First alert' });
      await fireAlert({ variant: AlertVariants.error, title: 'Second alert' });

      expect(screen.getByText('First alert')).toBeInTheDocument();
      expect(screen.getByText('Second alert')).toBeInTheDocument();
    });
  });

  describe('default prop pass-through', () => {
    it('shows the cancel button using component-level cancelText when onClose is provided', async () => {
      render(<Alert cancelText="Dismiss" />);

      await fireAlert({
        variant: AlertVariants.success,
        title: 'Hi',
        onClose: jest.fn(),
      });

      expect(screen.getByText('Dismiss')).toBeInTheDocument();
    });

    it('shows the submit button using component-level submitText when onSubmit is provided', async () => {
      render(<Alert submitText="Confirm" />);

      await fireAlert({
        variant: AlertVariants.success,
        title: 'Hi',
        onSubmit: jest.fn(),
      });

      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('per-alert cancelText from showAlert overrides the component-level default', async () => {
      render(<Alert cancelText="Global dismiss" />);

      await fireAlert({
        variant: AlertVariants.success,
        title: 'Hi',
        cancelText: 'Per-alert dismiss',
        onClose: jest.fn(),
      });

      expect(screen.getByText('Per-alert dismiss')).toBeInTheDocument();
      expect(screen.queryByText('Global dismiss')).not.toBeInTheDocument();
    });

    it('per-alert size from showAlert overrides the component-level size (smoke test)', async () => {
      render(<Alert size={NotificationSizes.small} />);

      await fireAlert({
        variant: AlertVariants.success,
        title: 'Large alert',
        size: NotificationSizes.large,
      });

      expect(screen.getByText('Large alert')).toBeInTheDocument();
    });
  });

  describe('maxAmount', () => {
    it('limits visible alerts for top-* positions — drops the oldest (end of array)', async () => {
      render(<Alert maxAmount={2} position={NotificationPositions.rightTop} />);

      await fireAlert({ variant: AlertVariants.success, title: 'First' });
      await fireAlert({ variant: AlertVariants.success, title: 'Second' });
      await fireAlert({ variant: AlertVariants.success, title: 'Third' });

      // 'First' was the oldest; with maxAmount=2 and a top position it gets trimmed
      expect(screen.queryByText('First')).not.toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText('Third')).toBeInTheDocument();
    });

    it('limits visible alerts for bottom-* positions — drops the oldest (start of array)', async () => {
      render(
        <Alert maxAmount={2} position={NotificationPositions.rightBottom} />,
      );

      await fireAlert({ variant: AlertVariants.success, title: 'First' });
      await fireAlert({ variant: AlertVariants.success, title: 'Second' });
      await fireAlert({ variant: AlertVariants.success, title: 'Third' });

      expect(screen.queryByText('First')).not.toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
      expect(screen.getByText('Third')).toBeInTheDocument();
    });

    it('keeps all alerts when count is below maxAmount', async () => {
      render(<Alert maxAmount={5} position={NotificationPositions.rightTop} />);

      await fireAlert({ variant: AlertVariants.success, title: 'Alpha' });
      await fireAlert({ variant: AlertVariants.success, title: 'Beta' });

      expect(screen.getByText('Alpha')).toBeInTheDocument();
      expect(screen.getByText('Beta')).toBeInTheDocument();
    });

    it('applies no limit when maxAmount is omitted', async () => {
      render(<Alert />);

      for (let i = 1; i <= 6; i++) {
        await fireAlert({
          variant: AlertVariants.success,
          title: `Alert ${i}`,
        });
      }

      for (let i = 1; i <= 6; i++) {
        expect(screen.getByText(`Alert ${i}`)).toBeInTheDocument();
      }
    });
  });

  describe('portal target', () => {
    it('portals alerts into a custom container when containerSelector matches', async () => {
      const customContainer = document.createElement('div');
      customContainer.id = 'custom-portal';
      document.body.appendChild(customContainer);

      render(<Alert containerSelector="#custom-portal" />);
      await fireAlert({
        variant: AlertVariants.primary,
        title: 'Custom portal',
      });

      expect(
        within(customContainer).getByText('Custom portal'),
      ).toBeInTheDocument();

      document.body.removeChild(customContainer);
    });

    it('falls back to document.body when containerSelector does not match any element', async () => {
      render(<Alert containerSelector="#does-not-exist" />);
      await fireAlert({ variant: AlertVariants.success, title: 'Fallback' });

      // Still renders — just in document.body instead of the missing selector
      expect(screen.getByText('Fallback')).toBeInTheDocument();
    });
  });
});
