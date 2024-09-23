import { MutableRefObject } from 'react';
import { GraphsListItem } from '@trading/types';

export interface GraphsContextValue {
  marginRight: number;
  marginLeft: number;
  tooltipRef: MutableRefObject<HTMLDivElement | null>;
  calculateMargins: (data: GraphsListItem[]) => void;
  updateRightMargin: (newRightMargin: number) => void;
  updateLeftMargin: (newLeftMargin: number) => void;
}

export interface GraphsProviderProps {
  children: React.ReactNode;
}
