import { useTheme } from '@emotion/react';
import Button from '@components/Button';
import { ButtonProps } from '@components/Button/types';
import Icon from '@components/Icon';
import Table from '@components/Table';
import TableBody from '@components/TableBody';
import TableHead from '@components/TableHead';
import { NestedTableRow, NestedTableCell } from '../components';
import { WithNestedTableRow } from '../WithNestedTableRow';

const TableCellActionButton = (props: ButtonProps) => (
  <Button
    variant={'tertiary'}
    endIcon={<Icon name="bin" size={24} tooltip="" />}
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
      console.log('Action button clicked');
    }}
    {...props}
  />
);

export const NestedTableStory = () => {
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
