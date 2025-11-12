import { ClassNames, useTheme } from '@emotion/react';
import { useTranslation } from '@contexts';
import { Button } from '@ssa-ui-kit/core';
import { WidgetCard, WithWidgetLoader } from '..';
import { MarginInfoProps } from './types';
import * as S from './styles';

export const MarginInfo = ({
  multiplier,
  stableCoin,
  cryptoCoin,
  stableCoinBorrowed,
  stableCoinInterestRate,
  stableCoinTotalInterest,
  cryptoCoinBorrowed,
  cryptoCoinInterestRate,
  cryptoCoinTotalInterest,
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
          <S.Table>
            <S.TableHeader>
              <S.HeaderRow>
                <S.HeaderLabel></S.HeaderLabel>
                <S.HeaderCell>{stableCoin}</S.HeaderCell>
                <S.HeaderCell>{cryptoCoin}</S.HeaderCell>
              </S.HeaderRow>
            </S.TableHeader>

            <S.TableBody>
              <S.TableRow>
                <S.RowLabel>Borrowed</S.RowLabel>
                <S.RowCells>
                  <S.Cell>{stableCoinBorrowed}</S.Cell>
                  <S.Cell>{cryptoCoinBorrowed}</S.Cell>
                </S.RowCells>
              </S.TableRow>

              {!hideInterestRate && (
                <S.TableRow>
                  <S.RowLabel>Interest Rate</S.RowLabel>
                  <S.RowCells>
                    <S.Cell>{stableCoinInterestRate}</S.Cell>
                    <S.Cell>{cryptoCoinInterestRate}</S.Cell>
                  </S.RowCells>
                </S.TableRow>
              )}

              <S.TableRow>
                <S.RowLabel>Total Interest</S.RowLabel>
                <S.RowCells>
                  <S.Cell>{stableCoinTotalInterest}</S.Cell>
                  <S.Cell>{cryptoCoinTotalInterest}</S.Cell>
                </S.RowCells>
              </S.TableRow>
            </S.TableBody>
          </S.Table>

          <S.ButtonsWrapper>
            <Button
              variant="custom"
              css={S.BorrowButton(theme)}
              onClick={onBorrow}
              isDisabled={disableBorrow || !onBorrow}
              text="Borrow"
            />
            <Button
              variant="custom"
              css={S.RepayButton(theme)}
              onClick={onRepay}
              isDisabled={disableRepay || !onRepay}
              text="Repay"
            />
          </S.ButtonsWrapper>
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
