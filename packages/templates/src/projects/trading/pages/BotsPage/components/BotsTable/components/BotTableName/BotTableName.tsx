import { Platform } from '@trading/components';
import { SingleBot } from '@/trading/pages/BotsPage/__mock__/allBots';
import * as S from './styles';

export const BotTableName = ({ bot }: { bot: SingleBot }) => {
  return (
    <div css={S.BotName}>
      {bot.platform && (
        <Platform showTitle={false} exchangeType={bot.platform} />
      )}
      <span>{bot.name}</span>
    </div>
  );
};
