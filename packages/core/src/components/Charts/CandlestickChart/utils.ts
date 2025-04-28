import { PlotParams } from 'react-plotly.js';

export type CandlestickStyle = 'japanese' | 'hollow';

export type CandlestickChartData = {
  x: string[];
  close: number[];
  open: number[];
  high: number[];
  low: number[];
};

export const getCandlestickPlotData = (
  style: CandlestickStyle,
  data: CandlestickChartData,
  increasingColor: string,
  decreasingColor: string,
): PlotParams['data'] => {
  if (style === 'japanese') {
    return [
      {
        type: 'candlestick',
        x: data.x,
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close,
        increasing: {
          line: { color: increasingColor },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          fillcolor: increasingColor,
        },
        decreasing: {
          line: { color: decreasingColor },
          fillcolor: decreasingColor,
        },
      },
    ];
  }

  const makeEmpty = (): CandlestickChartData => ({
    x: [],
    open: [],
    close: [],
    high: [],
    low: [],
  });

  const greenHollow = makeEmpty();
  const greenSolid = makeEmpty();
  const redHollow = makeEmpty();
  const redSolid = makeEmpty();

  for (let i = 0; i < data.x.length; i++) {
    const open = data.open[i];
    const close = data.close[i];
    const prevClose = i > 0 ? data.close[i - 1] : open;

    const isUp = close > open;
    const isHollow = isUp;
    const isGreen = close > prevClose;

    const target =
      isGreen && isHollow
        ? greenHollow
        : isGreen && !isHollow
          ? greenSolid
          : !isGreen && isHollow
            ? redHollow
            : redSolid;

    target.x.push(data.x[i]);
    target.open.push(open);
    target.close.push(close);
    target.high.push(data.high[i]);
    target.low.push(data.low[i]);
  }

  return [
    {
      type: 'candlestick',
      name: '',
      ...greenHollow,
      increasing: {
        line: { color: increasingColor },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fillcolor: 'white',
      },
      decreasing: {
        line: { color: increasingColor },
        fillcolor: 'white',
      },
    },
    {
      type: 'candlestick',
      name: '',
      ...greenSolid,
      increasing: {
        line: { color: increasingColor },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fillcolor: increasingColor,
      },
      decreasing: {
        line: { color: increasingColor },
        fillcolor: increasingColor,
      },
    },
    {
      type: 'candlestick',
      name: '',
      ...redHollow,
      increasing: {
        line: { color: decreasingColor },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fillcolor: 'white',
      },
      decreasing: {
        line: { color: decreasingColor },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fillcolor: 'white',
      },
    },
    {
      type: 'candlestick',
      name: '',
      ...redSolid,
      increasing: {
        line: { color: decreasingColor },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fillcolor: decreasingColor,
      },
      decreasing: {
        line: { color: decreasingColor },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fillcolor: decreasingColor,
      },
    },
  ];
};
