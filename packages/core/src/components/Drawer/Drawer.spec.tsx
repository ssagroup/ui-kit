import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';

import { screen } from '../../../customTest';

import { resetDeprecationWarnings } from '@utils/deprecation';

import * as Drawer from './index.parts';
import { useDrawer, Position } from './useDrawer';

describe('useDrawer', () => {
  const DrawerTestComponent = ({
    position = 'left' as Position,
    defaultOpen = false,
    dismissable = false,
    title = '',
    withCloseButton = false,
  }) => {
    const drawer = useDrawer({
      position,
      defaultOpen,
      dismissable,
      title,
      withCloseButton,
    });
    return (
      <>
        <button onClick={() => drawer.toggle()} data-testid="toggle-button">
          {drawer.open ? 'Close' : 'Open'}
        </button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content data-testid="drawer-content">
                <div>Drawer Content</div>
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  };

  it('Should open and close the drawer when toggle is called', async () => {
    const user = userEvent.setup();
    render(<DrawerTestComponent />);

    expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('toggle-button'));
    expect(screen.getByText('Close')).toBeInTheDocument();
    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();

    await user.click(screen.getByTestId('toggle-button'));
    expect(screen.getByText('Open')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();
    });
  });

  it('Should render with default opened state when defaultOpen is true', () => {
    render(<DrawerTestComponent defaultOpen={true} />);
    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('Should render with title when provided', async () => {
    const user = userEvent.setup();
    render(<DrawerTestComponent title="Test Title" />);

    await user.click(screen.getByTestId('toggle-button'));

    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('Should render close button when withCloseButton is true', async () => {
    const user = userEvent.setup();
    render(<DrawerTestComponent withCloseButton={true} />);

    await user.click(screen.getByTestId('toggle-button'));

    expect(screen.getByTestId('drawer-close-button')).toBeInTheDocument();

    await user.click(screen.getByTestId('drawer-close-button'));
    expect(screen.getByText('Open')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();
    });
  });

  it('Should render with different positions', async () => {
    const positions: Position[] = ['left', 'right', 'top', 'bottom'];

    for (const position of positions) {
      const { unmount } = render(
        <DrawerTestComponent position={position} defaultOpen={true} />,
      );

      const content = screen.getByTestId('drawer-content');
      expect(content).toBeInTheDocument();

      const wrapper = content.closest('[data-transition]');

      await waitFor(() => {
        expect(wrapper).toHaveAttribute('data-transition', 'open');
        expect(wrapper).toHaveAttribute('data-position', position);
      });

      unmount();
    }
  });

  it('Should use dismissable option correctly', async () => {
    const user = userEvent.setup();
    render(<DrawerTestComponent dismissable={true} defaultOpen={true} />);

    await user.click(document.body);

    await waitFor(() => {
      expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();
    });
  });
});

describe('Drawer components', () => {
  it('Should not render when not mounted', () => {
    const Component = () => {
      const drawer = useDrawer();
      return (
        <Drawer.Root store={drawer}>
          <div data-testid="drawer-child">Should not render</div>
        </Drawer.Root>
      );
    };

    render(<Component />);

    expect(screen.queryByTestId('drawer-child')).not.toBeInTheDocument();
  });

  it('Should render DrawerHeader with children', async () => {
    const user = userEvent.setup();
    const Component = () => {
      const drawer = useDrawer();
      return (
        <>
          <button onClick={() => drawer.toggle()} data-testid="toggle-button">
            Toggle
          </button>
          <Drawer.Root store={drawer}>
            <Drawer.Portal>
              <Drawer.Overlay>
                <Drawer.Content>
                  <Drawer.Header data-testid="drawer-header">
                    <div data-testid="header-content">Header Content</div>
                  </Drawer.Header>
                </Drawer.Content>
              </Drawer.Overlay>
            </Drawer.Portal>
          </Drawer.Root>
        </>
      );
    };

    render(<Component />);

    await user.click(screen.getByTestId('toggle-button'));

    const header = screen.getByTestId('drawer-header');
    expect(header).toBeInTheDocument();
    expect(screen.getByTestId('header-content')).toBeInTheDocument();
  });

  it('Should render DrawerTitle with text', async () => {
    const user = userEvent.setup();
    const Component = () => {
      const drawer = useDrawer();
      return (
        <>
          <button onClick={() => drawer.toggle()} data-testid="toggle-button">
            Toggle
          </button>
          <Drawer.Root store={drawer}>
            <Drawer.Portal>
              <Drawer.Overlay>
                <Drawer.Content>
                  <Drawer.Title data-testid="drawer-title">
                    Drawer Title
                  </Drawer.Title>
                </Drawer.Content>
              </Drawer.Overlay>
            </Drawer.Portal>
          </Drawer.Root>
        </>
      );
    };

    render(<Component />);

    await user.click(screen.getByTestId('toggle-button'));

    const title = screen.getByTestId('drawer-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Drawer Title');
  });

  it('Should render DrawerCloseButton and call toggle on click', async () => {
    const user = userEvent.setup();
    const Component = () => {
      const drawer = useDrawer();
      return (
        <>
          <button onClick={() => drawer.toggle()} data-testid="toggle-button">
            Toggle
          </button>
          <Drawer.Root store={drawer}>
            <Drawer.Portal>
              <Drawer.Overlay>
                <Drawer.Content>
                  <Drawer.CloseButton data-testid="close-button" />
                </Drawer.Content>
              </Drawer.Overlay>
            </Drawer.Portal>
          </Drawer.Root>
        </>
      );
    };

    render(<Component />);

    await user.click(screen.getByTestId('toggle-button'));

    const closeButton = screen.getByTestId('close-button');
    expect(closeButton).toBeInTheDocument();

    await user.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('close-button')).not.toBeInTheDocument();
    });
  });

  it('Should use the panel glyph matching the drawer side', async () => {
    const user = userEvent.setup();
    const Component = ({ position }: { position: Position }) => {
      const drawer = useDrawer({ position });
      return (
        <>
          <button onClick={() => drawer.toggle()} data-testid="toggle-button">
            Toggle
          </button>
          <Drawer.Root store={drawer}>
            <Drawer.Portal>
              <Drawer.Overlay>
                <Drawer.Content>
                  <Drawer.CloseButton />
                </Drawer.Content>
              </Drawer.Overlay>
            </Drawer.Portal>
          </Drawer.Root>
        </>
      );
    };

    // Asserted on the path itself: panelLeft and panelRight are the same
    // rounded rectangle with the divider on opposite sides, so only the bar's
    // x position tells them apart. Checking that an svg merely exists would
    // pass just as happily with the carrots this replaced.
    const glyph = () =>
      screen
        .getByTestId('drawer-close-button')
        .querySelector('svg path')
        ?.getAttribute('d') ?? '';

    const { unmount } = render(<Component position="left" />);
    await user.click(screen.getByTestId('toggle-button'));
    expect(glyph()).toContain('H7.7998V4.40039');
    unmount();

    render(<Component position="right" />);
    await user.click(screen.getByTestId('toggle-button'));
    expect(glyph()).toContain('H14.7998V4.40039');
  });

  it('Should render Actions and Footer children', async () => {
    const user = userEvent.setup();
    const Component = () => {
      const drawer = useDrawer();
      return (
        <>
          <button onClick={() => drawer.toggle()} data-testid="toggle-button">
            Toggle
          </button>
          <Drawer.Root store={drawer}>
            <Drawer.Portal>
              <Drawer.Overlay>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Title</Drawer.Title>
                    <Drawer.Actions>
                      <button>Save</button>
                      <Drawer.CloseButton />
                    </Drawer.Actions>
                  </Drawer.Header>
                  <Drawer.Footer>
                    <button>Clear</button>
                    <button>Submit</button>
                  </Drawer.Footer>
                </Drawer.Content>
              </Drawer.Overlay>
            </Drawer.Portal>
          </Drawer.Root>
        </>
      );
    };

    render(<Component />);
    await user.click(screen.getByTestId('toggle-button'));

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    // The toggle still lives inside the actions group, not adrift in the header.
    expect(screen.getByTestId('drawer-close-button')).toBeInTheDocument();
  });

  it('Should keep the header opaque and above the scrolling body', async () => {
    // The header is the first child, so without its own background and a
    // stacking order every sibling below it paints straight through.
    const user = userEvent.setup();
    const Component = () => {
      const drawer = useDrawer();
      return (
        <>
          <button onClick={() => drawer.toggle()} data-testid="toggle-button">
            Toggle
          </button>
          <Drawer.Root store={drawer}>
            <Drawer.Portal>
              <Drawer.Overlay>
                <Drawer.Content>
                  <Drawer.Header data-testid="drawer-header">
                    <Drawer.Title>Title</Drawer.Title>
                  </Drawer.Header>
                </Drawer.Content>
              </Drawer.Overlay>
            </Drawer.Portal>
          </Drawer.Root>
        </>
      );
    };

    render(<Component />);
    await user.click(screen.getByTestId('toggle-button'));

    const header = screen.getByTestId('drawer-header');
    expect(header).toHaveStyleRule('background', 'rgb(244, 245, 249)');
    expect(header).toHaveStyleRule('z-index', '1');
    // The gap to the body has to be padding, not a margin: a margin sits
    // outside the border box and stays transparent, letting the first field
    // scroll up under the header's buttons.
    expect(header).toHaveStyleRule('padding', '24px 32px 24px');
    expect(header).toHaveStyleRule('margin', '-24px -32px 0');
  });

  it('Should warn once for the deprecated header props', () => {
    resetDeprecationWarnings();
    const warn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);

    const Component = () => {
      useDrawer({ title: 'Title', withCloseButton: true });
      return null;
    };
    const { rerender } = render(<Component />);
    rerender(<Component />);

    const messages = warn.mock.calls.map((call) => String(call[0]));
    expect(messages.filter((m) => m.includes('`title`'))).toHaveLength(1);
    expect(
      messages.filter((m) => m.includes('`withCloseButton`')),
    ).toHaveLength(1);
    expect(messages.join(' ')).toContain('Drawer.Title');
    expect(messages.join(' ')).toContain('Drawer.CloseButton');

    warn.mockRestore();
    resetDeprecationWarnings();
  });

  it('Should make the panel its own scroll container', async () => {
    // The sticky positioning on Drawer.Header and Drawer.Footer needs a
    // scrollport to resolve against. Without it, long content overflows the
    // fixed-height panel and is unreachable — the overlay does not scroll, and
    // a contained drawer has no scrolling ancestor at all.
    const user = userEvent.setup();
    const Component = () => {
      const drawer = useDrawer();
      return (
        <>
          <button onClick={() => drawer.toggle()} data-testid="toggle-button">
            Toggle
          </button>
          <Drawer.Root store={drawer}>
            <Drawer.Portal>
              <Drawer.Overlay>
                <Drawer.Content data-testid="drawer-content">
                  Content
                </Drawer.Content>
              </Drawer.Overlay>
            </Drawer.Portal>
          </Drawer.Root>
        </>
      );
    };

    render(<Component />);
    await user.click(screen.getByTestId('toggle-button'));

    expect(screen.getByTestId('drawer-content')).toHaveStyleRule(
      'overflow-y',
      'auto',
    );
  });

  it('Should default the side panel width and let a caller override it', async () => {
    const user = userEvent.setup();
    const Component = ({ width }: { width?: number | string }) => {
      const drawer = useDrawer({ width });
      return (
        <>
          <button onClick={() => drawer.toggle()} data-testid="toggle-button">
            Toggle
          </button>
          <Drawer.Root store={drawer}>
            <Drawer.Portal>
              <Drawer.Overlay>
                <Drawer.Content data-testid="drawer-content">
                  Content
                </Drawer.Content>
              </Drawer.Overlay>
            </Drawer.Portal>
          </Drawer.Root>
        </>
      );
    };

    const { unmount } = render(<Component />);
    await user.click(screen.getByTestId('toggle-button'));
    expect(screen.getByTestId('drawer-content')).toHaveStyleRule(
      'width',
      '400px',
    );
    unmount();

    render(<Component width={572} />);
    await user.click(screen.getByTestId('toggle-button'));
    expect(screen.getByTestId('drawer-content')).toHaveStyleRule(
      'width',
      '572px',
    );
  });
});
