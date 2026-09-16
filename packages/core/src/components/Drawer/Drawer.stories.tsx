import { type StoryObj, type Meta } from '@storybook/react-webpack5';

import { Drawer } from '@components/Drawer';
import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
import Input from '@components/Input';
import Icon from '@components/Icon';
import {
  FiltersMultiSelect,
  FiltersMultiSelectOptions,
  useFilterMultiSelect,
} from '@components/FiltersMultiSelect';

import { useDrawer } from './useDrawer';

const meta = {
  title: 'Components/Drawer',
  component: Drawer.Root,
  args: {
    title: 'Title',
    withCloseButton: true,
  },
  decorators: [
    (Story, { args, viewMode }) => {
      args.defaultOpen = args.defaultOpen ?? viewMode === 'story';
      return <Story />;
    },
  ],
  // required due to https://github.com/storybookjs/storybook/issues/17025
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerContent = () => {
  const store = useFilterMultiSelect({
    defaultSelectedFilters: [{ id: '1', label: 'Filter 1', type: 'include' }],
  });
  return (
    <div css={{ marginTop: '12px' }}>
      <FiltersMultiSelect
        store={store}
        label="Filters"
        description="Description">
        <FiltersMultiSelectOptions>{null}</FiltersMultiSelectOptions>
      </FiltersMultiSelect>
    </div>
  );
};

export const Default: Story = {
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button variant="primary" {...drawer.interactions.getReferenceProps()}>
          {drawer.open ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content>
                <DrawerContent />
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  },
};

export const PositionRight: Story = {
  args: { position: 'right' },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button variant="primary" {...drawer.interactions.getReferenceProps()}>
          {drawer.open ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content>
                <DrawerContent />
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  },
};

export const PositionTop: Story = {
  args: { position: 'top' },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button variant="primary" {...drawer.interactions.getReferenceProps()}>
          {drawer.open ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content css={{ maxHeight: '200px' }}>
                <DrawerContent />
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  },
};

export const PositionBottom: Story = {
  args: { position: 'bottom' },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button variant="primary" {...drawer.interactions.getReferenceProps()}>
          {drawer.open ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content css={{ maxHeight: '200px' }}>
                <DrawerContent />
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  },
};

/**
 * Rendered inside a container rather than the page.
 *
 * Leaving out `Drawer.Portal` keeps the drawer in the DOM where you wrote it,
 * so it is scoped to its container instead of the viewport — the container just
 * needs `position: relative` and a height for the drawer to anchor against.
 */
export const WithinContainer: Story = {
  args: {
    defaultOpen: true,
    title: undefined,
    withCloseButton: undefined,
  },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button variant="primary" {...drawer.interactions.getReferenceProps()}>
          {drawer.open ? 'Close' : 'Open'}
        </Button>
        <Wrapper
          direction="column"
          alignItems="stretch"
          css={(theme) => ({
            position: 'relative',
            marginTop: '24px',
            overflow: 'hidden',
            width: '100%',
            height: '360px',
            border: `1px solid ${theme.colors.greyFocused}`,
            borderRadius: '12px',
          })}>
          {/* Stand-in for whatever the drawer sits over — a table, a list.
              The drawer covers the left of it rather than the whole page,
              which is the point of rendering without a Portal. */}
          <div css={{ padding: '24px' }}>
            <h3 css={{ margin: '0 0 16px', textAlign: 'right' }}>Leads</h3>
            {['CTO Norway', 'CEO Spain', 'CTO Norway', 'CEO Spain'].map(
              (name, index) => (
                <div
                  key={index}
                  css={(theme) => ({
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderTop: `1px solid ${theme.colors.greyFocused}`,
                  })}>
                  <span>{name}</span>
                  <span>150 leads of 25 accounts</span>
                </div>
              ),
            )}
          </div>
          <Drawer.Root store={drawer}>
            <Drawer.Overlay>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Filters</Drawer.Title>
                  <Drawer.Actions>
                    <Drawer.CloseButton />
                  </Drawer.Actions>
                </Drawer.Header>
                <DrawerContent />
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Root>
        </Wrapper>
      </>
    );
  },
};

export const DismissableWithLockScroll: Story = {
  args: {
    position: 'right',
    dismissable: true,
  },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button variant="primary" {...drawer.interactions.getReferenceProps()}>
          {drawer.open ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay
              lockScroll
              css={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              <Drawer.Content>
                <p>Content</p>
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  },
};

export const WithHeaderComponent: Story = {
  args: {
    title: undefined,
    withCloseButton: undefined,
    dismissable: true,
  },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button variant="primary" {...drawer.interactions.getReferenceProps()}>
          {drawer.open ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Title</Drawer.Title>
                  <Drawer.CloseButton />
                </Drawer.Header>
                <p>Content</p>
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  },
};

/**
 * The design's left-hand variant: a title, a primary action beside the toggle,
 * and a sticky footer holding the closing actions.
 *
 * Note `title`/`withCloseButton` are unset — the header is composed by hand
 * here, and leaving them on would make `Drawer.Content` render a second one.
 */
export const WithActionsAndFooter: Story = {
  args: {
    title: undefined,
    withCloseButton: undefined,
  },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button variant="primary" {...drawer.interactions.getReferenceProps()}>
          {drawer.open ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Title</Drawer.Title>
                  <Drawer.Actions>
                    <Button variant="primary" text="Save" />
                    <Drawer.CloseButton />
                  </Drawer.Actions>
                </Drawer.Header>
                <DrawerContent />
                <Drawer.Footer>
                  {/* The design's Clear button is white with a grey outline,
                      which no stock Button variant covers yet — hence the
                      inline override rather than variant="secondary", which
                      is a solid fill. */}
                  <Button
                    variant="custom"
                    text="Clear"
                    css={(theme) => ({
                      background: theme.colors.white,
                      border: `1px solid ${theme.palette.secondary.main}`,
                      color: theme.colors.greyDarker60,
                    })}
                  />
                  <Button variant="primary" text="View Leads" />
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  },
};

/**
 * The design's right-hand variant: a search field in the header instead of a
 * button, and no footer. The toggle's glyph flips with `position`.
 */
export const WithSearch: Story = {
  args: {
    title: undefined,
    withCloseButton: undefined,
    position: 'right',
  },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button variant="primary" {...drawer.interactions.getReferenceProps()}>
          {drawer.open ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Title</Drawer.Title>
                  <Drawer.Actions>
                    <Input
                      name="search"
                      placeholder="Search"
                      startElement={<Icon name="search" size={20} />}
                    />
                    <Drawer.CloseButton />
                  </Drawer.Actions>
                </Drawer.Header>
                <p>Content</p>
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  },
};
