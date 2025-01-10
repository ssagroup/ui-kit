import { useContext } from 'react';
import { HeaderContext } from './HeaderContext';

export const useHeader = () => useContext(HeaderContext);
