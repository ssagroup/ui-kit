import userEvent from '@testing-library/user-event';

import {
  NotificationPositions,
  NotificationSizes,
} from '@components/NotificationComponents/types';

import { AlertItem, AlertItemProps } from './AlertItem';
import { AlertVariants } from './types';

// ─── Shared setup ─────────────────────────────────────────────────────────────

type PartialProps = Partial<Omit<AlertItemProps, 'onRemove'>> & {
  onRemove?: AlertItemProps['onRemove'];
};

function setup(props: PartialProps = {}) {
  const onRemove = props.onRemove ?? jest.fn();

  const result = render(
    <AlertItem
      id="test-alert"
      variant={AlertVariants.success}
      size={NotificationSizes.small}
      cancelText="Cancel"
      submitText="Submit"
      animationDuration={0}
      position={NotificationPositions.rightTop}
      {...props}
      onRemove={onRemove}
    />,
  );

  return { ...result, onRemove };
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('AlertItem', () => {
  describe('content rendering', () => {
    it('renders title text', () => {
      const { getByText } = setup({ title: 'Test Headline' });
      expect(getByText('Test Headline')).toBeInTheDocument();
    });

    it('renders description in expanded layout', () => {
      const { getByText } = setup({
        title: 'Title',
        description: 'Supporting body text.',
      });
      expect(getByText('Supporting body text.')).toBeInTheDocument();
    });

    it('does not render a description element when omitted (collapsed layout)', () => {
      const { queryByText } = setup({ title: 'Title only' });
      expect(queryByText('Supporting body text.')).not.toBeInTheDocument();
    });

    it.each(Object.values(AlertVariants))(
      'renders variant "%s" without throwing',
      (variant) => {
        expect(() => setup({ title: 'Title', variant })).not.toThrow();
      },
    );
  });

  describe('close button', () => {
    it('is always present regardless of description', () => {
      const { getAllByRole } = setup({ title: 'Title' });
      const closeButtons = getAllByRole('button', { name: /close alert/i });
      expect(closeButtons.length).toBeGreaterThanOrEqual(1);
    });

    it('calls onRemove with the alert id', async () => {
      const user = userEvent.setup();
      const { getAllByRole, onRemove } = setup({ title: 'Title' });
      const closeBtn = getAllByRole('button', { name: /close alert/i })[0];

      await user.click(closeBtn);

      expect(onRemove).toHaveBeenCalledTimes(1);
      expect(onRemove).toHaveBeenCalledWith('test-alert');
    });

    it('calls the optional onClose callback', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      const { getAllByRole } = setup({ title: 'Title', onClose });
      const closeBtn = getAllByRole('button', { name: /close alert/i })[0];

      await user.click(closeBtn);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('action buttons — conditional rendering', () => {
    it('renders cancel button when cancelText and onClose are both provided', () => {
      const { getByText } = setup({ title: 'Title', onClose: jest.fn() });
      expect(getByText('Cancel')).toBeInTheDocument();
    });

    it('does not render cancel button when onClose is missing', () => {
      // no onClose → button must be absent even if cancelText is set
      const { queryByText } = setup({ title: 'Title' });
      expect(queryByText('Cancel')).not.toBeInTheDocument();
    });

    it('does not render cancel button when cancelText is empty', () => {
      const { queryByText } = setup({
        title: 'Title',
        cancelText: '',
        onClose: jest.fn(),
      });
      expect(queryByText('Cancel')).not.toBeInTheDocument();
    });

    it('renders submit button when submitText and onSubmit are both provided', () => {
      const { getByText } = setup({ title: 'Title', onSubmit: jest.fn() });
      expect(getByText('Submit')).toBeInTheDocument();
    });

    it('does not render submit button when onSubmit is missing', () => {
      const { queryByText } = setup({ title: 'Title' });
      expect(queryByText('Submit')).not.toBeInTheDocument();
    });

    it('does not render submit button when submitText is empty', () => {
      const { queryByText } = setup({
        title: 'Title',
        submitText: '',
        onSubmit: jest.fn(),
      });
      expect(queryByText('Submit')).not.toBeInTheDocument();
    });
  });

  describe('action button interactions', () => {
    it('cancel button calls onRemove and onClose', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      const { getByText, onRemove } = setup({ title: 'Title', onClose });

      await user.click(getByText('Cancel'));

      expect(onRemove).toHaveBeenCalledWith('test-alert');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('submit button calls onRemove and onSubmit', async () => {
      const user = userEvent.setup();
      const onSubmit = jest.fn();
      const { getByText, onRemove } = setup({ title: 'Title', onSubmit });

      await user.click(getByText('Submit'));

      expect(onRemove).toHaveBeenCalledWith('test-alert');
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it('both action buttons are present when both callbacks are provided', () => {
      const { getByText } = setup({
        title: 'Title',
        onClose: jest.fn(),
        onSubmit: jest.fn(),
      });
      expect(getByText('Cancel')).toBeInTheDocument();
      expect(getByText('Submit')).toBeInTheDocument();
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
        description: 'Custom color alert.',
        color: '#f59e0b',
      });
      expect(getByText('Branded')).toBeInTheDocument();
      expect(getByText('Custom color alert.')).toBeInTheDocument();
    });

    it('still renders action buttons when color is set', () => {
      const { getByText } = setup({
        title: 'Title',
        color: '#1e293b',
        onClose: jest.fn(),
        onSubmit: jest.fn(),
      });
      expect(getByText('Cancel')).toBeInTheDocument();
      expect(getByText('Submit')).toBeInTheDocument();
    });

    it('renders the close button when color is set', () => {
      const { getAllByRole } = setup({ title: 'Title', color: '#1e293b' });
      expect(
        getAllByRole('button', { name: /close alert/i }).length,
      ).toBeGreaterThanOrEqual(1);
    });
  });

  describe('expanded vs collapsed layout', () => {
    it('shows cancel/submit in the content column in expanded layout', () => {
      const { getByText } = setup({
        title: 'Title',
        description: 'Desc',
        onClose: jest.fn(),
        onSubmit: jest.fn(),
      });
      // Both action buttons should be in the DOM
      expect(getByText('Cancel')).toBeInTheDocument();
      expect(getByText('Submit')).toBeInTheDocument();
    });

    it('shows cancel/submit inline in collapsed layout (no description)', () => {
      const { getByText } = setup({
        title: 'Title',
        onClose: jest.fn(),
        onSubmit: jest.fn(),
      });
      expect(getByText('Cancel')).toBeInTheDocument();
      expect(getByText('Submit')).toBeInTheDocument();
    });
  });
});
