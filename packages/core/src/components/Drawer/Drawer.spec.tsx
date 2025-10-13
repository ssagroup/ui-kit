import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { screen } from '../../../customTest';

import * as Drawer from './index.parts';
import { Position, useDrawer } from './useDrawer';

describe('useDrawer', () => {
  const DrawerTestComponent = ({
    position = 'left' as Position,
    defaultOpened = false,
    dismissable = false,
    title = '',
    withCloseButton = false,
  }) => {
    const drawer = useDrawer({
      position,
      defaultOpened,
      dismissable,
      title,
      withCloseButton,
    });
    return (
      <>
        <button onClick={() => drawer.toggle()} data-testid="toggle-button">
          {drawer.opened ? 'Close' : 'Open'}
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

  it('Should render with default opened state when defaultOpened is true', () => {
    render(<DrawerTestComponent defaultOpened={true} />);
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
        <DrawerTestComponent position={position} defaultOpened={true} />,
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
    render(<DrawerTestComponent dismissable={true} defaultOpened={true} />);

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
});
