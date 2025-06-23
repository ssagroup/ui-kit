import { useEffect, useState } from 'react';

import ReactGridLayout from 'react-grid-layout';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Checkbox, Input, useDrawer, Wrapper } from '@ssa-ui-kit/core';
import { useUncontrolled } from '@ssa-ui-kit/hooks';

import {
  DashboardPanelGrid,
  DashboardPanelGridProps,
} from '@features/DashboardPanelGrid';
import {
  useCreateDashboard,
  useDashboard,
  useUpdateDashboard,
} from '@entities/dashboard';
import { DashboardError } from '@components/DashboardError';
import { LoadingDashboard } from '@components/LoadingDashboard';
import { GrafanaDashboard, GrafanaPanel } from '@shared/grafana';
import { Dashboard } from '@shared/dashboard';
import { DashboardIcon } from '@shared/icons';
import { Panel, PANEL_DATA_SOURCE } from '@shared/panel';
import { useInfraDashContext } from '@shared/context';

import { DashboardSelectorDrawer } from './components/DashboardSelectorDrawer';
import { PanelSettingsDrawer } from './components/PanelSettingsDrawer';
import { ExternalDashboardsList } from './components/ExternalDashboardsList';
import {
  appendPanel,
  applyNewLayout,
  removePanel,
  updatePanel,
} from './helpers';
import { PanelControl } from './components/PanelControl';
import { PanelSettings } from './components/PanelSettings';

