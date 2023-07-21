import type { Meta, StoryObj } from '@storybook/react';

import Button from '@components/Button';
import Icon from '@components/Icon';
import mainTheme from '@themes/main';

import Modal from '@components/Modal';
import ModalContent from '@components/ModalContent';
import ModalOpenButton from '@components/ModalOpenButton';
import ModalDismissButton from '@components/ModalDismissButton';

import Typography from '@components/Typography';

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
      <Button size="small" text="Open modal" />
    </ModalOpenButton>
    <ModalContent aria-label="label">
      <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ModalDismissButton>
          <Button
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
      <Button size="small" text="Open modal" />
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
          <Button size="small" text="close" />
        </ModalDismissButton>
      </div>
    </ModalContent>
  </Modal>
);
Custom.args = {};
