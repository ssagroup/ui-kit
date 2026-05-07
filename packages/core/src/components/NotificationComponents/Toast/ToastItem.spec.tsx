import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import { ToastItem, ToastItemProps } from './ToastItem';
import { ToastVariants } from './types';

// ─── Shared setup ─────────────────────────────────────────────────────────────

type PartialProps = Partial<Omit<ToastItemProps, 'onRemove'>> & {
  onRemove?: ToastItemProps['onRemove'];
};

function setup(props: PartialProps = {}) {
  const onRemove = props.onRemove ?? jest.fn();

  const result = render(
    <ToastItem
      id="test-toast"
      variant={ToastVariants.secondary}
      size={NotificationSizes.small}
      cancelText=""
      submitText=""
      animationDuration={0}
      position={NotificationPositions.rightBottom}
      {...props}
      onRemove={onRemove}
    />,
  );

  return { ...result, onRemove };
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('ToastItem', () => {
  describe('content rendering', () => {
    it('renders title text', () => {
      const { getByText } = setup({ title: 'File saved' });
      expect(getByText('File saved')).toBeInTheDocument();
    });

    it('renders description in expanded layout', () => {
      const { getByText } = setup({
        title: 'Title',
        description: 'Supporting detail.',
      });
      expect(getByText('Supporting detail.')).toBeInTheDocument();
    });

    it('does not render description when omitted (collapsed layout)', () => {
      const { queryByText } = setup({ title: 'Title only' });
      expect(queryByText('Supporting detail.')).not.toBeInTheDocument();
    });

    it.each(Object.values(ToastVariants))(
      'renders variant "%s" without throwing',
      (variant) => {
        expect(() => setup({ title: 'Title', variant })).not.toThrow();
      },
    );
  });

  describe('action buttons — conditional rendering', () => {
    it('renders cancel button when cancelText and onClose are both provided', () => {
      const { getByText } = setup({
        title: 'Title',
        cancelText: 'Dismiss',
        onClose: jest.fn(),
      });
      expect(getByText('Dismiss')).toBeInTheDocument();
    });

    it('does not render cancel button when onClose is missing', () => {
      const { queryByText } = setup({ title: 'Title', cancelText: 'Dismiss' });
      expect(queryByText('Dismiss')).not.toBeInTheDocument();
    });

    it('renders submit button when submitText and onSubmit are both provided', () => {
      const { getByText } = setup({
        title: 'Title',
        submitText: 'Save',
        onSubmit: jest.fn(),
      });
      expect(getByText('Save')).toBeInTheDocument();
    });

    it('does not render submit button when onSubmit is missing', () => {
      const { queryByText } = setup({ title: 'Title', submitText: 'Save' });
      expect(queryByText('Save')).not.toBeInTheDocument();
    });
  });

  describe('action button interactions', () => {
    it('cancel button calls onRemove and onClose', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      const { getByText, onRemove } = setup({
        title: 'Title',
        cancelText: 'Dismiss',
        onClose,
      });

      await user.click(getByText('Dismiss'));

      expect(onRemove).toHaveBeenCalledWith('test-toast');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('submit button calls onRemove and onSubmit', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      const { getByText, onRemove } = setup({
        title: 'Title',
        submitText: 'Save',
        onSubmit,
      });

      await user.click(getByText('Save'));

      expect(onRemove).toHaveBeenCalledWith('test-toast');
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders both action buttons when both callbacks and texts are provided', () => {
      const { getByText } = setup({
        title: 'Title',
        cancelText: 'Discard',
        onClose: jest.fn(),
        submitText: 'Save',
        onSubmit: jest.fn(),
      });
      expect(getByText('Discard')).toBeInTheDocument();
      expect(getByText('Save')).toBeInTheDocument();
    });
  });

  describe('auto-dismiss timer', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('calls onRemove after the timeout elapses', () => {
      const onRemove = jest.fn();
      setup({ title: 'Auto', timeout: 3000, onRemove });

      act(() => jest.advanceTimersByTime(3000));

      expect(onRemove).toHaveBeenCalledWith('test-toast');
    });

    it('calls onClose after the timeout elapses', () => {
      const onClose = jest.fn();
      setup({ title: 'Auto', timeout: 2000, onClose });

      act(() => jest.advanceTimersByTime(2000));

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does NOT auto-dismiss when timeout is undefined', () => {
      const onRemove = jest.fn();
      setup({ title: 'Persistent', timeout: undefined, onRemove });

      act(() => jest.advanceTimersByTime(60_000));

      expect(onRemove).not.toHaveBeenCalled();
    });

    it('does not fire before the timeout elapses', () => {
      const onRemove = jest.fn();
      setup({ title: 'Auto', timeout: 5000, onRemove });

      act(() => jest.advanceTimersByTime(4999));

      expect(onRemove).not.toHaveBeenCalled();
    });
  });

  describe('progress bar', () => {
    it('does not render when withProgress is false', () => {
      const { container } = setup({
        title: 'Title',
        withProgress: false,
        timeout: 4000,
      });
      // Progress bar container has a specific height style — absence = not rendered
      expect(
        container.querySelector('[style*="animation"]'),
      ).not.toBeInTheDocument();
    });

    it('does not render when timeout is undefined even if withProgress is true', () => {
      const { container } = setup({
        title: 'Title',
        withProgress: true,
        timeout: undefined,
      });
      expect(
        container.querySelector('[style*="animation"]'),
      ).not.toBeInTheDocument();
    });
  });

  describe('renderProp', () => {
    it('renders custom content from renderProp', () => {
      const { getByText } = setup({
        renderProp: () => <div>Custom content</div>,
      });
      expect(getByText('Custom content')).toBeInTheDocument();
    });

    it('does not render default icon/title when renderProp is provided', () => {
      const { queryByText } = setup({
        title: 'Hidden title',
        renderProp: () => <div>Custom only</div>,
      });
      // title is passed as prop but renderProp fully replaces inner content
      expect(queryByText('Hidden title')).not.toBeInTheDocument();
    });

    it('passes a working close callback to renderProp', async () => {
      const user = userEvent.setup();
      const onRemove = jest.fn();
      const { getByRole } = setup({
        onRemove,
        renderProp: (close) => (
          <button type="button" onClick={close}>
            Custom close
          </button>
        ),
      });

      await user.click(getByRole('button', { name: 'Custom close' }));

      expect(onRemove).toHaveBeenCalledWith('test-toast');
    });
  });

  describe('color prop', () => {
    it('renders without throwing when a hex color is provided', () => {
      expect(() => setup({ title: 'Title', color: '#1e293b' })).not.toThrow();
    });

    it('renders without throwing when a theme color key is provided', () => {
      expect(() => setup({ title: 'Title', color: 'purple' })).not.toThrow();
    });

    it('still renders title and description when color is set', () => {
      const { getByText } = setup({
        title: 'Branded',
        description: 'Custom bg toast.',
        color: '#f59e0b',
      });
      expect(getByText('Branded')).toBeInTheDocument();
      expect(getByText('Custom bg toast.')).toBeInTheDocument();
    });
  });
});
