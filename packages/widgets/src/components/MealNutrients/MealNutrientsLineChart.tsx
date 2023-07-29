import { useMemo } from 'react';
import { ResponsiveLine, LineSvgProps } from '@nivo/line';
import { useTheme } from '@emotion/react';

import { defaults } from './chartDefaultConfig';
import { MealNutrientsTooltip } from './MealNutrientsTooltip';

const colorPalette = ['pink', 'purple', 'turquoise', 'yellow', 'green', 'blue'];

export const MealNutrientsLineChart = ({ data, ...props }: LineSvgProps) => {
  const theme = useTheme();

  const defaultColorMapping = useMemo(
    () =>
      colorPalette.reduce((res, colorName) => {
        const colorValue = theme.colors[`${colorName}Lighter`];
        res[colorValue] = colorName;
        return res;
      }, {}),
    [theme.colors],
  );

  const defaultSettings = useMemo(
    () =>
      Object.assign(defaults, {
        colors: colorPalette.map((color) => theme.colors[`${color}Lighter`]),
        tooltip: ({ point }) => {
          const color = defaultColorMapping[point.color];
          return <MealNutrientsTooltip point={point} colorName={color} />;
        },
        theme: {
          fontFamily: "'Manrope', sans-serif",
          axis: {
            ticks: {
              text: {
                fontSize: '0.833rem',
                fontWeight: 500,
                fill: theme.colors.greyDarker,
              },
            },
          },
          grid: {
            line: {
              stroke: theme.colors.greyLighter,
              strokeWidth: 1,
              strokeDasharray: '8 8',
            },
          },
        },
      }),
    [theme.colors, defaultColorMapping],
  );

  return (
    <ResponsiveLine
      data={data}
      curve="catmullRom"
      axisTop={null}
      axisLeft={null}
      enableGridX={false}
      enableGridY={true}
      lineWidth={1}
      enablePoints={true}
      pointSize={8}
      pointBorderWidth={0}
      pointLabelYOffset={-12}
      enableArea={false}
      areaOpacity={0.1}
      enableCrosshair={false}
      useMesh={true}
      animate={false}
      {...defaultSettings}
      {...props}
    />
  );
};
