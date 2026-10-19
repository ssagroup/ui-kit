import userEvent from '@testing-library/user-event';

import { FloatingActionButton } from './FloatingActionButton';
import { FloatingActionButtonAction } from './types';
import { screen } from '../../../customTest';
import { checkA11y } from '../../test-utils/axe';
import { getReadableColor } from '@utils/colorUtils';

const makeActions = () => {
  const first = jest.fn();
  const second = jest.fn();
  const actions: FloatingActionButtonAction[] = [
    { id: 'first', icon: 'plus', label: 'First', onClick: first },
    { id: 'second', icon: 'plus', label: 'Second', onClick: second },
    {
      id: 'third',
      icon: 'plus',
      label: 'Third',
      onClick: jest.fn(),
      disabled: true,
    },
  ];
  return { actions, first, second };
};

describe('FloatingActionButton', () => {
  it('renders an icon-only button fixed to the bottom-right corner', () => {
    render(<FloatingActionButton aria-label="Add" />);

    const button = screen.getByRole('button', { name: 'Add' });
    expect(button).not.toHaveAttribute('aria-haspopup');
    const root = button.parentElement!;
    expect(root).toHaveStyle({
      position: 'fixed',
      bottom: '24px',
      right: '24px',
    });
    expect(button).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('renders the extended FAB with the label as its name', () => {
    render(<FloatingActionButton label="New report" size="large" />);

    const button = screen.getByRole('button', { name: 'New report' });
    expect(button).toHaveStyle({ height: '44px', padding: '0 32px 0 24px' });
  });

  it('places the FAB at the given corner and offset', () => {
    render(
      <FloatingActionButton
        aria-label="Add"
        position="top-left"
        offset={{ x: 8, y: 16 }}
      />,
    );

    expect(screen.getByRole('button').parentElement).toHaveStyle({
      top: '16px',
      left: '8px',
    });
  });

  it('calls onClick', async () => {
    const onClick = jest.fn();
    render(<FloatingActionButton aria-label="Add" onClick={onClick} />);

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('uses the design colors for primary and secondary', () => {
    const { rerender } = render(<FloatingActionButton aria-label="Add" />);
    expect(screen.getByRole('button')).toHaveStyleRule(
      'background',
      'rgb(65, 120, 225)',
    );
    expect(screen.getByRole('button')).toHaveStyle({
      color: 'rgba(255, 255, 255, 1)',
    });

    rerender(<FloatingActionButton aria-label="Add" color="secondary" />);
    expect(screen.getByRole('button')).toHaveStyleRule(
      'background',
      'rgb(244, 245, 249)',
    );
    expect(screen.getByRole('button')).toHaveStyle({
      color: 'rgba(43, 45, 49, 1)',
    });
  });

  it('picks a contrasting foreground for custom colors', () => {
    const { rerender } = render(
      <FloatingActionButton aria-label="Add" color="#2b2d31" />,
    );
    expect(screen.getByRole('button')).toHaveStyle({
      color: 'rgba(255, 255, 255, 1)',
    });

    rerender(<FloatingActionButton aria-label="Add" color="#ffe4c4" />);
    expect(screen.getByRole('button')).toHaveStyle({
      color: 'rgba(43, 45, 49, 1)',
    });
  });

  it('resolves theme color keys', () => {
    render(<FloatingActionButton aria-label="Add" color="green" />);
    expect(screen.getByRole('button')).toHaveStyleRule(
      'background',
      'rgba(82, 197, 135, 1)',
    );
  });

  it('keeps the shadow independent of the color', () => {
    const { rerender } = render(
      <FloatingActionButton aria-label="Add" shadow={false} />,
    );
    expect(screen.getByRole('button')).toHaveStyle({ boxShadow: 'none' });

    rerender(<FloatingActionButton aria-label="Add" color="secondary" />);
    expect(screen.getByRole('button')).not.toHaveStyle({ boxShadow: 'none' });
  });

  it('rounds the corners fully for shape="round"', () => {
    render(
      <FloatingActionButton aria-label="Add" shape="round" size="small" />,
    );
    expect(screen.getByRole('button')).toHaveStyle({ borderRadius: '18px' });
  });

  it('warns in development when an icon-only FAB has no name', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<FloatingActionButton />);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('needs an `aria-label`'),
    );
    warn.mockRestore();
  });

  describe('menu', () => {
    it('toggles the menu and swaps the trigger icon', async () => {
      const { actions } = makeActions();
      const onOpenChange = jest.fn();
      render(
        <FloatingActionButton
          aria-label="Create"
          actions={actions}
          onOpenChange={onOpenChange}
        />,
      );

      const trigger = screen.getByRole('button', { name: 'Create' });
      expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();

      await userEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(onOpenChange).toHaveBeenLastCalledWith(true);
      const menu = screen.getByRole('menu', { name: 'Create' });
      expect(trigger).toHaveAttribute('aria-controls', menu.id);
      expect(screen.getAllByRole('menuitem')).toHaveLength(3);
      expect(screen.getByRole('menuitem', { name: 'Third' })).toBeDisabled();

      await userEvent.click(trigger);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
    });

    it('runs the chosen action, closes and refocuses the trigger', async () => {
      const { actions, second } = makeActions();
      render(
        <FloatingActionButton
          aria-label="Create"
          actions={actions}
          defaultOpen
        />,
      );

      await userEvent.click(screen.getByRole('menuitem', { name: 'Second' }));
      expect(second).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create' })).toHaveFocus();
    });

    it('focuses the first item when opened from the keyboard and navigates with arrows', async () => {
      const { actions } = makeActions();
      render(<FloatingActionButton aria-label="Create" actions={actions} />);

      screen.getByRole('button', { name: 'Create' }).focus();
      await userEvent.keyboard('{Enter}');
      expect(screen.getByRole('menuitem', { name: 'First' })).toHaveFocus();

      await userEvent.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'Second' })).toHaveFocus();
      // Disabled "Third" is skipped, so ArrowDown wraps to the first item.
      await userEvent.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'First' })).toHaveFocus();
      await userEvent.keyboard('{ArrowUp}');
      expect(screen.getByRole('menuitem', { name: 'Second' })).toHaveFocus();
      await userEvent.keyboard('{Home}');
      expect(screen.getByRole('menuitem', { name: 'First' })).toHaveFocus();
    });

    it('keeps focus on the trigger when opened with a pointer', async () => {
      const { actions } = makeActions();
      render(<FloatingActionButton aria-label="Create" actions={actions} />);

      const trigger = screen.getByRole('button', { name: 'Create' });
      await userEvent.click(trigger);
      expect(trigger).toHaveFocus();
    });

    it('closes on Escape and returns focus to the trigger', async () => {
      const { actions } = makeActions();
      render(
        <FloatingActionButton
          aria-label="Create"
          actions={actions}
          defaultOpen
        />,
      );

      screen.getByRole('menuitem', { name: 'First' }).focus();
      await userEvent.keyboard('{Escape}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create' })).toHaveFocus();
    });

    it('closes on an outside click', async () => {
      const { actions } = makeActions();
      render(
        <>
          <button>Outside</button>
          <FloatingActionButton
            aria-label="Create"
            actions={actions}
            defaultOpen
          />
        </>,
      );

      await userEvent.click(screen.getByRole('button', { name: 'Outside' }));
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('closes when focus tabs away', async () => {
      const { actions } = makeActions();
      render(
        <>
          <FloatingActionButton
            aria-label="Create"
            actions={actions}
            defaultOpen
          />
          <button>After</button>
        </>,
      );

      screen.getByRole('menuitem', { name: 'Second' }).focus();
      await userEvent.tab();
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('respects the controlled open state', async () => {
      const { actions } = makeActions();
      const onOpenChange = jest.fn();
      render(
        <FloatingActionButton
          aria-label="Create"
          actions={actions}
          open={false}
          onOpenChange={onOpenChange}
        />,
      );

      await userEvent.click(screen.getByRole('button', { name: 'Create' }));
      expect(onOpenChange).toHaveBeenCalledWith(true);
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('renders icon-only items named by their label', () => {
      const { actions } = makeActions();
      render(
        <FloatingActionButton
          aria-label="Create"
          actions={actions}
          showActionLabels={false}
          defaultOpen
        />,
      );

      const item = screen.getByRole('menuitem', { name: 'First' });
      expect(item).toHaveAttribute('aria-label', 'First');
      expect(item).not.toHaveTextContent('First');
    });

    it('does not open while disabled', () => {
      const { actions } = makeActions();
      render(
        <FloatingActionButton
          aria-label="Create"
          actions={actions}
          disabled
          defaultOpen
        />,
      );

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('steps from the trigger into the menu with the arrow keys', async () => {
      const { actions } = makeActions();
      render(<FloatingActionButton aria-label="Create" actions={actions} />);

      // Opened with a pointer: focus stays on the trigger.
      await userEvent.click(screen.getByRole('button', { name: 'Create' }));
      await userEvent.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'First' })).toHaveFocus();

      screen.getByRole('button', { name: 'Create' }).focus();
      await userEvent.keyboard('{ArrowUp}');
      // Disabled "Third" is skipped, so the last focusable item is "Second".
      expect(screen.getByRole('menuitem', { name: 'Second' })).toHaveFocus();
    });

    it('does not move focus on a later open after a refused keyboard open', async () => {
      const { actions } = makeActions();
      const { rerender } = render(
        <FloatingActionButton
          aria-label="Create"
          actions={actions}
          open={false}
        />,
      );

      const trigger = screen.getByRole('button', { name: 'Create' });
      trigger.focus();
      await userEvent.keyboard('{Enter}');
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();

      rerender(
        <FloatingActionButton aria-label="Create" actions={actions} open />,
      );
      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(trigger).toHaveFocus();
    });

    it('has no axe violations when open', async () => {
      const { actions } = makeActions();
      const { container } = render(
        <FloatingActionButton
          aria-label="Create"
          actions={actions}
          defaultOpen
        />,
      );
      expect(await checkA11y(container)).toHaveNoViolations();
    });
  });
});

describe('getReadableColor', () => {
  it('prefers white on the theme blue, unlike the black-tuned threshold', () => {
    expect(getReadableColor('rgba(65, 120, 225, 1)')).toBe(
      'rgba(255, 255, 255, 1)',
    );
  });

  it('prefers the dark text on light backgrounds', () => {
    expect(getReadableColor('#f4f5f9')).toBe('rgba(43, 45, 49, 1)');
  });

  it('falls back to the dark text for unparsable colors', () => {
    expect(getReadableColor('purple')).toBe('rgba(43, 45, 49, 1)');
  });
});
