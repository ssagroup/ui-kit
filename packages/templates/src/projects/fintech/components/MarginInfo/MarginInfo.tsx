import { ClassNames, useTheme } from '@emotion/react';
import { useTranslation } from '@contexts';
import { Button } from '@ssa-ui-kit/core';
import { WidgetCard, WithWidgetLoader } from '..';
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
  multiplier,
  base,
  quote,
  baseBorrowed,
  baseInterestRate,
  baseTotalInterest,
  quoteBorrowed,
  quoteInterestRate,
  quoteTotalInterest,
  hideInterestRate = false,
  disableBorrow = false,
  disableRepay = false,
  onBorrow,
  onRepay,
}: MarginInfoProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const title = multiplier
    ? `${t('marginInfo.title')} (x${multiplier})`
    : t('marginInfo.title');

  return (
    <ClassNames>
      {({ css }) => (
        <WidgetCard
          title={title}
          css={{
            gridArea: 'margin-info',
          }}
          wrapperClassName={css({
            gridArea: 'margin-info',
          })}
          headerClassName={css({
            marginBottom: 0,
            // it does work differently for 'balance' component and this one (h3), thus I override styles
            '& h3': {
              [theme.mediaQueries.md]: {
                fontSize: '20px',
              },
            },
          })}
          contentClassName={css({
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 'initial',
            height: '100%',
          })}>
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

              {!hideInterestRate && (
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
              css={BorrowButton(theme)}
              onClick={onBorrow}
              isDisabled={disableBorrow || !onBorrow}
              text="Borrow"
            />
            <Button
              variant="custom"
              css={RepayButton(theme)}
              onClick={onRepay}
              isDisabled={disableRepay || !onRepay}
              text="Repay"
            />
          </ButtonsWrapper>
        </WidgetCard>
      )}
    </ClassNames>
  );
};

export const MarginInfoWithLoader = ({
  isFetching,
  ...props
}: MarginInfoProps & { isFetching: boolean }) => (
  <WithWidgetLoader
    title={'marginInfo.title'}
    css={{ gridArea: 'margin-info' }}
    isFetching={isFetching}>
    <MarginInfo {...props} />
  </WithWidgetLoader>
);
