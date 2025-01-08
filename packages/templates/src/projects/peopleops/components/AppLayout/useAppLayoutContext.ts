import { useContext } from 'react';
import { AppLayoutContext } from './context';

export const useAppLayout = () => useContext(AppLayoutContext);
