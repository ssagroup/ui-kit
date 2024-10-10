import { useEffect } from 'react';
import {
  BOT_STARTED,
  BOT_STARTING,
} from '@trading/contexts/BotStatus/constants';
import { useBotStatus, useBots } from '@trading/contexts';
import { showSimpleToast } from '@trading/utils';
import { useTranslation } from '@contexts';

export const useBotStartMutation = (id: number) => {
  const { t } = useTranslation();
  const { setMutationStatus, setId } = useBotStatus();
  const { setReloadReason } = useBots();

  useEffect(() => {
    setId(id);
  }, [id]);

  const mutate = () => {
    setMutationStatus(BOT_STARTING);
    showSimpleToast(t('toasts.startBot.progress'), { hideProgressBar: true });
    setTimeout(() => {
      setMutationStatus(BOT_STARTED);
      setReloadReason('botStartMutation');
      showSimpleToast(t('toasts.startBot.success'), { type: 'success' });
    }, 1000);
  };

  return {
    mutate,
  };
};
