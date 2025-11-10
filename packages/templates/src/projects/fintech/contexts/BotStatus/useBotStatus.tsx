import { useContext } from 'react';

import { BotStatusContext } from './BotStatusContext';

export const useBotStatus = () => useContext(BotStatusContext);
