import { useEffect } from 'react';

import { useBots, useBotStatus } from '@fintech/contexts';
import {
  BOT_STOPPED,
  BOT_STOPPING,
} from '@fintech/contexts/BotStatus/constants';
import { showSimpleToast } from '@fintech/utils';

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
    showSimpleToast(t('toasts.stopService.progress'), {
      hideProgressBar: true,
    });
    setTimeout(() => {
      setMutationStatus(BOT_STOPPED);
      setReloadReason('stopAllBotsMutation');
      showSimpleToast(t('toasts.stopService.success'), { type: 'success' });
    }, 1000);
  };

  return {
    mutate,
  };
};
