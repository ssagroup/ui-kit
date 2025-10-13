import { useTheme } from '@emotion/react';

import { normalizeToRange } from '../utils';

export interface GaugeChartTickersProps {
  pieSize: { width: number; height: number };
  pieOffset: { x: number; y: number };
  minValue: number;
  maxValue: number;
  ticks?: ({ value: number; label?: React.ReactNode } | number)[];
}

export const GaugeChartTickers = ({
  pieOffset,
  pieSize,
  minValue,
  maxValue,
  ticks = [],
}: GaugeChartTickersProps) => {
  const theme = useTheme();

  if (pieSize.height <= 0) {
    return;
  }

  const radius = pieSize.width / 2;
  const labelRadius = radius * 1.05;

  const pieBottomCenter = {
    x: pieOffset.x + pieSize.width / 2,
    y: pieOffset.y + pieSize.height,
  };

  const tickLabels = ticks.map((tick) => {
    const { value, label } =
      typeof tick === 'number' ? { value: tick, label: tick } : tick;

    const normalizedValue = normalizeToRange(value, minValue, maxValue, 0, 100);
    const angle = (-90 + (normalizedValue / 100) * 180) * (Math.PI / 180);
    const x = pieBottomCenter.x + labelRadius * Math.sin(angle);
    const y = pieBottomCenter.y - labelRadius * Math.cos(angle);
    const align = normalizedValue > 50 ? 'left' : 'right';
    return { x, y, normalizedValue, label: label ?? value, align };
  });

  return (
    <>
      {tickLabels.map(({ normalizedValue, label, align, x, y }, index) => {
        let translateX = '-50%'; // center
        if (align === 'right') {
          translateX = '-100%';
        }
        if (align === 'left') {
          translateX = '0%';
        }

        return (
          <div
            key={normalizedValue + index}
            // prevents class creation for each label
            style={{
              left: `${x}px`,
              top: `${y}px`,
              transform: `translate(${translateX}, -50%)`,
            }}
            css={{
              color: theme.colors.greyDarker60,
              position: 'absolute',
              fontSize: 12,
              fontWeight: 500,
            }}>
            {label}
          </div>
        );
      })}
    </>
  );
};
