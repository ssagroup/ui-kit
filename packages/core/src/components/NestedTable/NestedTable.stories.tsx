import { Fragment } from 'react';
import { useTheme } from '@emotion/react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Stories,
} from '@storybook/addon-docs';
import Table from '@components/Table';
import TableHead from '@components/TableHead';
import TableBody from '@components/TableBody';
import { ButtonProps } from '@components/Button/types';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { NestedTableCell, NestedTableRow } from './components';
import { WithNestedTableRow } from './WithNestedTableRow';

export default {
  title: 'Components/NestedTable',
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

const TableCellActionButton = (props: ButtonProps) => (
  <Button
    variant={'tertiary'}
    endIcon={<Icon name="bin" size={24} />}
    css={{
      padding: 0,
      ':focus': {
        '&::before': {
          display: 'none',
        },
      },
    }}
    onClick={(event) => {
      event.stopPropagation();
      console.log('+++');
    }}
    {...props}
  />
);

export const Default: StoryObj<typeof Table> = () => {
  const theme = useTheme();
  return (
    <Table>
      <TableHead css={{ backgroundColor: theme.colors.white }}>
        <NestedTableRow isHeader>
          <NestedTableCell>Version</NestedTableCell>
          <NestedTableCell>Layer</NestedTableCell>
          <NestedTableCell>Type</NestedTableCell>
          <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
            Action
          </NestedTableCell>
        </NestedTableRow>
      </TableHead>
      <TableBody>
        <WithNestedTableRow>
          <NestedTableRow>
            <NestedTableCell>1234567890</NestedTableCell>
            <NestedTableCell>Estate</NestedTableCell>
            <NestedTableCell>json</NestedTableCell>
            <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
              <TableCellActionButton />
            </NestedTableCell>
          </NestedTableRow>
          <NestedTableRow>
            <NestedTableCell>1234567890</NestedTableCell>
            <NestedTableCell>Estate</NestedTableCell>
            <NestedTableCell>json</NestedTableCell>
            <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
              <TableCellActionButton />
            </NestedTableCell>
          </NestedTableRow>
        </WithNestedTableRow>
        <WithNestedTableRow>
          <NestedTableRow>
            <NestedTableCell>1234567890</NestedTableCell>
            <NestedTableCell>Estate</NestedTableCell>
            <NestedTableCell>json</NestedTableCell>
            <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
              <TableCellActionButton />
            </NestedTableCell>
          </NestedTableRow>
          <NestedTableRow>
            <NestedTableCell>1234567890</NestedTableCell>
            <NestedTableCell>Estate</NestedTableCell>
            <NestedTableCell>json</NestedTableCell>
            <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
              <TableCellActionButton />
            </NestedTableCell>
          </NestedTableRow>
          <NestedTableRow>
            <NestedTableCell>1234567890</NestedTableCell>
            <NestedTableCell>Estate</NestedTableCell>
            <NestedTableCell>json</NestedTableCell>
            <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
              <TableCellActionButton />
            </NestedTableCell>
          </NestedTableRow>
        </WithNestedTableRow>

        <WithNestedTableRow>
          <NestedTableRow>
            <NestedTableCell>1234567890</NestedTableCell>
            <NestedTableCell>Estate</NestedTableCell>
            <NestedTableCell>json</NestedTableCell>
            <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
              <TableCellActionButton />
            </NestedTableCell>
          </NestedTableRow>
        </WithNestedTableRow>
      </TableBody>
    </Table>
  );
};

Default.args = {};
