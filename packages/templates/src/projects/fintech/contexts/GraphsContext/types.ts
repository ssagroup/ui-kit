import { RefObject } from 'react';
import { GraphsListItem } from '@fintech/types';

export interface GraphsContextValue {
  marginRight: number;
  marginLeft: number;
  tooltipRef: RefObject<HTMLDivElement | null>;
  calculateMargins: (data: GraphsListItem[]) => void;
  updateRightMargin: (newRightMargin: number) => void;
  updateLeftMargin: (newLeftMargin: number) => void;
}

export interface GraphsProviderProps {
  children: React.ReactNode;
}
