import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getStorybookAvatar } from '@storybook-assets/avatars';
import Avatar from './Avatar';
import { AvatarSizes } from './types';

const STANDARD_COLORS = [
  'pink',
  'yellow',
  'yellowWarm',
  'green',
  'turquoise',
  'purple',
  'blueLight',
  'blue',
] as const;

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    color: {
      control: { type: 'text' },
      table: {
        type: {
          summary: 'AvatarColor | string',
        },
      },
    },
    text: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    border: {
      control: { type: 'boolean' },
      table: { type: { summary: 'boolean' } },
    },
    borderColor: {
      control: { type: 'text' },
      table: { type: { summary: 'ColorsKeys | string' } },
    },
    image: {
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: { type: 'inline-radio' },
      options: Object.values(AvatarSizes),
      table: {
        type: { summary: 'small | medium | large' },
        defaultValue: { summary: AvatarSizes.medium },
      },
    },
  },
  args: {
    size: AvatarSizes.medium,
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

/**
 * Story 1: Standard design-system color + a single letter.
 */
export const StandardColorWithLetter: Story = {
  args: {
    color: 'purple',
    text: 'J',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Colored placeholder using one of the standard design-system colors (`pink`, `yellow`, `yellowWarm`, `green`, `turquoise`, `purple`, `blueLight`, `blue`) and a single initial letter.',
      },
    },
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
      {STANDARD_COLORS.map((color) => (
        <Avatar key={color} {...args} color={color} />
      ))}
    </div>
  ),
};

/**
 * Story 2: Custom profile image with no text.
 */
export const CustomProfileImage: Story = {
  args: {
    image: getStorybookAvatar(0),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Displays a custom user photo inside the circular avatar. Pass any valid image URL to the `image` prop.',
      },
    },
  },
};

/**
 * Story 3: Default placeholder (no props → user icon).
 */
export const DefaultPlaceholder: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'When no `color`, `text`, or `image` is supplied, the avatar falls back to the default user-icon placeholder.',
      },
    },
  },
};

/**
 * Story 4: User-defined color and user-defined letter.
 */
export const UserDefinedColorAndLetter: Story = {
  args: {
    color: 'rgb(247, 147, 26)',
    text: 'AB',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Any valid CSS color string (hex, rgb, named) can be used as a custom background color together with one or two initials. Use the controls to experiment.',
      },
    },
  },
};