export type DashboardEditorProps = {
  dashboard?: Dashboard;
  defaultDashboard?: Dashboard;
  gridProps?: DashboardPanelGridProps;
  onChange?: (dashboard: Dashboard) => void;
  onSaved?: (dashboard: Dashboard) => void;
  onCreate?: () => void;
  onError?: (error: Error) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onError'>;

export const DashboardEditorInternal = ({
  dashboard: controlledDashboard,
  defaultDashboard,
  gridProps,
  onChange,
  onSaved,
  onCreate,
  onError,
  ...divProps
}: DashboardEditorProps) => {
  const [selectedPanelId, setSelectedPanelId] = useState<number | null>(null);
  const { panelRegistry } = useInfraDashContext();
  const dashboardsSelectorDrawer = useDrawer({});
  const panelSettingsDrawer = useDrawer({
    position: 'right',
    onOpenChange: (open) => {
      if (!open && selectedPanelId !== null) {
        setSelectedPanelId(null);
      }
    },
  });
  const [dashboard, setDashboard] = useUncontrolled({
    value: controlledDashboard,
    defaultValue: defaultDashboard,
    finalValue: {
      dashboardDefinition: { version: 1 },
      id: -1,
      panels: [],
      published: false,
      title: 'New Dashboard',
    },
    onChange,
  });

  useEffect(() => {
    // if the default dashboard changes, update the current dashboard
    if (defaultDashboard && dashboard.id !== defaultDashboard.id) {
      setDashboard(defaultDashboard);
    }
  }, [dashboard.id, defaultDashboard?.id]);

  const { mutate: updateDashboard, isLoading: isUpdating } = useUpdateDashboard(
    dashboard.id,
  );
  const { mutate: createDashboard, isLoading: isCreating } =
    useCreateDashboard();

  const handleAddPanel = (
    grafanaDashboard: GrafanaDashboard,
    grafanaPanel: GrafanaPanel,
  ) => {
    const newDashboard = appendPanel({
      dashboard,
      panelRegistry,
      source: {
        type: PANEL_DATA_SOURCE.GRAFANA,
        grafanaDashboard,
        grafanaPanel,
      },
    });
    setDashboard(newDashboard);
  };

  const handleLayoutChange = (newLayout: ReactGridLayout.Layout[]) => {
    setDashboard(applyNewLayout({ dashboard, newLayout }));
  };

  const handlePanelEdit = (panel: Panel) => {
    setSelectedPanelId(panel.id);
    panelSettingsDrawer.toggle(true);
  };

  const handlePanelUpdate = (panel: Panel) => {
    setDashboard(updatePanel({ dashboard, panel }));
  };

  const handlePanelRemove = (panel: Panel) => {
    setDashboard(removePanel({ dashboard, panel }));
  };

  const handlePersistDashboard = () => {
    if (dashboard.id > 0) {
      updateDashboard(dashboard)
        .then(() => onSaved?.(dashboard))
        .catch((error) => onError?.(error));
    } else {
      createDashboard(dashboard)
        .then(() => onCreate?.())
        .catch((error) => onError?.(error));
    }
  };

  const selectedPanel =
    selectedPanelId !== null
      ? dashboard.panels.find((p) => p.id === selectedPanelId)
      : null;

  const cannotPersist = isCreating || isUpdating || !dashboard.panels.length;

  return (
    <Wrapper
      alignItems="start"
      css={{ height: '100%', position: 'relative' }}
      {...divProps}>
      <DashboardSelectorDrawer drawer={dashboardsSelectorDrawer}>
        <ExternalDashboardsList
          css={{ marginTop: '20px' }}
          onPanelClick={handleAddPanel}
        />
      </DashboardSelectorDrawer>
      <Wrapper
        direction="column"
        alignItems="start"
        css={{ flexGrow: 1, padding: '24px 32px', height: '100%' }}>
        <Wrapper css={{ gap: '24px' }}>
          {!dashboardsSelectorDrawer.opened &&
            !dashboardsSelectorDrawer.transition.isMounted && (
              <Button
                variant="secondary"
                css={{ width: '36px', height: '36px', padding: '8px' }}
                onClick={() => dashboardsSelectorDrawer.toggle(true)}>
                <DashboardIcon />
              </Button>
            )}
          <h2
            css={{
              flexShrink: 0,
              fontWeight: 600,
              fontSize: '20px',
              textAlign: 'center',
            }}>
            Dashboard Editor
          </h2>
          <Input
            name="dashboard-name"
            placeholder="Dashboard Name"
            inputProps={{
              value: dashboard.title,
              onChange: (e) =>
                setDashboard({ ...dashboard, title: e.target.value }),
            }}
            css={{ maxWidth: '250px' }}
          />
          <Checkbox
            text="Publish"
            initialState={dashboard.published}
            onChange={(published) => setDashboard({ ...dashboard, published })}
          />
          <Button
            variant="info"
            css={{ height: '46px' }}
            isDisabled={cannotPersist}
            onClick={handlePersistDashboard}>
            {dashboard.id > 0 ? 'Save' : 'Create'}
          </Button>
        </Wrapper>
        <DashboardPanelGrid
          resizable
          draggable
          dashboard={dashboard}
          css={{ marginTop: '20px', overflow: 'auto', height: '100%' }}
          onLayoutChange={handleLayoutChange}
          onDragStart={() => panelSettingsDrawer.toggle(false)}
          onResizeStart={() => panelSettingsDrawer.toggle(false)}
          renderPanelControl={(panel) => (
            <PanelControl
              panel={panel}
              onEdit={() => handlePanelEdit(panel)}
              onRemove={() => handlePanelRemove(panel)}
            />
          )}
          {...gridProps}
        />
      </Wrapper>
      <PanelSettingsDrawer drawer={panelSettingsDrawer}>
        {selectedPanel && (
          <PanelSettings
            panel={selectedPanel}
            onChange={handlePanelUpdate}
            onSave={() => panelSettingsDrawer.toggle(false)}
          />
        )}
      </PanelSettingsDrawer>
    </Wrapper>
  );
};

export const DashboardEditor = ({
  dashboardId,
  ...props
}: DashboardEditorProps & { dashboardId?: number }) => {
  const { dashboard, defaultDashboard } = props;

  const dashboardById = useDashboard(dashboardId ?? -1, {
    enabled: !!dashboardId && !dashboard && !defaultDashboard,
  });
  if (!dashboardId) {
    return (
      <ErrorBoundary
        fallback={<DashboardError>Something went wrong</DashboardError>}>
        <DashboardEditorInternal {...props} />
      </ErrorBoundary>
    );
  }
  if (!dashboardById.isLoaded) {
    return <LoadingDashboard />;
  }
  if (dashboardById.error) {
    return <DashboardError />;
  }
  return (
    <ErrorBoundary
      fallback={<DashboardError>Something went wrong</DashboardError>}>
      <DashboardEditorInternal
        {...props}
        defaultDashboard={dashboardById.data}
      />
    </ErrorBoundary>
  );
};
