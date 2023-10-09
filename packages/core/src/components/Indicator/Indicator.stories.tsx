import type { Meta, StoryObj } from '@storybook/react';
import { Theme, useTheme } from '@emotion/react';
import Typography from '@components/Typography';
import Badge from '@components/Badge';
import Icon from '@components/Icon';
import Indicator from './Indicator';
import { indicatorProps } from './types';

const BadgeWrapper = (theme: Theme) => `
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  padding: 5px;
  border-radius: 6px;
  box-shadow: -4px 12px 14px 0px #DAE1E1;

  ${theme.mediaQueries.md} {
    height: 42px;
    width: 42px;
    padding: 11px;
    border-radius: 12px;

    svg {
      width: 20px;
      height: 20px;
    },
  },
`;

export default {
  title: 'Components/Indicator',
  component: Indicator,
  argTypes: {
    position: {
      table: {
        type: {
          summary: 'string',
        },
      },
      options: ['right', 'left'],
      control: {
        type: 'select',
      },
    },
    children: {
      control: {
        type: 'text',
      },
      table: {
        type: {
          summary: 'string | element',
        },
      },
    },
  },
} as Meta<typeof Indicator>;

export const Default: StoryObj<typeof Indicator> = ({
  position,
  background,
}: indicatorProps) => {
  const theme = useTheme();
  return (
    <Indicator
      position={position}
      background={background}
      text={
        <Typography color={theme.colors.white} variant="body2" weight="regular">
          +210
        </Typography>
      }>
      <Badge color="blueLight" size="small" css={BadgeWrapper}>
        <Icon name="information" color={theme.colors.white} size={14} />
      </Badge>
    </Indicator>
  );
};

Default.argTypes = {};

// export const RightSide: StoryObj<typeof Indicator> = () => {
//   const theme = useTheme();
//   return (
//     <Badge color="blueLight" size="small" css={BadgeWrapper}>
//       <Indicator position="right" />
//       <Icon name="information" color={theme.colors.white} size={14} />
//     </Badge>
//   );
// };

// RightSide.argTypes = {};

// export const WithContent: StoryObj<typeof Indicator> = () => {
//   const theme = useTheme();
//   return (
//     <Card
//       css={css`
//         position: relative;
//       `}>
//       <Indicator
//         position="left"
//         background={`linear-gradient(90deg, ${theme.colors.yellow} 0%, ${theme.colors.yellowLighter} 100%)`}>
//         <Typography variant="body2" weight="regular" color={theme.colors.white}>
//           +20
//         </Typography>
//       </Indicator>
//       Card
//     </Card>
//   );
// };

// WithContent.args = {};
