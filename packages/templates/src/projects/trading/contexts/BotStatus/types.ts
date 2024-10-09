import {
  BOT_ARCHIVING,
  BOT_STARTING,
  BOT_STOPPING,
  BOT_REBALANCING,
  BOT_STARTED,
  BOT_STOPPED,
  BOT_REBALANCED,
  BOT_ARCHIVED,
  BOT_VERSION_UPDATING,
  BOT_VERSION_UPDATED,
} from './constants';

export type BOT_STATUS =
  | typeof BOT_STARTING
  | typeof BOT_STARTED
  | typeof BOT_STOPPING
  | typeof BOT_STOPPED
  | typeof BOT_ARCHIVING
  | typeof BOT_ARCHIVED
  | typeof BOT_REBALANCING
  | typeof BOT_REBALANCED
  | typeof BOT_VERSION_UPDATING
  | typeof BOT_VERSION_UPDATED
  | null;

export interface BotStatusContextContent {
  id: number | null;
  mutationStatus: BOT_STATUS;
  setId: (id: number) => void;
  setMutationStatus: (status: BOT_STATUS) => void;
}
