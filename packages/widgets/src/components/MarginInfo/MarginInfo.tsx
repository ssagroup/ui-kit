import { ReactNode } from 'react';
import { Button, WidgetCard } from '@ssa-ui-kit/core';
import { MarginInfoProps } from './types';
import {
  Table,
  TableHeader,
  HeaderRow,
  HeaderCell,
  TableBody,
  TableRow,
  RowLabel,
  RowCells,
  Cell,
  ButtonsWrapper,
  BorrowButton,
  RepayButton,
} from './styles';

interface TableDataRowProps {
  label: string;
  baseValue: ReactNode;
  quoteValue: ReactNode;
}

const TableDataRow = ({ label, baseValue, quoteValue }: TableDataRowProps) => (
  <TableRow>
    <RowLabel>{label}</RowLabel>
    <RowCells>
      <Cell>{baseValue}</Cell>
      <Cell>{quoteValue}</Cell>
    </RowCells>
  </TableRow>
);

export const MarginInfo = ({
  title = 'Margin Info',
  base,
  quote,
  baseBorrowed,
  baseInterestRate,
  baseTotalInterest,
  quoteBorrowed,
  quoteInterestRate,
  quoteTotalInterest,
  showInterestRate = true,
  disableBorrow = false,
  disableRepay = false,
  onBorrow,
  onRepay,
  className,
  wrapperClassName,
  headerClassName,
  contentClassName,
}: MarginInfoProps) => {
  return (
    <WidgetCard
      title={title}
      className={className}
      wrapperClassName={wrapperClassName}
      headerClassName={headerClassName}
      contentClassName={contentClassName}>
      <Table>
        <TableHeader>
          <HeaderRow>
            <RowLabel></RowLabel>
            <RowCells>
              <HeaderCell>{base}</HeaderCell>
              <HeaderCell>{quote}</HeaderCell>
            </RowCells>
          </HeaderRow>
        </TableHeader>

        <TableBody>
          <TableDataRow
            label="Borrowed"
            baseValue={baseBorrowed}
            quoteValue={quoteBorrowed}
          />

          {showInterestRate && (
            <TableDataRow
              label="Interest Rate"
              baseValue={baseInterestRate}
              quoteValue={quoteInterestRate}
            />
          )}
          <TableDataRow
            label="Total Interest"
            baseValue={baseTotalInterest}
            quoteValue={quoteTotalInterest}
          />
        </TableBody>
      </Table>

      <ButtonsWrapper>
        <Button
          variant="custom"
          css={BorrowButton}
          onClick={onBorrow}
          isDisabled={disableBorrow || !onBorrow}
          text="Borrow"
        />
        <Button
          variant="custom"
          css={RepayButton}
          onClick={onRepay}
          isDisabled={disableRepay || !onRepay}
          text="Repay"
        />
      </ButtonsWrapper>
    </WidgetCard>
  );
};
