import { Fragment } from 'react';

import { css } from '@emotion/react';
import {
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from '@storybook/addon-docs';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import Badge from '@components/Badge';
import Icon from '@components/Icon';
import Table from '@components/Table';
import TableBody from '@components/TableBody';
import TableCell from '@components/TableCell';
import TableCellHeader from '@components/TableCellHeader';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import Wrapper from '@components/Wrapper';

import { SortableTable } from './SortableTable';
import { StyledTableStory } from './StyledTable/StoryComponent';
import { SortInfo } from './types';

export default {
  title: 'Components/Table',
  component: Table,
  globals: {
    backgrounds: { value: 'main' },
  },
  parameters: {
    controls: { disable: true },
    backgrounds: {
      options: {
        main: { name: 'Main', value: '#D0D1D6' },
      },
    },
    docs: {
      source: {
        type: 'code',
      },
      page: () => (
        <Fragment>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Stories />
        </Fragment>
      ),
    },
  },
} as Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = () => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCellHeader>Col</TableCellHeader>
          <TableCellHeader>
            <Wrapper
              css={css`
                svg {
                  margin-right: 10px;
                }
              `}>
              <Icon name="calendar" size={16} />
              Col
            </Wrapper>
          </TableCellHeader>
          <TableCellHeader align="center">Col 3</TableCellHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Row</TableCell>
          <TableCell>
            <Badge>Row</Badge>
          </TableCell>
          <TableCell align="center">Row</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Row 2</TableCell>
          <TableCell>
            <Badge color="green">Row 2</Badge>
          </TableCell>
          <TableCell align="center">Row 2</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

Default.storyName = 'Table';

export const TableSorting: StoryObj<typeof Table> = () => {
  const handleSortingChange = (sortInfo: SortInfo) => {
    alert('Sorting changed to ' + JSON.stringify(sortInfo));
  };
  return <SortableTable onSortingChange={handleSortingChange} />;
};

TableSorting.args = {};

export const StyledTable: StoryObj<typeof Table> = () => <StyledTableStory />;
StyledTable.args = {};
