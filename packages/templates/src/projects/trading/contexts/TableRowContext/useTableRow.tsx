import { useContext } from 'react';
import { TableRowContext } from './TableRowContext';

export const useTableRow = () => useContext(TableRowContext);
