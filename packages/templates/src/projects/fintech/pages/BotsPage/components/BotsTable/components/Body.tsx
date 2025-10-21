import {
  FundsInWorkCell,
  InformationLinkCell,
  PNLCell,
  ROICell,
  TradeCell,
} from '@fintech/components';
import { TableRowProvider, useCurrency } from '@fintech/contexts';
import {
  useBotsPageEnums,
  useBotStrategiesLocalizedName,
} from '@fintech/pages/BotsPage/hooks/useBotsPageEnums';
import { getColorsByStatus, getStatusInfo } from '@fintech/utils';

import { TableBody, TableRow } from '@ssa-ui-kit/core';

import { propOr } from '@ssa-ui-kit/utils';

import { useTranslation } from '@contexts';

import { BotsTableProps } from '../types';

import { Actions, BotTableName, BotTooltip } from '.';

export const Body = ({
  response,
  allRowsDisabled,
}: Pick<BotsTableProps, 'response' | 'allRowsDisabled'>) => {
  const enumsResponse = useBotsPageEnums();
  const { items, totalCount } = response;
  const { t } = useTranslation();
  const { currency } = useCurrency();

  if (!totalCount) {
    return (
      <TableBody>
        <TableRow>
          <InformationLinkCell
            includeLink={false}
            colSpan={7}
            css={{
              background: '#EEF1F7',
            }}>
            {t('pages.bots.table.noResults')}
          </InformationLinkCell>
        </TableRow>
      </TableBody>
    );
  }

  const colorsByStatus = getColorsByStatus(enumsResponse?.status);
  const strategyNameByKey = useBotStrategiesLocalizedName();

  return (
    <TableBody>
      {items.map((bot) => {
        const { tradeColors, localizedName } = getStatusInfo(
          bot.status,
          colorsByStatus,
        );

        return (
          <TableRowProvider key={`bots-table-row-${bot.id}-provider`} row={bot}>
            <TableRow
              key={`bots-table-row-${bot.id}`}
              isDisabled={allRowsDisabled}
              css={{
                height: 'auto',
                '&:hover': {
                  cursor: allRowsDisabled ? 'default' : 'pointer',
                },
              }}>
              <InformationLinkCell>
                <BotTableName bot={bot} />
              </InformationLinkCell>
              <InformationLinkCell>
                {propOr(bot.strategy, bot.strategy || '')(strategyNameByKey)}
              </InformationLinkCell>
              <InformationLinkCell>
                <FundsInWorkCell value={bot.currentlyInUsePercents} />
              </InformationLinkCell>
              <InformationLinkCell>
                {bot.status && (
                  <BotTooltip
                    trigger={
                      <TradeCell
                        localizedName={localizedName}
                        {...tradeColors}
                      />
                    }
                    timeStamp={bot.lastStatusUpdate}
                    text={t('pages.bots.table.lastStatusChange')}
                  />
                )}
              </InformationLinkCell>
              <InformationLinkCell>
                <PNLCell
                  amount={bot.statistics.pnl}
                  isIncreasing={bot.statistics.pnlUp}
                  currency={currency}
                />
              </InformationLinkCell>
              <InformationLinkCell>
                <ROICell amount={bot.statistics.roi} />
              </InformationLinkCell>
              <InformationLinkCell includeLink={false}>
                <Actions row={bot} />
              </InformationLinkCell>
            </TableRow>
          </TableRowProvider>
        );
      })}
    </TableBody>
  );
};
