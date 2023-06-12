import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from '@emotion/react';

import ColorPicker, { mapColors } from './ColorPicker';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
} as Meta<typeof ColorPicker>;

export const Default: StoryObj<typeof ColorPicker> = () => {
  const [color, setColor] = useState('');

  return (
    <div>
      <ColorPicker onChange={setColor} />
      <div
        css={[
          mapColors[color],
          css`
            width: 50px;
            height: 50px;
          `,
        ]}
      />
    </div>
  );
};

Default.args = {};
