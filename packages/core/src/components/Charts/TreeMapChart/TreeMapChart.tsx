import { ResponsiveTreeMap } from '@nivo/treemap';
import React from 'react';
import { useTheme } from '@emotion/react';

import { WithWidgetCard, WidgetCardProps } from '@components/WidgetCard';
import { WithFullscreenMode } from '@components/FullscreenModeContext';

import { TreeMapChartHeader } from './TreeMapChartHeader';
import { TreeMapChartTooltip } from './TreeMapChartTooltip';

export type TreeNode = {
  name: string;
  value?: number;
  children?: TreeNode[];
};

export type TreeMapChartFeature = 'header' | 'fullscreenMode';

type NivoTreeMapChartProps = React.ComponentProps<typeof ResponsiveTreeMap>;
export interface TreeMapChartProps extends Omit<NivoTreeMapChartProps, 'data'> {
  data: TreeNode;
  title?: string;
  fullScreen?: boolean;
  features?: TreeMapChartFeature[];
  widgetCardProps?: WidgetCardProps;
}

export const TreeMapChartComponent = ({
  data,
  title,
  widgetCardProps,
  features = [],
  ...treeMapProps
}: TreeMapChartProps) => {
  const theme = useTheme();
  const nodeToLabelColors = {
    [theme.colors.chartPink as string]: theme.colors.white,
    [theme.colors.chartViolet as string]: theme.colors.white,
    [theme.colors.chartPurple as string]: theme.colors.white,
    [theme.colors.chartDarkBlue as string]: theme.colors.white,
    [theme.colors.chartBlue as string]: theme.colors.white,
    [theme.colors.chartCyan as string]: theme.colors.white,
    [theme.colors.chartDarkGreen as string]: theme.colors.white,
    [theme.colors.chartMiddleGreen as string]: theme.colors.white,
    [theme.colors.chartLightGreen as string]: theme.colors.white,
    [theme.colors.chartLimeGreen as string]: theme.colors.white,
    [theme.colors.chartYellow as string]: theme.colors.white,
    [theme.colors.chartLightOrange as string]: theme.colors.white,
    [theme.colors.chartMiddleOrange as string]: theme.colors.white,
    [theme.colors.chartDarkOrange as string]: theme.colors.white,
    [theme.colors.chartRed as string]: theme.colors.white,
  };
  const colors = Object.keys(nodeToLabelColors);

  return (
    <WithWidgetCard
      features={features}
      cardProps={{
        title,
        headerContent: <TreeMapChartHeader features={features} />,
        ...widgetCardProps,
      }}>
      {/* Fixes https://github.com/plouc/nivo/issues/867 */}
      <div css={{ position: 'relative', height: '100%', width: '100%' }}>
        <div
          css={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}>
          <ResponsiveTreeMap
            borderWidth={0}
            colors={colors}
            data={data}
            identity="name"
            innerPadding={4}
            label={(node) => `${node.id} (${node.formattedValue})`}
            labelSkipSize={10}
            labelTextColor={({ color }) => nodeToLabelColors[color] as string}
            parentLabelTextColor={({ color }) =>
              nodeToLabelColors[color] as string
            }
            leavesOnly={true}
            nodeOpacity={1}
            theme={{
              labels: {
                text: {
                  fontSize: 14,
                  fontWeight: 600,
                },
              },
            }}
            tooltip={TreeMapChartTooltip}
            value="value"
            {...treeMapProps}
          />
        </div>
      </div>
    </WithWidgetCard>
  );
};

export const TreeMapChart = WithFullscreenMode(TreeMapChartComponent);
