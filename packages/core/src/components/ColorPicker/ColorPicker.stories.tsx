import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

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

export const DifferentColorPalette: Story = {
  render: (args) => {
    const [color, setColor] = useState<string>(args.defaultColor ?? '#FF5E5B');

    return (
      <ColorPicker
        defaultColor={color}
        onChange={setColor}
        label="Label"
        colorsPalette={[
          '#FF5E5B', // soft red
          '#FF9966', // tangerine
          '#FFCC66', // warm yellow
          '#CCFF66', // lime
          '#66FF66', // light green
          '#33CC99', // aqua green
          '#66CCCC', // teal
          '#66CCFF', // baby blue
          '#3399FF', // strong sky blue
          '#3366CC', // denim blue
          '#6A5ACD', // slate blue
          '#9966CC', // lavender purple
          '#CC66CC', // orchid
          '#FF66CC', // pink rose
          '#FF3399', // hot pink
          '#FF6699', // coral pink
          '#FFB6C1', // light pink
          '#FFD700', // gold
          '#DAA520', // goldenrod
          '#90EE90', // light green
          '#00CED1', // dark turquoise
          '#20B2AA', // light sea green
          '#7B68EE', // medium slate blue
          '#C71585', // medium violet red
        ]}
      />
    );
  },
};
