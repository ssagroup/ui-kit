import { Icon } from '@ssa-ui-kit/core';

export const defaultBoardArr = [
  {
    value: (
      <div>
        <Icon name="stats" color="gold" size={16} />
        <span css={{ marginLeft: '10px' }}>Binance</span>
      </div>
    ),
    title: 'Exchange',
  },
  {
    value: 'Account name',
    title: 'Account',
  },
  {
    value: 'Grid v7',
    title: 'Strategy',
  },
  {
    value: 'ETH/USDT',
    title: 'Pairs',
  },
  {
    value: '25',
    title: 'Orders',
  },
  {
    value: '27.07.23',
    unit: '4:22:23 pm',
    title: 'Start Date',
  },
  {
    value: '30.07.23',
    unit: '4:22:23 pm',
    title: 'End date',
  },
  {
    value: '4d 5h 36m 2s',
    title: 'Launch duration',
  },
  {
    value: '25',
    unit: '%',
    title: 'ROI',
    icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
  },
  {
    value: '340.025',
    unit: 'USD',
    title: 'PNL',
    icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
  },
];

export const oneLineBoardArr = [
  {
    value: '16',
    title: 'Exchanges',
  },
  {
    value: '6',
    title: 'Accounts',
  },
  {
    value: '62',
    title: 'Orders',
  },
  {
    value: '500.125',
    unit: 'USD',
    title: 'Turnover',
  },
  {
    value: '340',
    unit: 'USD',
    title: 'PNL',
    icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
  },
  {
    value: '25',
    unit: '%',
    title: 'ROI',
    icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
  },
  {
    value: '15',
    title: 'Errors',
  },
];

export const linkBoardArr = [
  {
    value: '16',
    title: 'Exchanges',
    link: '/Exchanges',
  },
  {
    value: '6',
    title: 'Accounts',
    link: '/Accounts',
  },
  {
    value: '62',
    title: 'Orders',
    link: '/Orders',
  },
  {
    value: '500.025',
    unit: 'USD',
    title: 'Turnover',
    link: '/Turnover',
  },
  {
    value: '340',
    unit: 'USD',
    title: 'PNL',
    icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    link: '/PNL',
  },
  {
    value: '25',
    unit: '%',
    title: 'ROI',
    icon: <Icon name="arrow-up" color="#2CA24D" size={16} />,
    link: '/ROI',
  },
  {
    value: '15',
    title: 'Errors',
    link: '/Errors',
  },
];
