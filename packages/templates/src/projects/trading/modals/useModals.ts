import { useContext } from 'react';
import { ModalsContext } from './ModalsContext';

export const useModals = () => useContext(ModalsContext);
