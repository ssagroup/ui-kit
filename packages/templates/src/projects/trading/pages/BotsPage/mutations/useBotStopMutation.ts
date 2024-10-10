import { useEffect } from 'react';
import { useBotStatus, useBots } from '@trading/contexts';
import { showSimpleToast } from '@trading/utils';
import {
  BOT_STOPPED,
  BOT_STOPPING,
} from '@trading/contexts/BotStatus/constants';
import { useTranslation } from '@contexts';

export const useBotStopMutation = (id: number) => {
  const { t } = useTranslation();
  const { setMutationStatus, setId } = useBotStatus();
  const { setReloadReason } = useBots();

  useEffect(() => {
    setId(id);
  }, [id]);

  const mutate = () => {
    setMutationStatus(BOT_STOPPING);
    showSimpleToast(t('toasts.stopBot.progress'), { hideProgressBar: true });
    setTimeout(() => {
      setMutationStatus(BOT_STOPPED);
      setReloadReason('stopAllBotsMutation');
      showSimpleToast(t('toasts.stopBot.success'), { type: 'success' });
    }, 1000);
  };

  return {
    mutate,
  };
};
