import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { css } from '@emotion/react';

import ColorPicker, { mapColors } from './ColorPicker';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
} as Meta<typeof ColorPicker>;

export const Default = ({ initColor }) => {
  const [color, setColor] = useState(initColor || '');

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
Default.propTypes = {
  initColor: String,
};

export const SettedColor = () => {
  return <Default initColor="green" />;
};
