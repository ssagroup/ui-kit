import { useTranslation } from '@contexts';
import { BotOrderSizeProps } from './types';
import * as S from './styles';
import { BotTooltip } from '../BotTooltip';

export const BotOrderSize = ({
  timestamp,
  orders,
  colors,
}: BotOrderSizeProps) => {
  const { t } = useTranslation();

  return (
    <div css={S.BotOrderSize}>
      <BotTooltip
        trigger={
          <div
            css={[
              S.OrderIcon,
              { background: `linear-gradient(${colors});` },
            ]}></div>
        }
        timeStamp={timestamp}
        text={t('pages.bots.table.lastOrderTime')}
      />
      {orders || '0'}
    </div>
  );
};
