import type { Meta, StoryObj } from '@storybook/react';

import Typography from './index';
import { TypographyProps } from './types';

export default {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    color: { control: 'color' },
    variant: {
      control: {
        disable: true,
      },
    },
  },
} as Meta<typeof Typography>;

export const Basic: StoryObj<typeof Typography> = ({
  weight,
  gutter,
  color,
}: TypographyProps) => {
  return (
    <div>
      <Typography variant="h1" weight={weight} gutter={gutter} color={color}>
        H1. text variant
      </Typography>
      <Typography variant="h2" weight={weight} gutter={gutter} color={color}>
        H2. text variant
      </Typography>
      <Typography variant="h3" weight={weight} gutter={gutter} color={color}>
        H3. text variant
      </Typography>
      <Typography variant="h4" weight={weight} gutter={gutter} color={color}>
        H4. text variant
      </Typography>
      <Typography variant="h5" weight={weight} gutter={gutter} color={color}>
        H5. text variant
      </Typography>
      <Typography variant="h6" weight={weight} gutter={gutter} color={color}>
        H6. text variant
      </Typography>
      <Typography
        variant="subtitle"
        weight={weight}
        gutter={gutter}
        color={color}>
        Sub-title. text variant
      </Typography>
      <Typography variant="body1" weight={weight} gutter={gutter} color={color}>
        Body 1. text variant
      </Typography>
      <Typography variant="body2" weight={weight} gutter={gutter} color={color}>
        Body 2. text variant
      </Typography>
      <Typography
        variant="caption"
        weight={weight}
        gutter={gutter}
        color={color}>
        Caption. text variant
      </Typography>
    </div>
  );
};

Basic.storyName = 'Typography';
