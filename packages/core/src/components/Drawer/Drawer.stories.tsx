import { type StoryObj, type Meta } from '@storybook/react-webpack5';

import { Drawer } from '@components/Drawer';
import Button from '@components/Button';
import Wrapper from '@components/Wrapper';
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
      args.defaultOpened = args.defaultOpened ?? viewMode === 'story';
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
        <Button {...drawer.interactions.getReferenceProps()}>
          {drawer.opened ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content css={{ padding: '12px', maxWidth: '400px' }}>
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
        <Button {...drawer.interactions.getReferenceProps()}>
          {drawer.opened ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content css={{ padding: '12px', maxWidth: '400px' }}>
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
        <Button {...drawer.interactions.getReferenceProps()}>
          {drawer.opened ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content css={{ padding: '12px', maxHeight: '200px' }}>
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
        <Button {...drawer.interactions.getReferenceProps()}>
          {drawer.opened ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content css={{ padding: '12px', maxHeight: '200px' }}>
                <DrawerContent />
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Portal>
        </Drawer.Root>
      </>
    );
  },
};

export const WithinContainer: Story = {
  args: {
    defaultOpened: true,
    title: undefined,
    withCloseButton: undefined,
  },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button {...drawer.interactions.getReferenceProps()}>
          {drawer.opened ? 'Close' : 'Open'}
        </Button>
        <Wrapper
          direction="column"
          alignItems="stretch"
          css={{
            marginTop: '24px',
            overflow: 'hidden',
            width: '100%',
            border: '1px solid black',
            borderRadius: '12px',
          }}>
          <div css={{ padding: '12px' }}>Pre Content</div>
          <Drawer.Root store={drawer}>
            <Drawer.Content
              css={{
                padding: '12px',
                maxWidth: '400px',
              }}>
              <Button onClick={() => drawer.toggle(false)}>Close</Button>
            </Drawer.Content>
          </Drawer.Root>
          <div css={{ padding: '12px' }}>Post Content</div>
        </Wrapper>
      </>
    );
  },
};

export const WithinContainerPositionTop: Story = {
  args: {
    defaultOpened: true,
    position: 'top',
    title: undefined,
    withCloseButton: undefined,
  },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button {...drawer.interactions.getReferenceProps()}>
          {drawer.opened ? 'Close' : 'Open'}
        </Button>
        <Wrapper
          direction="column"
          alignItems="stretch"
          css={{
            marginTop: '24px',
            overflow: 'hidden',
            width: '100%',
            border: '1px solid black',
            borderRadius: '12px',
          }}>
          <div css={{ padding: '12px' }}>Pre Content</div>
          <Drawer.Root store={drawer}>
            <Drawer.Content
              css={{
                padding: '12px',
              }}>
              <Button onClick={() => drawer.toggle(false)}>Close</Button>
            </Drawer.Content>
          </Drawer.Root>
          <div css={{ padding: '12px' }}>Post Content</div>
        </Wrapper>
      </>
    );
  },
};

export const WithinContainerOverlap: Story = {
  args: { defaultOpened: true, title: undefined, withCloseButton: undefined },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button {...drawer.interactions.getReferenceProps()}>
          {drawer.opened ? 'Close' : 'Open'}
        </Button>
        <Wrapper
          direction="column"
          alignItems="stretch"
          css={{
            position: 'relative',
            marginTop: '24px',
            overflow: 'hidden',
            width: '100%',
            border: '1px solid black',
            borderRadius: '12px',
          }}>
          <div css={{ padding: '12px' }}>Pre Content</div>
          <Drawer.Root store={drawer}>
            <Drawer.Overlay>
              <Drawer.Content
                css={{
                  padding: '12px',
                  maxWidth: '400px',
                }}>
                <Button onClick={() => drawer.toggle(false)}>Close</Button>
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Root>
          <div css={{ padding: '12px' }}>Post Content</div>
        </Wrapper>
      </>
    );
  },
};

export const WithinContainerOverlapPositionTop: Story = {
  args: {
    defaultOpened: true,
    position: 'top',
    title: undefined,
    withCloseButton: undefined,
  },
  render: (args) => {
    const drawer = useDrawer(args);
    return (
      <>
        <Button {...drawer.interactions.getReferenceProps()}>
          {drawer.opened ? 'Close' : 'Open'}
        </Button>
        <Wrapper
          direction="column"
          alignItems="stretch"
          css={{
            position: 'relative',
            marginTop: '24px',
            overflow: 'hidden',
            width: '100%',
            height: '300px',
            border: '1px solid black',
            borderRadius: '12px',
          }}>
          <div css={{ padding: '12px' }}>Pre Content</div>
          <Drawer.Root store={drawer}>
            <Drawer.Overlay>
              <Drawer.Content
                css={{
                  padding: '12px',
                  maxHeight: '200px',
                }}>
                <Button onClick={() => drawer.toggle(false)}>Close</Button>
              </Drawer.Content>
            </Drawer.Overlay>
          </Drawer.Root>
          <div css={{ padding: '12px' }}>Post Content</div>
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
        <Button {...drawer.interactions.getReferenceProps()}>
          {drawer.opened ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay
              lockScroll
              css={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              <Drawer.Content css={{ padding: '12px', maxWidth: '400px' }}>
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
        <Button {...drawer.interactions.getReferenceProps()}>
          {drawer.opened ? 'Close' : 'Open'}
        </Button>
        <Drawer.Root store={drawer}>
          <Drawer.Portal>
            <Drawer.Overlay>
              <Drawer.Content css={{ padding: '12px', maxWidth: '400px' }}>
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
