import type { Meta, StoryObj } from '@storybook/react';
import {
  Wrapper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@ssa-ui-kit/core';
import { tableBotsData } from './stories/mockData';
import styled from '@emotion/styled';

export default {
  title: 'Widgets/TableBots',
  component: Table,
  parameters: {
    controls: { disable: true },
  },
} as Meta<typeof Table>;

const TableCellBot = styled(TableCell)`
  border: none;
  padding: 12px 16px;
  background: #fff;
  font-size: 14px;
  font-weight: 500;
`;

const TableRowBot = styled(TableRow)<{ isDisabled?: boolean }>`
  border: none;
  ${({ isDisabled }) =>
    isDisabled && {
      opacity: 0.6,
    }}
  ${TableCellBot}:first-child {
    padding-left: 18px;
  }
`;

const TableHeadBot = styled(TableHead)`
  background: none;
  ${TableRowBot} ${TableCellBot}:first-child {
    padding-left: 16px;
  }
`;

const TableBot = styled(Table)`
  background: none;
  ${TableHeadBot} ${TableCellBot}:first-child {
    border-top-left-radius: 20px;
  }
  ${TableHeadBot} ${TableCellBot}:last-child {
    border-top-right-radius: 20px;
  }
  ${TableBody} ${TableRowBot}:last-child ${TableCellBot}:first-child {
    border-bottom-left-radius: 20px;
  }
  ${TableBody} ${TableRowBot}:last-child ${TableCellBot}:last-child {
    border-bottom-right-radius: 20px;
  }
  ${TableBody} ${TableRowBot}:not([aria-disabled='true']):hover {
    ${TableCellBot} {
      background-color: #eef1f7;
    }
  }
`;

export const Default: StoryObj<typeof Table> = () => {
  return (
    <Wrapper
      css={{
        width: '100%',
        height: '100%',
      }}>
      <TableBot>
        <TableHeadBot>
          <TableRowBot>
            <TableCellBot>Name</TableCellBot>
            <TableCellBot>Creation Date</TableCellBot>
            <TableCellBot>Exchange</TableCellBot>
            <TableCellBot>Status</TableCellBot>
            <TableCellBot>Pair</TableCellBot>
            <TableCellBot>PNL</TableCellBot>
            <TableCellBot>ROI</TableCellBot>
            <TableCellBot></TableCellBot>
          </TableRowBot>
        </TableHeadBot>
        <TableBody>
          {tableBotsData.map((item) => (
            <TableRowBot
              aria-disabled={item.isDisabled}
              key={item.id}
              isDisabled={item.isDisabled}>
              <TableCellBot>{item.name}</TableCellBot>
              <TableCellBot>{item.creationDate}</TableCellBot>
              <TableCellBot>{item.exchange}</TableCellBot>
              <TableCellBot>{item.status}</TableCellBot>
              <TableCellBot>{item.pair}</TableCellBot>
              <TableCellBot>{item.pnl.amount}</TableCellBot>
              <TableCellBot>{item.roi.amount}</TableCellBot>
              <TableCellBot>{item.status}</TableCellBot>
            </TableRowBot>
          ))}
        </TableBody>
      </TableBot>
    </Wrapper>
  );
};

Default.storyName = 'Table bots';
Default.parameters = {
  backgrounds: {
    default: 'main',
    values: [
      {
        name: 'main',
        value: '#D0D1D6',
      },
    ],
  },
};
