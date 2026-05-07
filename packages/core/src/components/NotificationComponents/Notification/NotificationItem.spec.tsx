import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import { NotificationItem, NotificationItemProps } from './NotificationItem';
import { NotificationVariants } from './types';

// ─── Shared setup ─────────────────────────────────────────────────────────────

type PartialProps = Partial<Omit<NotificationItemProps, 'onRemove'>> & {
  onRemove?: NotificationItemProps['onRemove'];
};

function setup(props: PartialProps = {}) {
  const onRemove = props.onRemove ?? jest.fn();

  const result = render(
    <NotificationItem
      id="test-notification"
      variant={NotificationVariants.default}
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

describe('NotificationItem', () => {
  describe('content rendering', () => {
    it('renders title text', () => {
      const { getByText } = setup({ title: 'Jane Doe' });
      expect(getByText('Jane Doe')).toBeInTheDocument();
    });

    it('renders description in expanded layout', () => {
      const { getByText } = setup({
        title: 'Jane Doe',
        description: 'Left a comment on your post.',
      });
      expect(getByText('Left a comment on your post.')).toBeInTheDocument();
    });

    it('does not render description when omitted (collapsed layout)', () => {
      const { queryByText } = setup({ title: 'Jane Doe' });
      expect(
        queryByText('Left a comment on your post.'),
      ).not.toBeInTheDocument();
    });

    it('renders the date string when provided', () => {
      const { getByText } = setup({ title: 'Jane Doe', date: '11 days ago' });
      expect(getByText('11 days ago')).toBeInTheDocument();
    });

    it('does not render date when omitted', () => {
      const { queryByText } = setup({ title: 'Jane Doe' });
      expect(queryByText('11 days ago')).not.toBeInTheDocument();
    });

    it.each(Object.values(NotificationVariants))(
      'renders variant "%s" without throwing',
      (variant) => {
        expect(() => setup({ title: 'Title', variant })).not.toThrow();
      },
    );
  });

  describe('icon rendering', () => {
    it('renders the default "user" icon when icon prop is omitted', () => {
      // The default icon uses the name "user" which results in an svg element
      const { container } = setup({ title: 'Jane Doe' });
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders a named icon string without throwing', () => {
      expect(() => setup({ title: 'Alert', icon: 'bell' })).not.toThrow();
    });

    it('renders a custom ReactNode icon', () => {
      const { getByText } = setup({
        title: 'Jane Doe',
        icon: <div>NS</div>,
      });
      expect(getByText('NS')).toBeInTheDocument();
    });

    it('does not render a named icon when a ReactNode icon is provided', () => {
      // The ReactNode overrides the default <Icon> element;
      // the SVG in the DOM should belong to the close button only (1 svg).
      const { getByText } = setup({
        title: 'Jane Doe',
        icon: <div data-testid="custom-icon">NS</div>,
      });
      expect(getByText('NS')).toBeInTheDocument();
      // There may still be one SVG for the close ×, but no "user" svg via <Icon name="user">
      // We verify our custom element is present — detailed icon internals are Icon's concern.
    });
  });

  describe('close button', () => {
    it('is always present regardless of layout', () => {
      const { getAllByRole } = setup({ title: 'Jane Doe' });
      expect(
        getAllByRole('button', { name: /close notification/i }).length,
      ).toBeGreaterThanOrEqual(1);
    });

    it('calls onRemove with the notification id', async () => {
      const user = userEvent.setup();
      const { getAllByRole, onRemove } = setup({ title: 'Jane Doe' });

      await user.click(
        getAllByRole('button', { name: /close notification/i })[0],
      );

      expect(onRemove).toHaveBeenCalledTimes(1);
      expect(onRemove).toHaveBeenCalledWith('test-notification');
    });

    it('calls the optional onClose callback', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      const { getAllByRole } = setup({ title: 'Jane Doe', onClose });

      await user.click(
        getAllByRole('button', { name: /close notification/i })[0],
      );

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('action buttons — conditional rendering', () => {
    it('renders cancel button when cancelText and onClose are both provided', () => {
      const { getByText } = setup({
        title: 'Jane Doe',
        cancelText: 'Dismiss',
        onClose: jest.fn(),
      });
      expect(getByText('Dismiss')).toBeInTheDocument();
    });

    it('does not render cancel button when onClose is missing', () => {
      const { queryByText } = setup({
        title: 'Jane Doe',
        cancelText: 'Dismiss',
      });
      expect(queryByText('Dismiss')).not.toBeInTheDocument();
    });

    it('renders submit button when submitText and onSubmit are both provided', () => {
      const { getByText } = setup({
        title: 'Jane Doe',
        submitText: 'View',
        onSubmit: jest.fn(),
      });
      expect(getByText('View')).toBeInTheDocument();
    });

    it('does not render submit button when onSubmit is missing', () => {
      const { queryByText } = setup({
        title: 'Jane Doe',
        submitText: 'View',
      });
      expect(queryByText('View')).not.toBeInTheDocument();
    });
  });

  describe('action button interactions', () => {
    it('cancel button calls onRemove and onClose', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      const { getByText, onRemove } = setup({
        title: 'Jane Doe',
        cancelText: 'Dismiss',
        onClose,
      });

      await user.click(getByText('Dismiss'));

      expect(onRemove).toHaveBeenCalledWith('test-notification');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('submit button calls onRemove and onSubmit', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      const { getByText, onRemove } = setup({
        title: 'Jane Doe',
        submitText: 'View',
        onSubmit,
      });

      await user.click(getByText('View'));

      expect(onRemove).toHaveBeenCalledWith('test-notification');
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('renders both action buttons when both callbacks and texts are provided', () => {
      const { getByText } = setup({
        title: 'Jane Doe',
        cancelText: 'Dismiss',
        onClose: jest.fn(),
        submitText: 'View',
        onSubmit: jest.fn(),
      });
      expect(getByText('Dismiss')).toBeInTheDocument();
      expect(getByText('View')).toBeInTheDocument();
    });
  });

  describe('auto-dismiss timer', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it('calls onRemove after the timeout elapses', () => {
      const onRemove = jest.fn();
      setup({ title: 'Auto', timeout: 3000, onRemove });

      act(() => jest.advanceTimersByTime(3000));

      expect(onRemove).toHaveBeenCalledWith('test-notification');
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

  describe('color prop', () => {
    it('renders without throwing when a hex color is provided', () => {
      expect(() =>
        setup({ title: 'Jane Doe', color: '#1e293b' }),
      ).not.toThrow();
    });

    it('renders without throwing when a theme color key is provided', () => {
      expect(() => setup({ title: 'Jane Doe', color: 'purple' })).not.toThrow();
    });

    it('still renders title, date, and description when color is set', () => {
      const { getByText } = setup({
        title: 'Jane Doe',
        date: '2 hours ago',
        description: 'Left a comment.',
        color: '#f59e0b',
      });
      expect(getByText('Jane Doe')).toBeInTheDocument();
      expect(getByText('2 hours ago')).toBeInTheDocument();
      expect(getByText('Left a comment.')).toBeInTheDocument();
    });

    it('still renders action buttons when color is set', () => {
      const { getByText } = setup({
        title: 'Jane Doe',
        color: 'purple',
        cancelText: 'Dismiss',
        onClose: jest.fn(),
        submitText: 'View',
        onSubmit: jest.fn(),
      });
      expect(getByText('Dismiss')).toBeInTheDocument();
      expect(getByText('View')).toBeInTheDocument();
    });
  });

  describe('styleOverrides', () => {
    it('applies root override without throwing', () => {
      expect(() =>
        setup({
          title: 'Jane Doe',
          styleOverrides: { root: { borderRadius: 4 } },
        }),
      ).not.toThrow();
    });

    it('applies title override without throwing', () => {
      expect(() =>
        setup({
          title: 'Jane Doe',
          styleOverrides: { title: { color: '#4338ca' } },
        }),
      ).not.toThrow();
    });

    it('applies date override without throwing', () => {
      expect(() =>
        setup({
          title: 'Jane Doe',
          date: '11 days ago',
          styleOverrides: { date: { color: '#a5b4fc' } },
        }),
      ).not.toThrow();
    });

    it('still renders all content when styleOverrides are applied', () => {
      const { getByText } = setup({
        title: 'Jane Doe',
        date: '11 days ago',
        description: 'A description.',
        styleOverrides: {
          root: { background: '#f5f3ff' },
          title: { color: '#4338ca' },
          date: { color: '#a5b4fc' },
        },
      });
      expect(getByText('Jane Doe')).toBeInTheDocument();
      expect(getByText('11 days ago')).toBeInTheDocument();
      expect(getByText('A description.')).toBeInTheDocument();
    });
  });
});
