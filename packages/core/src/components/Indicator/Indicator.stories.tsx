import type { Meta, StoryObj } from '@storybook/react';
import { Theme, css, useTheme } from '@emotion/react';
import Typography from '@components/Typography';
import Badge from '@components/Badge';
import Icon from '@components/Icon';
import Indicator from './Indicator';
import Card from '@components/Card';
import { IndicatorProps } from './types';

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
    isVisible: {
      control: 'boolean',
    },
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
    text: {
      control: {
        type: 'text',
      },
      table: {
        type: {
          summary: 'string | element',
        },
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
  isVisible,
  position,
  background,
  text,
}: IndicatorProps) => {
  const theme = useTheme();
  return (
    <Indicator
      isVisible={isVisible}
      position={position}
      background={background}
      text={
        <Typography variant="body2" weight="regular" color={theme.colors.white}>
          {text}
        </Typography>
      }>
      <Badge color="blueLight" size="small" css={BadgeWrapper}>
        <Icon name="information" color={theme.colors.white} size={14} />
      </Badge>
    </Indicator>
  );
};

Default.argTypes = {};

export const RightSide: StoryObj<typeof Indicator> = () => {
  const theme = useTheme();
  return (
    <Indicator position="right" isVisible={true}>
      <Badge color="blueLight" size="small" css={BadgeWrapper}>
        <Icon name="information" color={theme.colors.white} size={14} />
      </Badge>
    </Indicator>
  );
};

RightSide.argTypes = {};

export const WithContent: StoryObj<typeof Indicator> = () => {
  const theme = useTheme();
  return (
    <Indicator
      isVisible={true}
      position="right"
      background={`linear-gradient(90deg, ${theme.colors.yellow} 0%, ${theme.colors.yellowLighter} 100%)`}
      text={
        <Typography variant="body2" weight="regular" color={theme.colors.white}>
          +20
        </Typography>
      }>
      <Card
        css={css`
          width: 500px;
        `}>
        Card
      </Card>
    </Indicator>
  );
};

WithContent.args = {};
