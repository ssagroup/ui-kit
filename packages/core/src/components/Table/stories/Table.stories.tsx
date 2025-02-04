import {
  Fragment,
  Children,
  isValidElement,
  cloneElement,
  ReactElement,
  useState,
} from 'react';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
} from '@storybook/addon-docs';

import Badge from '@components/Badge';
import Icon from '@components/Icon';
import Wrapper from '@components/Wrapper';
import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
import TableBody from '@components/TableBody';
import { SortableTable } from './SortableTable';
import { SortInfo } from './types';

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    controls: { disable: true },
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
          <TableCell>Col</TableCell>
          <TableCell>
            <Wrapper
              css={css`
                svg {
                  margin-right: 10px;
                }
              `}>
              <Icon name="calendar" size={16} />
              Col
            </Wrapper>
          </TableCell>
          <TableCell align="center">Col 3</TableCell>
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

const TableCellCollapsible = styled(TableCell)`
  border-right: none;
`;

const TableRowCollapsible = styled(TableRow)`
  &.first-row {
    background: rgba(238, 241, 247, 0.6);
  }
`;

/**
 * TODO:
 - Make an item collapsible/expandable.
 - Dynamically add the first column (including the first row in the header).
 - Create a component with an up/down arrow and specified logic.
 - Create another component for this logic
 */
const WithCollapsibleRow = ({ children }: React.PropsWithChildren) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const firstTableRow = Children.map(children, (child) => {
    return isValidElement(child) ? child : null;
  })
    ?.filter(Boolean)
    .at(0);
  console.log('>>>firstTableRow', firstTableRow);

  return Children.map(children, (child, index) => {
    console.log('>>>child', child);
    if (isValidElement(child)) {
      if (
        (child.type === TableRow || child.type === TableRowCollapsible) &&
        index === 0
      ) {
        return cloneElement(child as ReactElement, {
          className: `first-row${isCollapsed ? ' collapsed' : ''}`,
          onClick: () => {
            setIsCollapsed((currentState) => !currentState);
          },
        });
      }
      return cloneElement(child);
    }
  });
};

export const Collapsible: StoryObj<typeof Table> = () => {
  const theme = useTheme();
  return (
    <Table>
      <TableHead css={{ backgroundColor: theme.colors.white }}>
        <TableRowCollapsible>
          {/**  mode="header" */}
          <TableCellCollapsible></TableCellCollapsible>
          <TableCellCollapsible>Version</TableCellCollapsible>
          <TableCellCollapsible>Layer</TableCellCollapsible>
          <TableCellCollapsible>Type</TableCellCollapsible>
          <TableCellCollapsible>Action</TableCellCollapsible>
        </TableRowCollapsible>
      </TableHead>
      <TableBody>
        <WithCollapsibleRow>
          <TableRowCollapsible>
            <TableCellCollapsible></TableCellCollapsible>
            <TableCellCollapsible>1234567890</TableCellCollapsible>
            <TableCellCollapsible>Estate</TableCellCollapsible>
            <TableCellCollapsible>json</TableCellCollapsible>
            <TableCellCollapsible>
              <Icon name="bin" size={24} />
            </TableCellCollapsible>
          </TableRowCollapsible>
          <TableRowCollapsible>
            <TableCellCollapsible></TableCellCollapsible>
            <TableCellCollapsible>1234567890</TableCellCollapsible>
            <TableCellCollapsible>Estate</TableCellCollapsible>
            <TableCellCollapsible>json</TableCellCollapsible>
            <TableCellCollapsible>
              <Icon name="bin" size={24} />
            </TableCellCollapsible>
          </TableRowCollapsible>
        </WithCollapsibleRow>
        <WithCollapsibleRow>
          <TableRowCollapsible>
            <TableCellCollapsible></TableCellCollapsible>
            <TableCellCollapsible>1234567890</TableCellCollapsible>
            <TableCellCollapsible>Estate</TableCellCollapsible>
            <TableCellCollapsible>json</TableCellCollapsible>
            <TableCellCollapsible>
              <Icon name="bin" size={24} />
            </TableCellCollapsible>
          </TableRowCollapsible>
          <TableRowCollapsible>
            <TableCellCollapsible></TableCellCollapsible>
            <TableCellCollapsible>1234567890</TableCellCollapsible>
            <TableCellCollapsible>Estate</TableCellCollapsible>
            <TableCellCollapsible>json</TableCellCollapsible>
            <TableCellCollapsible>
              <Icon name="bin" size={24} />
            </TableCellCollapsible>
          </TableRowCollapsible>
          <TableRowCollapsible>
            <TableCellCollapsible></TableCellCollapsible>
            <TableCellCollapsible>1234567890</TableCellCollapsible>
            <TableCellCollapsible>Estate</TableCellCollapsible>
            <TableCellCollapsible>json</TableCellCollapsible>
            <TableCellCollapsible>
              <Icon name="bin" size={24} />
            </TableCellCollapsible>
          </TableRowCollapsible>
        </WithCollapsibleRow>

        <WithCollapsibleRow>
          <TableRowCollapsible>
            <TableCellCollapsible></TableCellCollapsible>
            <TableCellCollapsible>1234567890</TableCellCollapsible>
            <TableCellCollapsible>Estate</TableCellCollapsible>
            <TableCellCollapsible>json</TableCellCollapsible>
            <TableCellCollapsible>
              <Icon name="bin" size={24} />
            </TableCellCollapsible>
          </TableRowCollapsible>
        </WithCollapsibleRow>
      </TableBody>
    </Table>
  );
};

Collapsible.args = {};
