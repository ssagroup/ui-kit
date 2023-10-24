import { ButtonGroupItem } from '@ssa-ui-kit/core';
import { NotificationCardProps } from '@components/NotificationCard';

export interface DataProps {
  notificationItems: NotificationCardProps[];
  groupButtonItems: ButtonGroupItem[];
}

export const notificationData: DataProps = {
  groupButtonItems: [
    { id: 1, text: 'All', isDisabled: false },
    { id: 2, text: 'Unread', isDisabled: false },
  ],
  notificationItems: [
    {
      title: 'lorem',
      text: 'With our newest listing, we’re welcoming Wrapped Bitcoin to innovation Zone! You can now deposit',
      badgeColor: 'blueLight',
      iconName: 'information',
      isRead: false,
      time: Date.now() - 600000,
      children: true,
    },
    {
      title: 'CyberVeinToken is Now Available.',
      text: 'With our newest listing, we’re welcoming Wrapped',
      badgeColor: 'yellowWarm',
      iconName: 'warning',
      isRead: false,
      time: Date.now() - 1600000,
    },
    {
      title: 'CyberVeinToken is Now Available.',
      text: 'With our newest listing, we’re welcoming Wrapped',
      badgeColor: 'yellowWarm',
      iconName: 'warning',
      isRead: false,
      time: Date.now() - 1600000,
    },
    {
      title: 'CyberVeinToken is Now Available.',
      text: 'With our newest listing, we’re welcoming Wrapped',
      badgeColor: 'pink',
      iconName: 'attention',
      isRead: true,
      time: Date.now() - 2600000,
    },

    {
      title: 'CyberVeinToken is Now Available.',
      text: 'With our newest listing, we’re welcoming Wrapped',
      badgeColor: 'blueLight',
      iconName: 'information',
      isRead: true,
      time: Date.now() - 3600000,
    },
  ],
};

export const getMockData = () => {
  return new Promise<DataProps>((resolve) => {
    resolve(notificationData);
  });
};

export const divideOnSubArr = (arr: Array<NotificationCardProps>) => {
  return arr.reduce(
    (acc: Record<string, Array<NotificationCardProps>>, obj) => {
      if (!obj.isRead) {
        acc['Unread'].push(obj);
      }
      acc['All'] = arr;

      return acc;
    },
    { All: [], Unread: [] },
  );
};

export const readAll = (arr: Array<NotificationCardProps>) => {
  return arr.reduce((acc: Array<NotificationCardProps>, item) => {
    item.isRead = true;
    return [...acc, item];
  }, []);
};

export const disableButton = (
  arr: Array<ButtonGroupItem>,
  notifyArr: Array<NotificationCardProps>,
) => {
  return arr.reduce((accBtn: Array<ButtonGroupItem>, btn) => {
    if (!divideOnSubArr(notifyArr)[btn.text].length) {
      btn.isDisabled = true;
    }
    return [...accBtn, btn];
  }, []);
};
