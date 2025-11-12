import { ClassNames, css, useTheme } from '@emotion/react';
import { useTranslation } from '@contexts';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ssa-ui-kit/core';
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

interface CellWithTooltipProps {
  children: React.ReactNode;
}

const CellWithTooltip = ({ children }: CellWithTooltipProps) => {
  const theme = useTheme();

  return (
    <Tooltip
      enableClick={false}
      enableHover
      size="medium"
      offsetOptions={8}
      placement="top"
      hasArrow={false}>
      <TooltipTrigger>
        <Cell>{children}</Cell>
      </TooltipTrigger>
      <TooltipContent
        css={css`
          box-shadow: 0 10px 40px 0 ${theme.colors.black25};
        `}>
        {children}
      </TooltipContent>
    </Tooltip>
  );
};

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
                  <CellWithTooltip>{baseBorrowed}</CellWithTooltip>
                  <CellWithTooltip>{quoteBorrowed}</CellWithTooltip>
                </RowCells>
              </TableRow>

              {!hideInterestRate && (
                <TableRow>
                  <RowLabel>Interest Rate</RowLabel>
                  <RowCells>
                    <CellWithTooltip>{baseInterestRate}</CellWithTooltip>
                    <CellWithTooltip>{quoteInterestRate}</CellWithTooltip>
                  </RowCells>
                </TableRow>
              )}

              <TableRow>
                <RowLabel>Total Interest</RowLabel>
                <RowCells>
                  <CellWithTooltip>{baseTotalInterest}</CellWithTooltip>
                  <CellWithTooltip>{quoteTotalInterest}</CellWithTooltip>
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
