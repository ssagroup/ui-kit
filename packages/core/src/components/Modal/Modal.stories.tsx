import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Global, css } from '@emotion/react';

import Button from '@components/Button';
import Icon from '@components/Icon';
import mainTheme from '@themes/main';

import { Drawer } from '@components/Drawer';
import Modal from '@components/Modal';
import ModalContent from '@components/ModalContent';
import ModalOpenButton from '@components/ModalOpenButton';
import ModalDismissButton from '@components/ModalDismissButton';
import Typography from '@components/Typography';

import { useDrawer } from '../Drawer/useDrawer';

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    // https://storybook.js.org/docs/react/api/doc-block-story#height
    docs: { story: { height: '400px' } },
  },
} as Meta<typeof Modal>;

export const Default: StoryObj<typeof Modal> = () => (
  <Modal>
    <ModalOpenButton>
      <Button variant="primary" size="small" text="Open modal" />
    </ModalOpenButton>
    <ModalContent aria-label="label">
      <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ModalDismissButton>
          <Button
            variant="primary"
            size="small"
            startIcon={
              <Icon name="cross" size={12} color={mainTheme.colors.white} />
            }
          />
        </ModalDismissButton>
      </div>

      <Typography variant="body1">
        lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor,
        nisl eget
      </Typography>
    </ModalContent>
  </Modal>
);
Default.args = {};

export const Custom: StoryObj<typeof Modal> = () => (
  <Modal>
    <ModalOpenButton>
      <Button variant="primary" size="small" text="Open modal" />
    </ModalOpenButton>
    <ModalContent noBackground={true} aria-label="label">
      <div>
        <Typography variant="h3" gutter={true}>
          Hello
        </Typography>

        <Typography variant="body1" gutter={true}>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor,
          nisl eget
        </Typography>

        <ModalDismissButton>
          <Button variant="primary" size="small" text="close" />
        </ModalDismissButton>
      </div>
    </ModalContent>
  </Modal>
);
Custom.args = {};

export const Opened: StoryObj<typeof Modal> = () => (
  <Modal isOpen>
    <ModalOpenButton>
      <Button variant="primary" size="small" text="Open modal" />
    </ModalOpenButton>
    <ModalContent noBackground={true} aria-label="label">
      <div>
        <Typography variant="h3" gutter={true}>
          Hello
        </Typography>

        <Typography variant="body1" gutter={true}>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor,
          nisl eget
        </Typography>

        <ModalDismissButton>
          <Button variant="primary" size="small" text="close" />
        </ModalDismissButton>
      </div>
    </ModalContent>
  </Modal>
);
Opened.args = {};

export const ExternalState: StoryObj<typeof Modal> = () => {
  const [isOpen, setIsOpen] = useState(true);
  setTimeout(() => {
    setIsOpen(false);
  }, 5000);
  return (
    <Modal isOpen={isOpen}>
      <ModalOpenButton>
        <Button variant="primary" size="small" text="Open modal" />
      </ModalOpenButton>
      <ModalContent noBackground={true} aria-label="label">
        <div>
          <Typography variant="h3" gutter={true}>
            Hello
          </Typography>

          <Typography variant="body1" gutter={true}>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            auctor, nisl eget
          </Typography>

          <ModalDismissButton>
            <Button variant="primary" size="small" text="close" />
          </ModalDismissButton>
        </div>
      </ModalContent>
    </Modal>
  );
};
ExternalState.args = {};

export const InsideDrawer: StoryObj<typeof Modal> = () => {
  const drawer = useDrawer({ position: 'right', dismissable: true });
  return (
    <>
      <Global
        styles={css`
          .drawer-modal-content {
            max-width: 500px !important;
            width: 100% !important;
            padding: 12px !important;
          }
        `}
      />
      <Button variant="primary" {...drawer.interactions.getReferenceProps()}>
        {drawer.opened ? 'Close' : 'Open'} Drawer
      </Button>
      <Drawer.Root store={drawer}>
        <Drawer.Portal>
          <Drawer.Overlay>
            <Drawer.Content
              css={{ padding: '12px', maxWidth: '500px', width: '25%' }}>
              <Drawer.Header>
                <Drawer.Title>Drawer with Modal</Drawer.Title>
                <Drawer.CloseButton />
              </Drawer.Header>
              <div css={{ marginTop: '24px' }}>
                <p css={{ marginBottom: '16px' }}>
                  This drawer takes 25% of the screen from the right. The Modal
                  component is placed inside the drawer, but when opened, it
                  centers on the full screen while maintaining the drawer&#39;s
                  layout styling.
                </p>
                <Modal>
                  <ModalOpenButton>
                    <Button variant="primary">Open Modal</Button>
                  </ModalOpenButton>
                  <ModalContent
                    aria-label="Modal inside drawer"
                    className="drawer-modal-content"
                    usePortal>
                    <div css={{ padding: '8px' }}>
                      <h3 css={{ marginBottom: '12px' }}>Modal Title</h3>
                      <p css={{ marginBottom: '16px' }}>
                        This Modal opens centered on the full screen (not just
                        within the drawer&#39;s 25% area), but it maintains the
                        drawer&#39;s layout styling (width, padding, etc.). The
                        Modal component uses a portal to render outside the
                        drawer&#39;s DOM tree.
                      </p>
                      <ModalDismissButton>
                        <Button variant="secondary">Close Modal</Button>
                      </ModalDismissButton>
                    </div>
                  </ModalContent>
                </Modal>
              </div>
            </Drawer.Content>
          </Drawer.Overlay>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};
InsideDrawer.args = {};
