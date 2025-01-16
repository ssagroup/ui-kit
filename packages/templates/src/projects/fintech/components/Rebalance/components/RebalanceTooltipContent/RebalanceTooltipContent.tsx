import { useParams } from 'react-router-dom';
import { propOr } from '@ssa-ui-kit/utils';
import { useTranslation } from '@contexts';
import { useCurrency } from '@fintech/contexts';
import { RebalanceTooltipContentProps } from './types';
import { getDateTime } from '../../helpers';

export const RebalanceTooltipContent = ({
  event,
  data,
}: RebalanceTooltipContentProps) => {
  const { currency } = useCurrency();
  const { t } = useTranslation();
  const { id: botId } = useParams();

  if (!event || !data) return null;

  const isMainDashboard = !botId;
  const value: Plotly.Datum = event.points[0].y;
  const rebalanceType = `${event.points[0].data.customdata[0]}`;
  const date = `${event.points[0].x}`;
  const ordersKey = rebalanceType === 'buy' ? 'buyOrders' : 'sellOrders';
  const botNames =
    (rebalanceType === 'buy' ? data.buyingBotNames : data.sellingBotNames) ||
    [];
  const ordersData = propOr('', ordersKey)(data);

  const fullTimeDate = getDateTime(date).toFormat('HH:mm, dd MMM');

  return (
    <div>
      <div className="datetime">{fullTimeDate}</div>
      <div>
        <b>
          {value?.toString()}&nbsp;
          {currency}
        </b>
      </div>
      <div>
        <span>
          {t('rebalance.orders')}:&nbsp;<b>{ordersData}</b>
        </span>
      </div>
      {isMainDashboard && (
        <div className="list">
          <span>{t('rebalance.bots')}:</span>
          <br />
          <ul>
            {botNames.map((botName, index) => (
              <li key={index}>{botName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
