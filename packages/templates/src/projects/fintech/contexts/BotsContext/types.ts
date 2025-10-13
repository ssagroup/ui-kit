import { BOTS_RUNNING, BOTS_STOPPED, BOTS_STOPPING } from './constants';

export type BotsStatus =
  | typeof BOTS_RUNNING
  | typeof BOTS_STOPPING
  | typeof BOTS_STOPPED;

export type ReloadReason =
  | 'botStartMutation'
  | 'botStopMutation'
  | 'stopAllBotsMutation';

export interface BotsContextContent {
  status: BotsStatus;
  reloadReason: ReloadReason | null;
  setStatus: (status: BotsStatus) => void;
  resetReloadReason: () => void;
  setReloadReason: (reason: ReloadReason | null) => void;
}
