import { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@emotion/react';
import { Button, IMapIcons, MainColors } from '@ssa-ui-kit/core';
import { NotificationCard } from './NotificationCard';
import { NotificationCardProps } from './types';

const childrenWrapper = (theme: Theme) => `
  grid-column: 2 / span 2;
  margin-top: 10px;

  button {
    height: 31px;
    border-radius: 6px;
    font-weight: 700;

    &:focus::before {
      content: none;
    }

    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  ${theme.mediaQueries.md} {
    margin-top: 13px;
  }

  ${theme.mediaQueries.xs} {
    button {
      height: 28px;
      padding: 10px;

      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
`;

const notifyValues: Array<{
  badgeColor: keyof MainColors;
  iconName: keyof IMapIcons;
  time: number;
}> = [
  {
    badgeColor: 'blueLight',
    iconName: 'information',
    time: Date.now() - 600000,
  },
  {
    badgeColor: 'yellowWarm',
    iconName: 'warning',
    time: Date.now() - 1600000,
  },

  {
    badgeColor: 'pink',
    iconName: 'attention',
    time: Date.now() - 2600000,
  },
];

export default {
  title: 'Widgets/NotificationCard',
  component: NotificationCard,
  argTypes: {
    isRead: {
      control: 'boolean',
    },
    badgeColor: {
      options: ['blueLight', 'yellowWarm', 'pink'],
      control: {
        type: 'select',
      },
    },

    iconName: {
      options: ['information', 'warning', 'attention'],
      control: {
        type: 'select',
      },
    },

    time: {
      control: {
        type: 'date',
      },
    },
  },
} as Meta<typeof NotificationCard>;

export const Default: StoryObj<typeof NotificationCard> = (
  args: NotificationCardProps,
) => {
  return (
    <div css={{ padding: '20px', background: '#F2F4F7', borderRadius: '20px' }}>
      <NotificationCard
        title={args.title}
        text={args.text}
        isRead={args.isRead}
        badgeColor={args.badgeColor}
        iconName={args.iconName}
        time={args.time}>
        <div css={childrenWrapper}>
          <Button
            size="small"
            variant="tertiary"
            text="Ignore"
            css={{
              border: `1px solid #DEE0E8`,
              fontWeight: '600',
              padding: '5px 21px',

              ['span']: {
                color: '#656567',
              },
            }}
          />
          <Button
            size="small"
            variant="attention"
            text="Stop bot"
            css={{ padding: '5px 26px' }}
          />
        </div>
      </NotificationCard>
    </div>
  );
};

Default.args = {
  title: 'CyberVeinToken is Now Available on Exchange',
  text: 'You have an error with Bot name 1. Do you want to stop this bot?',
  isRead: false,
  badgeColor: 'blueLight',
  iconName: 'information',
  time: Date.now() - 1200000,
};

export const NotificationList: StoryObj<typeof NotificationCard> = () => {
  return (
    <div css={{ padding: '20px', background: '#F2F4F7', borderRadius: '20px' }}>
      {notifyValues.map((value, index) => {
        return (
          <NotificationCard
            key={index}
            title="CyberVeinToken is Now Available"
            text="With our newest listing, we’re welcoming Wrapped "
            isRead={false}
            badgeColor={value.badgeColor}
            iconName={value.iconName}
            time={value.time}
          />
        );
      })}
    </div>
  );
};

NotificationList.args = {};
