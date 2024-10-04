import { useParams } from 'react-router-dom';
import { useTranslation } from '@contexts';
import { getDateTime } from '@trading/components/Rebalance/helpers';
import { KeeperRunsTooltipContentProps } from './types';

export const KeeperRunsTooltipContent = ({
  event,
  data,
}: KeeperRunsTooltipContentProps) => {
  const { t } = useTranslation();
  const { id: botId } = useParams();

  if (!event || !data) return null;

  const isMainDashboard = !botId;
  const date = `${event.points[0].x}`;
  const fullTimeDate = getDateTime(date).toFormat('HH:mm, dd MMM');

  return (
    <div>
      <div className="datetime">{fullTimeDate}</div>
      <div>
        <span>
          {t('keeperRuns.runs')}:&nbsp;<b>{data.totalRuns}</b>
        </span>
      </div>
      <div>
        <span>
          {t('keeperRuns.failures')}:&nbsp;<b>{data.failures}</b>
        </span>
      </div>
      <div>
        <span>
          {t('keeperRuns.serviceOperations')}:&nbsp;
          <b>{data.serviceOperations}</b>
        </span>
      </div>
      {isMainDashboard && data.botRuns.length && (
        <div className="list">
          <span>{t('keeperRuns.bots')}:</span>
          <br />
          <ul>
            {data.botRuns.map((botRun, index) => (
              <li key={index}>
                {botRun.botName}:&nbsp;
                <b>
                  {botRun.runs} ({botRun.failures}/{botRun.serviceOperations})
                </b>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
