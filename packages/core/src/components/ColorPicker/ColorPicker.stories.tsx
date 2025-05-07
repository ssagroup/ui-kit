import { useState } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';

import { ColorPicker } from './ColorPicker';

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [color, setColor] = useState<string>(args.defaultColor ?? 'red');

    return (
      <div>
        <ColorPicker defaultColor={color} onChange={setColor} />
        <div
          style={{ background: color }}
          css={css`
            width: 50px;
            height: 50px;
          `}
        />
        {color}
      </div>
    );
  },
};
