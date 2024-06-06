import { useState } from 'react';
import type { Meta } from '@storybook/react';
import { css } from '@emotion/react';

import ColorPicker from './ColorPicker';
import { ColorPickerProps, ColorsList } from './types';
import { mapColors } from './constants';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
} as Meta<typeof ColorPicker>;

export const Default = ({ initColor }: ColorPickerProps) => {
  const [color, setColor] = useState<ColorsList>(
    initColor || ('' as ColorsList),
  );

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

export const SelectedColor = () => {
  return (
    <Default
      initColor="green"
      onChange={() => {
        console.log('onChange');
      }}
    />
  );
};
