import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@components/Button';
import { ButtonProps } from '@components/Button/types';
import Icon from '@components/Icon';
import TableBody from '@components/TableBody';
import TableHead from '@components/TableHead';
import { NestedTableRow, NestedTableCell, NestedTable } from '../components';
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

export const NestedDefaultRow = () => (
  <NestedTableRow>
    <NestedTableCell>1234567890</NestedTableCell>
    <NestedTableCell>Estate</NestedTableCell>
    <NestedTableCell>json</NestedTableCell>
    <NestedTableCell css={{ '& div': { justifyContent: 'center' } }}>
      <TableCellActionButton />
    </NestedTableCell>
  </NestedTableRow>
);

const NestedTableRowStory = () => (
  <WithNestedTableRow>
    <NestedDefaultRow />
    <NestedDefaultRow />
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

export const NestedTableDefaultStory = () => (
  <NestedTable>
    <TableHead>
      <NestedTableRow isHeader>
        <NestedTableCell as="th">Version</NestedTableCell>
        <NestedTableCell as="th">Layer</NestedTableCell>
        <NestedTableCell as="th">Type</NestedTableCell>
        <NestedTableCell
          as="th"
          css={{ '& div': { justifyContent: 'center' } }}>
          Action
        </NestedTableCell>
      </NestedTableRow>
    </TableHead>
    <TableBody>
      <WithNestedTableRow>
        <NestedDefaultRow />
        <NestedDefaultRow />
        <NestedDefaultRow />
      </WithNestedTableRow>
      <WithNestedTableRow>
        <NestedDefaultRow />
        <NestedDefaultRow />
        <NestedDefaultRow />
        <NestedDefaultRow />
        <NestedDefaultRow />
      </WithNestedTableRow>
      <WithNestedTableRow>
        <NestedDefaultRow />
      </WithNestedTableRow>
    </TableBody>
  </NestedTable>
);

export const NestedTableStory = () => {
  const theme = useTheme();
  return (
    <NestedTable collapsedIconName="plus" expandedIconName="minus">
      <TableHead css={{ backgroundColor: theme.colors.white }}>
        <NestedTableRow isHeader>
          <NestedTableCell as="th">Version</NestedTableCell>
          <NestedTableCell as="th">Layer</NestedTableCell>
          <NestedTableCell as="th">Type</NestedTableCell>
          <NestedTableCell
            as="th"
            css={{ '& div': { justifyContent: 'center' } }}>
            Action
          </NestedTableCell>
        </NestedTableRow>
      </TableHead>
      <TableBody>
        <NestedTableRowStory />
        <StyledTableRowStory />
        <OtherTableRowStory />
        <WithNestedTableRow>
          <NestedDefaultRow />
          <NestedDefaultRow />
          <NestedDefaultRow />
        </WithNestedTableRow>
        <WithNestedTableRow>
          <NestedDefaultRow />
        </WithNestedTableRow>
      </TableBody>
    </NestedTable>
  );
};
