import { Button, WidgetCard } from '@ssa-ui-kit/core';
import { MarginInfoProps } from './types';
import {
  Table,
  TableHeader,
  HeaderRow,
  HeaderLabel,
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
            <HeaderLabel></HeaderLabel>
            <HeaderCell>{base}</HeaderCell>
            <HeaderCell>{quote}</HeaderCell>
          </HeaderRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <RowLabel>Borrowed</RowLabel>
            <RowCells>
              <Cell>{baseBorrowed}</Cell>
              <Cell>{quoteBorrowed}</Cell>
            </RowCells>
          </TableRow>

          {showInterestRate && (
            <TableRow>
              <RowLabel>Interest Rate</RowLabel>
              <RowCells>
                <Cell>{baseInterestRate}</Cell>
                <Cell>{quoteInterestRate}</Cell>
              </RowCells>
            </TableRow>
          )}

          <TableRow>
            <RowLabel>Total Interest</RowLabel>
            <RowCells>
              <Cell>{baseTotalInterest}</Cell>
              <Cell>{quoteTotalInterest}</Cell>
            </RowCells>
          </TableRow>
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
