import { Icon } from '@ssa-ui-kit/core';
import React from 'react';
import { ExchangeAccountProps } from './types';

export const dataValues: Array<
  Omit<ExchangeAccountProps, 'onClick' | 'deleteOnClick'>
> = [
  {
    platform: (
      <React.Fragment>
        <Icon name="stats" color="#EFC938" size={20} />
        Binance
      </React.Fragment>
    ),
    title: 'Account Name',
    status: 'Active',
    data: {
      total: 48000.53032,
      currency: 'USDT',
      data: [
        {
          id: 'BTC',
          label: 'BTC',
          legendValue: 1,
          value: 5371.23,
        },
        {
          id: 'LTC',
          label: 'LTC',
          legendValue: 7,
          value: 5300.25,
        },
        {
          id: 'ETH',
          label: 'ETH',
          legendValue: 1,
          value: 1815.31,
        },
        {
          id: 'Other',
          label: 'Other',
          legendValue: 943,
          value: 1513.9956,
        },
      ],
    },
  },
  {
    platform: 'Binance',
    title: 'Name#2',
    status: 'NotAvailable',
    data: {
      total: 4800.53,
      currency: 'USDT',
      data: [
        {
          id: 'BTC',
          label: 'BTC',
          legendValue: 100,
          value: 2371.23,
        },
        {
          id: 'LTC',
          label: 'LTC',
          legendValue: 52,
          value: 5300.25,
        },
        {
          id: 'ETH',
          label: 'ETH',
          legendValue: 86,
          value: 3815.31,
        },
        {
          id: 'Other',
          label: 'Other',
          legendValue: 943,
          value: 1513.9956,
        },
      ],
    },
  },
  {
    platform: 'Binance',
    title: 'Name#3',
    status: 'NotAvailable',
    data: {
      total: 10000.53,
      currency: 'USDT',
      data: [
        {
          id: 'BTC',
          label: 'BTC',
          legendValue: 95,
          value: 1371.23,
        },
        {
          id: 'LTC',
          label: 'LTC',
          legendValue: 7,
          value: 8300.25,
        },
        {
          id: 'ETH',
          label: 'ETH',
          legendValue: 6,
          value: 4815.31,
        },
        {
          id: 'Other',
          label: 'Other',
          legendValue: 943,
          value: 3513.9956,
        },
      ],
    },
  },
  {
    platform: 'Binance',
    title: 'Name#4',
    status: 'Active',
    data: {
      total: 9000.53032,
      currency: 'USDT',
      data: [
        {
          id: 'BTC',
          label: 'BTC',
          legendValue: 10,
          value: 5371.23,
        },
        {
          id: 'LTC',
          label: 'LTC',
          legendValue: 7,
          value: 5300.25,
        },
        {
          id: 'ETH',
          label: 'ETH',
          legendValue: 1,
          value: 7815.31,
        },
        {
          id: 'Other',
          label: 'Other',
          legendValue: 943,
          value: 5513.9956,
        },
      ],
    },
  },
];
