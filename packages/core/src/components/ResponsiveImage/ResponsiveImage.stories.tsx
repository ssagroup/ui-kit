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
            font-family: monospace;
            color: ${theme.colors.greyDarker60};
          `}>{`<img />`}</span>{' '}
        tag
      </Typography>
      <ResponsiveImage
        srcSet="https://placehold.co/64x64 64w, https://placehold.co/48x48 48w"
        sizes="(min-width: 1440px) 64px, 48px"
        src="https://placehold.co/48x48"
        alt="Steps"
      />
    </Fragment>
  );
};

Default.storyName = 'ResponsiveImage';
