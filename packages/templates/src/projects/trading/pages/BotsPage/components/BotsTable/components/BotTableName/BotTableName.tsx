import { Platform } from '@trading/components';
import { Bot } from '@trading/types';
import * as S from './styles';

export const BotTableName = ({ bot }: { bot: Bot }) => {
  return (
    <div css={S.BotName}>
      {bot.platform && (
        <Platform showTitle={false} exchangeType={bot.platform} />
      )}
      <span>{bot.name}</span>
    </div>
  );
};
