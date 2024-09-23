import { useContext } from 'react';
import { GraphsContext } from './GraphsContext';

export const useGraphs = () => useContext(GraphsContext);
