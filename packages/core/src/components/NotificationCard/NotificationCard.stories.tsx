import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Button from '@components/Button';

import { mainTheme } from '../..';

import { NotificationCard } from './NotificationCard';
import { childrenWrapper } from './styles';
import { NotificationCardProps } from './types';

const notifyValues: Array<Pick<NotificationCardProps, 'type' | 'time'>> = [
  {
    type: 'Informational',
    time: Date.now() - 600000,
  },
  {
    type: 'Warning',
    time: Date.now() - 1600000,
  },

  {
    type: 'Error',
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

    type: {
      options: ['Informational', 'Warning', 'Error'],
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
        type={args.type}
        time={args.time}>
        <div css={childrenWrapper}>
          <Button
            size="small"
            variant="tertiary"
            text="Ignore"
            css={{
              border: `1px solid ${mainTheme.colors.greyDropdownMain}`,
              fontWeight: '600',
              padding: '5px 21px',

              ['span']: {
                color: mainTheme.colors.greyCancelClearButton,
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
  type: 'Informational',
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
            type={value.type}
            time={value.time}
          />
        );
      })}
    </div>
  );
};

NotificationList.args = {};
