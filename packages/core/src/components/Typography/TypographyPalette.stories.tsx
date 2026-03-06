import { type StoryObj, type Meta } from '@storybook/react-webpack5';
import { useTheme } from '@emotion/react';
import Typography from './index';

type TypographyPaletteProps = Record<string, never>;

const variants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle',
  'body1',
  'body2',
  'body3',
  'caption',
] as const;

const meta = {
  title: 'Design System/Typography Palette',
  component: () => {
    const theme = useTheme();

    return (
      <div
        css={{
          padding: '24px',
          maxWidth: '1400px',
          margin: '0 auto',
        }}>
        <Typography variant="h1" gutter>
          Typography Palette
        </Typography>
        <Typography variant="body1" color={theme.colors.greyDarker80}>
          All available typography variants in the design system
        </Typography>

        {/* Variants Section */}
        <div
          css={{
            marginTop: '48px',
          }}>
          <Typography variant="h2" gutter>
            Variants
          </Typography>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}>
            {variants.map((variant) => (
              <div
                key={variant}
                css={{
                  border: `1px solid ${theme.colors.greyOutline}`,
                  borderRadius: '8px',
                  padding: '24px',
                  backgroundColor: theme.colors.white,
                }}>
                <div
                  css={{
                    marginBottom: '16px',
                  }}>
                  <Typography
                    variant="subtitle"
                    color={theme.colors.greyDarker80}>
                    {`variant="${variant}"`}
                  </Typography>
                </div>
                <Typography variant={variant}>
                  The quick brown fox jumps over the lazy dog
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  tags: ['autodocs'],
} satisfies Meta<TypographyPaletteProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
