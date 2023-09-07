import type { Meta, StoryObj } from '@storybook/react';

import Icon from './index';
import { css } from '@emotion/react';
import Typography from '@components/Typography/Typography';

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
      <div css={iconWrapper}>
        <Icon name="diet" size={args.size} color={args.color} />
        <Typography variant="body1">diet</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="calendar" size={args.size} color={args.color} />
        <Typography variant="body1">calendar</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="home" size={args.size} color={args.color} />
        <Typography variant="body1">home</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="trainings" size={args.size} color={args.color} />
        <Typography variant="body1">trainings</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="sleep" size={args.size} color={args.color} />
        <Typography variant="body1">sleep</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="stats" size={args.size} color={args.color} />
        <Typography variant="body1">stats</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="measurements" size={args.size} color={args.color} />
        <Typography variant="body1">measurements</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="settings" size={args.size} color={args.color} />
        <Typography variant="body1">settings</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="plus" size={args.size} color={args.color} />
        <Typography variant="body1">plus</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="minus" size={args.size} color={args.color} />
        <Typography variant="body1">minus</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="check" size={args.size} color={args.color} />
        <Typography variant="body1">check</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="more" size={args.size} color={args.color} />
        <Typography variant="body1">more</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="cross" size={args.size} color={args.color} />
        <Typography variant="body1">cross</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="notification" size={args.size} color={args.color} />
        <Typography variant="body1">notification</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="user" size={args.size} color={args.color} />
        <Typography variant="body1">user</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="union" size={args.size} color={args.color} />
        <Typography variant="body1">union</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="visible" size={args.size} color={args.color} />
        <Typography variant="body1">visible</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="invisible" size={args.size} color={args.color} />
        <Typography variant="body1">invisible</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="carrot-up" size={args.size} color={args.color} />
        <Typography variant="body1">carrot-up</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="carrot-down" size={args.size} color={args.color} />
        <Typography variant="body1">carrot-down</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="carrot-left" size={args.size} color={args.color} />
        <Typography variant="body1">carrot-left</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="carrot-right" size={args.size} color={args.color} />
        <Typography variant="body1">carrot-right</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="radio-on" size={args.size} color={args.color} />
        <Typography variant="body1">radio-on</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="circle" size={args.size} color={args.color} />
        <Typography variant="body1">circle</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="arrow-up" size={args.size} color={args.color} />
        <Typography variant="body1">arrow-up</Typography>
      </div>
      <div css={iconWrapper}>
        <Icon name="arrow-down" size={args.size} color={args.color} />
        <Typography variant="body1">arrow-down</Typography>
      </div>
    </div>
  );
};

Default.storyName = 'Icons';
