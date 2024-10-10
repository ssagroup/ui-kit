import { TableBody } from '@ssa-ui-kit/core';
import { BotsTableRow } from '@ssa-ui-kit/widgets';
import { useTranslation } from '@contexts';
import {
  ROICell,
  TradeCell,
  PNLCell,
  InformationLinkCell,
} from '@trading/components';
import { TableRowProvider, useCurrency } from '@trading/contexts';
import { getColorsByStatus, getStatusInfo } from '@trading/utils';
import { useBotsPageEnums } from '@trading/pages/BotsPage/hooks/useBotsPageEnums';
import { Actions, BotTableName, BotTooltip } from '.';
import { BotsTableProps } from '../types';

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
        <BotsTableRow>
          <InformationLinkCell
            includeLink={false}
            colSpan={7}
            css={{
              background: '#EEF1F7',
            }}>
            {t('pages.bots.table.noResults')}
          </InformationLinkCell>
        </BotsTableRow>
      </TableBody>
    );
  }

  const colorsByStatus = getColorsByStatus(enumsResponse?.status);

  return (
    <TableBody>
      {items.map((bot) => {
        const { tradeColors, localizedName } = getStatusInfo(
          bot.status,
          colorsByStatus,
        );

        return (
          <TableRowProvider key={`bots-table-row-${bot.id}-provider`} row={bot}>
            <BotsTableRow
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
              <InformationLinkCell>{bot.strategy}</InformationLinkCell>
              <InformationLinkCell>
                {bot.currentlyInUsePercents}%
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
            </BotsTableRow>
          </TableRowProvider>
        );
      })}
    </TableBody>
  );
};
