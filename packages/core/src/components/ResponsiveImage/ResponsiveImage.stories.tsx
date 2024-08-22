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
    <div className="lostpixel-ignore">
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
        srcSet={`
          https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Medium_90_51.png?alt=media&token=6761e4f3-b985-4322-8824-0c9668a2e2d9 90w, 
          https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Small_80_49.png?alt=media&token=910e7a01-8127-4e2e-88e6-1b85805d7beb 80w`}
        sizes="(max-width: 900px) 80px, (min-width: 900px) 90px"
        src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FUI_KIT_Small_80_49.png?alt=media&token=910e7a01-8127-4e2e-88e6-1b85805d7beb"
        alt="SSA UI Kit"
      />
    </div>
  );
};

Default.storyName = 'ResponsiveImage';
