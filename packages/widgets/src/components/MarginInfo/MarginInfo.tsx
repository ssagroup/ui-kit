import { Button, WidgetCard } from '@ssa-ui-kit/core';
import { MarginInfoProps } from './types';
import { MarginInfoTableRow } from './MarginInfoTableRow';
import {
  Table,
  TableHeader,
  HeaderRow,
  HeaderCell,
  TableBody,
  RowLabel,
  RowCells,
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
            <RowLabel></RowLabel>
            <RowCells>
              <HeaderCell>{base}</HeaderCell>
              <HeaderCell>{quote}</HeaderCell>
            </RowCells>
          </HeaderRow>
        </TableHeader>

        <TableBody>
          <MarginInfoTableRow
            label="Borrowed"
            baseValue={baseBorrowed}
            quoteValue={quoteBorrowed}
          />

          {showInterestRate && (
            <MarginInfoTableRow
              label="Interest Rate"
              baseValue={baseInterestRate}
              quoteValue={quoteInterestRate}
            />
          )}
          <MarginInfoTableRow
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
