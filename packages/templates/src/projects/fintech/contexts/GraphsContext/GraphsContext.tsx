import { createContext, useRef, useState } from 'react';

import { GraphsListItem } from '@fintech/types';

import { GraphsContextValue, GraphsProviderProps } from './types';
import { calculateRightLeftMargins } from './utils';

export const GraphsContext = createContext<GraphsContextValue>({
  marginRight: 0,
  marginLeft: 0,
  tooltipRef: { current: null },
  calculateMargins() {
    /* no-op */
  },
  updateRightMargin() {
    /* no-op */
  },
  updateLeftMargin() {
    /* no-op */
  },
});

// TODO: add updateMarginRight/Left and use for PriceVolatilityChart...
export const GraphsProvider = ({ children }: GraphsProviderProps) => {
  const [marginRight, setMarginRight] = useState<number>(0);
  const [marginLeft, setMarginLeft] = useState<number>(0);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const calculateMargins = (data: GraphsListItem[]) => {
    const { rightMargin, leftMargin } = calculateRightLeftMargins({
      font: '9px sans-serif',
      data,
      rightMarginPaths: [
        ['allOrders'],
        ['turnover'],
        ['pnl'],
        ['cumulativePNL'],
        ['rebalancing', 'bought'],
        ['balanceHistory', 'baseAssetPrice'],
        ['balanceHistory', 'botAccountBalance'],
      ],
      leftMarginPaths: [],
    });
    setMarginLeft(leftMargin);
    setMarginRight(rightMargin);
  };

  const updateRightMargin = (newRightMargin: number) => {
    setMarginRight(Math.max(marginRight, newRightMargin));
  };

  const updateLeftMargin = (newLeftMargin: number) => {
    setMarginLeft(Math.max(marginLeft, newLeftMargin));
  };

  return (
    <GraphsContext.Provider
      value={{
        marginLeft,
        marginRight,
        tooltipRef,
        calculateMargins,
        updateRightMargin,
        updateLeftMargin,
      }}>
      {children}
    </GraphsContext.Provider>
  );
};
