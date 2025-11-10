import { useContext } from 'react';

import { PeriodContext } from './PeriodContext';

export const usePeriod = () => useContext(PeriodContext);
