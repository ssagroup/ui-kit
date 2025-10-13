import { useContext } from 'react';

import { TableContext } from './TableContext';

export const useTable = () => useContext(TableContext);
