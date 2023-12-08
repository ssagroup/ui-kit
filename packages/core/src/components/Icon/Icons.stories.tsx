import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@components/Typography/Typography';
import Icon, { iconsList } from './index';

export default {
  title: 'Components/Icons',
  component: Icon,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    color: { control: 'color' },
  },
} as Meta<typeof Icon>;

const iconWrapper = css`
  width: 120px;
  height: 120px;
  border: 1px solid grey;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const Default: StoryObj<typeof Icon> = (
  args: Parameters<typeof Icon>[0],
) => {
  return (
    <div
      css={css`
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
        padding-bottom: 54px;
        gap: 12px;
      `}>
      {iconsList.map((iconName) => (
        <div css={iconWrapper} key={iconName}>
          <Icon
            name={iconName}
            size={
              args.size && (iconName === 'robot' ? args.size * 2 : args.size)
            }
            color={args.color}
          />
          <Typography variant="body1">{iconName}</Typography>
        </div>
      ))}
    </div>
  );
};

Default.storyName = 'Icons';
