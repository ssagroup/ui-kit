import { useContext } from 'react';

import { BotsContext } from './BotsContext';

export const useBots = () => useContext(BotsContext);
