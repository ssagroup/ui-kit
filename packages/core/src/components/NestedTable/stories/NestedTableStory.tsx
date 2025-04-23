import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@components/Button';
import { ButtonProps } from '@components/Button/types';
import Icon from '@components/Icon';
import Table from '@components/Table';
import TableBody from '@components/TableBody';
import TableHead from '@components/TableHead';
import TableRow from '@components/TableRow';
import TableCell from '@components/TableCell';
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

const NestedTableRowStory = () => (
  <WithNestedTableRow>
    <NestedTableRow>
      <NestedTableCell>!1234567890</NestedTableCell>
      <NestedTableCell>!Estate</NestedTableCell>
      <NestedTableCell>!json</NestedTableCell>
      <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
        <TableCellActionButton />
      </NestedTableCell>
    </NestedTableRow>
    <NestedTableRow>
      <NestedTableCell>@1234567890</NestedTableCell>
      <NestedTableCell>@Estate</NestedTableCell>
      <NestedTableCell>@json</NestedTableCell>
      <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
        <TableCellActionButton />
      </NestedTableCell>
    </NestedTableRow>
  </WithNestedTableRow>
);

const StyledTableRow = styled(NestedTableRow)`
  background: #f2fcff;
`;

const OtherTableRow = ({ children, ...rest }: React.PropsWithChildren) => (
  <NestedTableRow css={{ background: '#e2ffe3' }} {...rest}>
    {children}
  </NestedTableRow>
);

const OtherTableRowStory = () => (
  <WithNestedTableRow>
    {[1, 2, 3].map((i) => (
      <OtherTableRow key={i}>
        <NestedTableCell>OtherTableRow</NestedTableCell>
        <NestedTableCell>Estate</NestedTableCell>
        <NestedTableCell>json</NestedTableCell>
        <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
          <TableCellActionButton />
        </NestedTableCell>
      </OtherTableRow>
    ))}
  </WithNestedTableRow>
);

const StyledTableRowStory = () => (
  <WithNestedTableRow>
    {[4, 5, 6].map((i) => (
      <StyledTableRow key={i}>
        <NestedTableCell>StyledTableRow</NestedTableCell>
        <NestedTableCell>Estate</NestedTableCell>
        <NestedTableCell>json</NestedTableCell>
        <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
          <TableCellActionButton />
        </NestedTableCell>
      </StyledTableRow>
    ))}
  </WithNestedTableRow>
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
        <TableRow>
          <TableCell css={{ border: 'none' }}></TableCell>
          <TableCell css={{ border: 'none' }}>Cell 1</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 2</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 3</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 4</TableCell>
        </TableRow>
        <NestedTableRowStory />
        <StyledTableRowStory />
        <OtherTableRowStory />
        <TableRow>
          <TableCell css={{ border: 'none' }}></TableCell>
          <TableCell css={{ border: 'none' }}>Cell 1</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 2</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 3</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 4</TableCell>
        </TableRow>
        <TableRow>
          <TableCell css={{ border: 'none' }}></TableCell>
          <TableCell css={{ border: 'none' }}>Cell 1</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 2</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 3</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 4</TableCell>
        </TableRow>
        <TableRow>
          <TableCell css={{ border: 'none' }}></TableCell>
          <TableCell css={{ border: 'none' }}>Cell 1</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 2</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 3</TableCell>
          <TableCell css={{ border: 'none' }}>Cell 4</TableCell>
        </TableRow>
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
