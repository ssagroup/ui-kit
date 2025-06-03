import { ResponsiveTreeMap } from '@nivo/treemap';
import { useTheme } from '@emotion/react';

import { WithWidgetCard, WidgetCardProps } from '@components/WidgetCard';
import { WithFullscreenMode } from '@components/FullscreenModeContext';

import { TreeMapChartHeader } from './TreeMapChartHeader';
import { TreeMapChartTooltip } from './TreeMapChartTooltip';

export type TreeNode = {
  name: string;
  value?: number;
  color?: string;
  children?: TreeNode[];
};

export type TreeMapChartFeature = 'header' | 'fullscreenMode';

type NivoTreeMapChartProps = React.ComponentProps<
  typeof ResponsiveTreeMap<TreeNode>
>;
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

  const colors = [
    theme.colors.purple,
    theme.colors.blue,
    theme.colors.blueLight,
    theme.colors.turquoise,
    theme.colors.green,
    theme.colors.yellowLighter,
    theme.colors.yellow,
    theme.colors.pink,
    theme.colors.blueCool,
    theme.colors.cyanTeal,
  ] as string[];

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
          <ResponsiveTreeMap<TreeNode>
            borderWidth={0}
            colors={colors}
            data={data}
            identity="name"
            innerPadding={4}
            label={(node) => `${node.id} (${node.formattedValue})`}
            labelSkipSize={10}
            labelTextColor={theme.colors.white}
            parentLabelTextColor={theme.colors.white}
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

export const TreeMapChart = WithFullscreenMode(
  TreeMapChartComponent,
) as typeof TreeMapChartComponent;
