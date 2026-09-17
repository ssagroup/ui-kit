import { Fragment } from 'react';
import { css } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
} from '@storybook/addon-docs/blocks';

import Badge from '@components/Badge';
import Icon from '@components/Icon';
import Wrapper from '@components/Wrapper';
import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';
import TableCellHeader from '@components/TableCellHeader';
import { SortableTable } from './SortableTable';
import {
  ControlledResizableTable,
  ExpandingResizableTable,
  ResizableTable,
} from './ResizableTable';
import { CustomHeaderResizableTable } from './CustomHeaderResizableTable';
import { SortInfo } from './types';
import { DOCUMENTED_TABLE_PROPS } from './consts';
import { StyledTableStory } from './StyledTable/StoryComponent';

export default {
  title: 'Components/Table',
  component: Table,
  globals: {
    backgrounds: { value: 'main' },
  },
  parameters: {
    controls: { disable: true, include: DOCUMENTED_TABLE_PROPS },
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

export const TableResizableColumns: StoryObj<typeof Table> = () => (
  <ResizableTable />
);

TableResizableColumns.storyName = 'Resizable columns';
TableResizableColumns.args = {};
TableResizableColumns.parameters = {
  docs: {
    description: {
      story:
        'Drag the right edge of any header cell to resize its column. Width ' +
        'is traded with the column to the right, so the table stays exactly ' +
        'as wide as it was and nothing around it reflows — the last column ' +
        'has nothing to trade with and so has no handle. The handles are ' +
        'keyboard operable: Tab to one, then Left/Right to resize in 8px ' +
        'steps, Shift + Left/Right in 40px steps, and Enter — or a double ' +
        'click — to restore the width it started at.',
    },
  },
};

export const TableExpandingColumns: StoryObj<typeof Table> = () => (
  <ExpandingResizableTable />
);

TableExpandingColumns.storyName = 'Resizable columns (expand mode)';
TableExpandingColumns.args = {};
TableExpandingColumns.parameters = {
  docs: {
    description: {
      story:
        'With `columnResizeMode="expand"` every column keeps the width the ' +
        'user gave it and the table grows instead, so every column — the ' +
        'last one included — has a handle. The table then needs a parent it ' +
        'can scroll sideways in.',
    },
  },
};

export const TableCustomHeaderResizing: StoryObj<typeof Table> = () => (
  <CustomHeaderResizableTable />
);

TableCustomHeaderResizing.storyName = 'Resizable columns (custom header)';
TableCustomHeaderResizing.args = {};
TableCustomHeaderResizing.parameters = {
  docs: {
    description: {
      story:
        'The headless path. `resizableColumns` is not set — instead the story ' +
        'calls `useColumnResize` itself and owns the header markup, the ' +
        'colgroup, the `table-layout: fixed` rule, the cell truncation and ' +
        'the look of the handles. Each handle is told its column index, so ' +
        'nothing is inferred from the DOM and the last column simply has no ' +
        'handle. The header also sorts, to show a click target and a drag ' +
        'target living in the same cell.',
    },
  },
};

export const TableControlledColumnWidths: StoryObj<typeof Table> = () => (
  <ControlledResizableTable />
);

TableControlledColumnWidths.storyName = 'Controlled column widths';
TableControlledColumnWidths.args = {};
TableControlledColumnWidths.parameters = {
  docs: {
    description: {
      story:
        'Widths held by the caller and echoed above the table — this is the ' +
        'shape persistence takes, since the kit stores nothing itself. The ' +
        'Actions column sets `resizable={false}`, so it has no handle.',
    },
  },
};
