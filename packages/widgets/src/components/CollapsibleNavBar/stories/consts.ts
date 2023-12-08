import { CollapsibleNavBarExtendedProps } from '../types';

export const ITEMS: CollapsibleNavBarExtendedProps['items'] = [
  { path: '', iconName: 'home', iconSize: 20, title: 'Dashboard' },
  {
    path: 'bots',
    iconName: 'robot',
    iconSize: 54,
    title: 'Bots',
    css: {
      position: 'absolute',
      top: '-14px',
    },
  },
  {
    prefix: 'statistics/',
    iconName: 'chart',
    iconSize: 22,
    title: 'Statistics',
    items: [
      { path: 'balance', title: 'Balance' },
      { path: 'max-in-work', title: 'Max in Work' },
      { path: 'orders', title: 'Orders' },
      { path: 'pnl', title: 'PNL' },
      { path: 'turnover', title: 'Turnover' },
      { path: 'hourly-pnl', title: 'Hourly PNL' },
    ],
  },
  { path: 'history', iconName: 'clock', iconSize: 24, title: 'History' },
  { path: 'settings', iconName: 'settings', iconSize: 20, title: 'Settings' },
];
