import { Fragment } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@components/Typography';
import ResponsiveImage from './index';

export default {
  title: 'Utility/ResponsiveImage',
  component: ResponsiveImage,
} as Meta<typeof ResponsiveImage>;

export const Default: StoryObj<typeof ResponsiveImage> = () => {
  return (
    <Fragment>
      <Typography variant="h6" gutter>
        A simple wrapper over the{' '}
        <span
          css={(theme) => css`
            font-family: 'monospace';
            color: ${theme.colors.greyDarker60};
          `}>{`<img />`}</span>{' '}
        tag
      </Typography>
      <ResponsiveImage
        srcSet="/img/steps/steps_64.png 64w, /img/steps/steps_48.png 48w"
        sizes="(min-width: 1440px) 64px, 48px"
        src="/img/steps/steps_48.png"
        alt="Steps"
      />
      <ResponsiveImage
        srcSet="/img/water/water_64.png 64w, /img/water/water_48.png 48w"
        sizes="(min-width: 1440px) 64px, 48px"
        src="/img/water/water_48.png"
        alt="Water"
      />
      <ResponsiveImage
        srcSet="/img/calories/calories_64.png 64w, /img/calories/calories_48.png 48w"
        sizes="(min-width: 1440px) 64px, 48px"
        src="/img/calories/calories_48.png"
        alt="Calories burn"
      />
      <ResponsiveImage
        srcSet="/img/heart/heart_64.png 64w, /img/heart/heart_48.png 48w"
        sizes="(min-width: 1440px) 64px, 48px"
        src="/img/heart/heart_48.png"
        alt="Heart"
      />
    </Fragment>
  );
};

Default.storyName = 'ResponsiveImage';
