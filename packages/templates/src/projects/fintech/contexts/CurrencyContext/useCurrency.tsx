import { useContext } from 'react';

import { CurrencyContext } from './CurrencyContext';

export const useCurrency = () => useContext(CurrencyContext);
