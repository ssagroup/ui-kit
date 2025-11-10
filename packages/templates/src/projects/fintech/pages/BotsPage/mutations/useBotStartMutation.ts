import { useEffect } from 'react';

import { useBots, useBotStatus } from '@fintech/contexts';
import {
  BOT_STARTED,
  BOT_STARTING,
} from '@fintech/contexts/BotStatus/constants';
import { showSimpleToast } from '@fintech/utils';

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
    showSimpleToast(t('toasts.startService.progress'), {
      hideProgressBar: true,
    });
    setTimeout(() => {
      setMutationStatus(BOT_STARTED);
      setReloadReason('botStartMutation');
      showSimpleToast(t('toasts.startService.success'), { type: 'success' });
    }, 1000);
  };

  return {
    mutate,
  };
};
