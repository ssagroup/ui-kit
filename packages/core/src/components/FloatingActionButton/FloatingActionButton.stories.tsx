import { ReactNode, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { FloatingActionButton } from './FloatingActionButton';
import { FloatingActionButtonAction, FloatingActionButtonSize } from './types';

const SIZES: FloatingActionButtonSize[] = [
  'extraSmall',
  'small',
  'medium',
  'large',
];

const actions: FloatingActionButtonAction[] = [
  { id: 'first', icon: 'plus', label: 'First', onClick: () => {} },
  { id: 'second', icon: 'plus', label: 'Second', onClick: () => {} },
  { id: 'third', icon: 'plus', label: 'Third', onClick: () => {} },
];

/**
 * The FAB is `position: fixed`; the transform makes this box its containing
 * block, so each story keeps the FAB in its own frame instead of the
 * viewport corner.
 */
const Frame = ({
  children,
  width = '100%',
  height = 320,
}: {
  children: ReactNode;
  width?: number | string;
  height?: number;
}) => (
  <div
    style={{
      position: 'relative',
      transform: 'translateZ(0)',
      width,
      height,
      border: '1px dashed #dee1ec',
      borderRadius: 8,
    }}>
    {children}
  </div>
);

const meta: Meta<typeof FloatingActionButton> = {
  title: 'Components/FloatingActionButton',
  component: FloatingActionButton,
  decorators: [
    (Story, { parameters }) =>
      parameters.ownFrames ? (
        <Story />
      ) : (
        <Frame>
          <Story />
        </Frame>
      ),
  ],
  argTypes: {
    size: { options: SIZES, control: { type: 'inline-radio' } },
    shape: { options: ['square', 'round'], control: { type: 'inline-radio' } },
    position: {
      options: ['bottom-right', 'bottom-left', 'top-right', 'top-left'],
      control: { type: 'inline-radio' },
    },
    color: { control: { type: 'text' } },
  },
  args: {
    'aria-label': 'Add',
    color: 'primary',
    shadow: true,
    shape: 'square',
    size: 'medium',
    position: 'bottom-right',
    offset: 24,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof FloatingActionButton>;

export const Default: Story = {};

export const Extended: Story = {
  args: { label: 'Button' },
};

export const Secondary: Story = {
  args: { color: 'secondary', shadow: false },
};

/** Every size, icon-only and extended, in both pre-defined colors. */
export const Sizes: Story = {
  parameters: { ownFrames: true },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['primary', 'secondary'] as const).map((color) => (
        <div key={color} style={{ display: 'flex', gap: 16 }}>
          {SIZES.map((size) => (
            <Frame key={size} width={88} height={80}>
              <FloatingActionButton
                {...args}
                color={color}
                shadow={color === 'primary'}
                size={size}
                offset={16}
              />
            </Frame>
          ))}
          {SIZES.map((size) => (
            <Frame key={`${size}-label`} width={170} height={80}>
              <FloatingActionButton
                {...args}
                label="Button"
                color={color}
                shadow={color === 'primary'}
                size={size}
                offset={16}
              />
            </Frame>
          ))}
        </div>
      ))}
    </div>
  ),
};

/**
 * Theme keys and CSS colors. The icon and label color is picked for contrast.
 */
export const CustomColors: Story = {
  parameters: { ownFrames: true },
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      {['green', 'yellow', 'purpleVivid', '#2b2d31', '#ffe4c4'].map((color) => (
        <Frame key={color} width={190} height={80}>
          <FloatingActionButton
            {...args}
            label={color}
            color={color}
            offset={16}
          />
        </Frame>
      ))}
    </div>
  ),
};

export const Round: Story = {
  args: { shape: 'round' },
};

export const Disabled: Story = {
  args: { disabled: true, label: 'Button' },
};

/** Speed-dial menu with labelled items, as in the design. */
export const Menu: Story = {
  args: { 'aria-label': 'Create', actions, defaultOpen: true },
};

/** Icon-only round items; labels stay as accessible names. */
export const MenuIconOnly: Story = {
  args: {
    'aria-label': 'Create',
    actions,
    shape: 'round',
    showActionLabels: false,
    defaultOpen: true,
  },
};

/** Menu sizes side by side. */
export const MenuSizes: Story = {
  parameters: { ownFrames: true },
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      {SIZES.map((size) => (
        <Frame key={size} width={170} height={260}>
          <FloatingActionButton
            {...args}
            aria-label="Create"
            actions={actions}
            size={size}
            defaultOpen
            offset={16}
          />
        </Frame>
      ))}
    </div>
  ),
};

/** Top corners open the menu downwards. */
export const MenuFromTop: Story = {
  args: {
    'aria-label': 'Create',
    actions,
    position: 'top-left',
    defaultOpen: true,
  },
};

export const Controlled: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    const [last, setLast] = useState<string>();
    return (
      <>
        <p style={{ margin: 16 }}>
          Menu is {open ? 'open' : 'closed'}
          {last && ` — last chosen: ${last}`}
        </p>
        <FloatingActionButton
          {...args}
          aria-label="Create"
          open={open}
          onOpenChange={setOpen}
          actions={actions.map((action) => ({
            ...action,
            onClick: () => setLast(action.label),
          }))}
        />
      </>
    );
  },
};
