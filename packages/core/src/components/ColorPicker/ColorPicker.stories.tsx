import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ColorPicker } from './ColorPicker';
import { COLORS_PALETTE } from './constants';

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [color, setColor] = useState<string>(
      args.defaultColor ?? COLORS_PALETTE[0],
    );

    return (
      <ColorPicker defaultColor={color} onChange={setColor} label="Label" />
    );
  },
};
