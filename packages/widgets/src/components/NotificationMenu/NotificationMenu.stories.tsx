import { Meta, StoryObj } from '@storybook/react';
import { NotificationMenu } from './NotificationMenu';
import { Button, ButtonGroup, Icon, Indicator } from '@ssa-ui-kit/core';
import { mainTheme } from '@ssa-ui-kit/core';
import { ResetBtnStyles } from './styles';
import { css } from '@emotion/react';
import { NotificationCardProps } from '@components/NotificationCard';
import { useState } from 'react';

export default {
  title: 'Widgets/NotificationMenu',
  component: NotificationMenu,
} as Meta<typeof NotificationMenu>;

const Items = [
  { id: 1, text: 'All', isDisabled: false },
  { id: 2, text: 'Unread', isDisabled: false },
];

const notifyValues: Array<NotificationCardProps> = [
  {
    title: 'lorem',
    text: 'With our newest listing, we’re welcoming Wrapped Bitcoin to innovation Zone! You can now deposit',
    badgeColor: 'blueLight',
    iconName: 'information',
    isRead: false,
    time: Date.now() - 600000,
  },
  {
    title: 'Test',
    text: 'Test',
    badgeColor: 'yellowWarm',
    iconName: 'warning',
    isRead: false,
    time: Date.now() - 1600000,
  },
  {
    title: 'Test',
    text: 'Test',
    badgeColor: 'pink',
    iconName: 'attention',
    isRead: true,
    time: Date.now() - 2600000,
  },

  {
    title: 'Test',
    text: 'Test',
    badgeColor: 'blueLight',
    iconName: 'information',
    isRead: true,
    time: Date.now() - 3600000,
  },
];

export const Default: StoryObj<typeof NotificationMenu> = () => {
  const [read, setRead] = useState(notifyValues);
  const [buttons, setButtons] = useState(Items);
  const textProp = (
    <span
      css={{
        fontSize: 10,
        fontWeight: 600,
        color: '#fff',
        minWidth: '12px',
      }}>
      2
    </span>
  );
  const backgroundProp = `linear-gradient(90deg, ${mainTheme.colors.yellow} 0%, ${mainTheme.colors.yellowLighter} 100%)`;
  const triggerProp = (
    <Indicator
      position="right"
      isVisible={true}
      text={textProp}
      background={backgroundProp}>
      <div css={{ padding: '0 5px' }}>
        <Icon name="notification" size={20} color="##2B2D31" />
      </div>
    </Indicator>
  );
  const rightButtonProp = (
    <Button
      variant="info"
      text="View all notification"
      css={{ gridColumn: 2 }}
    />
  );
  const leftButtonProp = (
    <Button
      onClick={() => handleClickAll()}
      variant="tertiary"
      css={css`
        ${ResetBtnStyles}
        span {
          color: ${mainTheme.colors.blueDark};
        }
      `}
      startIcon={
        <Icon name="check-circle" size={16} color={mainTheme.colors.blueDark} />
      }
      text="Mark all as read"
    />
  );

  const handleClickAll = () => {
    const AllAreRead = notifyValues.filter((notifyItem) => {
      if (!notifyItem.isRead) {
        notifyItem.isRead = true;
      }

      return notifyItem;
    });

    setRead(AllAreRead);
  };

  const filterValues = () => {
    return notifyValues.reduce(
      (acc: Array<NotificationCardProps>, item: NotificationCardProps) => {
        if (item.isRead) {
          return [...acc, item];
        }

        return acc;
      },
      [],
    );
  };

  const handleClick = (item: any) => {
    if (item.text === 'Unread') {
      setRead(filterValues);
    } else {
      setRead(notifyValues);
    }
  };

  console.log(read);

  return (
    <div css={{ display: 'flex', justifyContent: 'flex-end', padding: 20 }}>
      <NotificationMenu
        trigger={triggerProp}
        notifications={read}
        rightButton={rightButtonProp}
        leftButton={leftButtonProp}>
        <ButtonGroup
          items={buttons}
          buttonStyles={css`
            margin: 12px 0 11px;
            background: ${mainTheme.colors.white};
            &:hover {
              background: ${mainTheme.colors.greyLighter};
            }
          `}
          onClick={(item) => handleClick(item)}></ButtonGroup>
      </NotificationMenu>
    </div>
  );
};

Default.args = {};
