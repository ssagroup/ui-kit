import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Typography from '@components/Typography';
import { iconsList } from '@components/Icon';
import { IconButton } from './IconButton';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    icon: {
      options: iconsList,
      control: { type: 'select' },
      description: 'Icon name from the kit',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers (defaults to icon name)',
    },
    title: {
      control: 'text',
      description: 'Tooltip text on hover',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    transparent: {
      control: 'boolean',
      description: 'Transparent background',
    },
    styles: {
      control: false,
      description: 'Custom styles: button, iconColor, icon',
    },
  },
  args: {
    icon: 'edit',
    'aria-label': 'Edit',
    disabled: false,
    transparent: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { onClick: () => {} },
  render: (args) => (
    <div css={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <IconButton {...args} />
    </div>
  ),
};

export const Edit: Story = {
  args: {
    icon: 'edit',
    'aria-label': 'Edit',
    onClick: () => {},
  },
};

export const Bin: Story = {
  args: {
    icon: 'bin',
    'aria-label': 'Delete',
    onClick: () => {},
  },
};

export const Transparent: Story = {
  args: {
    icon: 'bin',
    'aria-label': 'Delete',
    transparent: true,
    onClick: () => {},
  },
};

export const Disabled: Story = {
  args: {
    icon: 'edit',
    'aria-label': 'Edit',
    disabled: true,
    onClick: () => {},
  },
};

export const WithTooltip: Story = {
  args: {
    icon: 'edit',
    'aria-label': 'Edit',
    title: 'Edit item',
    onClick: () => {},
  },
};
