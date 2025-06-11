import { forwardRef } from 'react';
import { css } from '@emotion/react';
import { useElementSize, useMinMDMediaQuery } from '@ssa-ui-kit/hooks';
import GridLayout from 'react-grid-layout';
import { ErrorBoundary } from 'react-error-boundary';

import { BasePanel } from '@components/BasePanel';
import { ErrorPanel } from '@components/ErrorPanel';
import { Dashboard } from '@shared/dashboard';
import { Panel } from '@shared/panel';
import { useInfraDashContext } from '@shared/context';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export type DashboardViewBaseProps = {
  dashboard: Dashboard;
  cols?: number;
  rowHeight?: number;
  draggable?: boolean;
  resizable?: boolean;
  onLayoutChange?: (layout: GridLayout.Layout[]) => void;
};

export const DashboardViewBase = ({
  dashboard,
  cols = 24,
  rowHeight = 30,
  draggable = false,
  resizable = false,
  onLayoutChange,
}: DashboardViewBaseProps) => {
  const { ref, width } = useElementSize<HTMLDivElement>();
  const isMinMD = useMinMDMediaQuery();
  const { panelRegistry } = useInfraDashContext();

  // sort panels by their grid position
  // for mobile view it will ensure they are stacked vertically in the right order
  const sortedPanels = [...dashboard.panels].sort((a, b) => {
    const aPos = a.panelDefinition.gridPos;
    const bPos = b.panelDefinition.gridPos;
    if (aPos.y !== bPos.y) {
      return aPos.y - bPos.y; // top to bottom
    }
    return aPos.x - bPos.x; // left to right within the same row
  });

  const layout = sortedPanels.map(
    ({ id, panelDefinition: { gridPos } }, index) => {
      if (!isMinMD) {
        // single column layout for mobile
        return {
          i: id.toString(),
          x: 0,
          y: index * gridPos.h,
          w: cols,
          h: gridPos.h,
        };
      }
      return {
        i: id.toString(),
        ...gridPos,
      };
    },
  );

  const renderPanel = (panel: Panel) => {
    const panelConfig = panelRegistry.getPanelConfig(
      panel.panelDefinition.component.id,
    );
    if (panelConfig) {
      return (
        <ErrorBoundary fallback={<ErrorPanel />}>
          <BasePanel>
            <panelConfig.Component panel={panel} />
          </BasePanel>
        </ErrorBoundary>
      );
    }
    return (
      <BasePanel>Unsupported panel type: {panel.panelSchema.type}</BasePanel>
    );
  };

  return (
    <div
      ref={ref}
      css={css`
        width: 100%;
        /* stylelint-disable-next-line selector-class-pattern */
        .react-grid-item.cssTransforms {
          transition-property: none;
        }
        .react-grid-layout {
          transition: none;
        }
      `}>
      <GridLayout
        autoSize
        layout={layout}
        cols={cols}
        rowHeight={rowHeight}
        containerPadding={[0, 0]}
        margin={[8, 8]}
        width={width}
        // disable interaction for mobile view
        isDraggable={isMinMD && draggable}
        isResizable={isMinMD && resizable}
        onLayoutChange={isMinMD ? onLayoutChange : undefined}>
        {dashboard.panels.map((panel) => (
          <GridItem key={panel.id.toString()}>{renderPanel(panel)}</GridItem>
        ))}
      </GridLayout>
    </div>
  );
};

interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GridItem = forwardRef<HTMLDivElement, GridItemProps>(function GridItem(
  { children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      css={css`
        .react-resizable-handle-se {
          z-index: 1;
        }
      `}
      {...props}>
      {children}
    </div>
  );
});
