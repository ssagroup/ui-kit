import { css } from '@emotion/css';
import { useTheme } from '@emotion/react';
import {
  Accordion,
  AccordionGroup,
  AccordionGroupContextProvider,
  Button,
  Icon,
  ProgressCircle,
  Theme,
  Wrapper,
} from '@ssa-ui-kit/core';

import { useGrafanaDashboards } from '@entities/grafana-dashboard';
import { useGrafanaPanels } from '@entities/grafana-panel';
import { ErrorIcon } from '@shared/icons';
import { GrafanaDashboard, GrafanaPanel } from '@shared/grafana';
import { useInfraDashContext } from '@shared/context';

type ExternalPanelListProps = {
  dashboard: GrafanaDashboard;
  onPanelClick?: (dashboard: GrafanaDashboard, panel: GrafanaPanel) => void;
};

const ExternalPanelList = ({
  dashboard,
  onPanelClick,
}: ExternalPanelListProps) => {
  const theme = useTheme() as Theme;
  const { panelRegistry } = useInfraDashContext();
  const externalPanels = useGrafanaPanels(dashboard.id);

  if (!externalPanels.isLoaded) {
    return (
      <Wrapper
        direction="column"
        css={{ justifyContent: 'center', height: '100%', padding: '8px' }}>
        <ProgressCircle
          classnames={{
            inner: css(`
            background: none !important;
          `),
            outer: css(`
            background: none !important;
            border: 12px solid ${theme.colors.greyLighter};
          `),
          }}
          currentValue={3}
          max={10}
          size={20}
          color="blue"
          mode="infinite"
        />
      </Wrapper>
    );
  }
  if (externalPanels.error) {
    return (
      <Wrapper
        direction="column"
        css={{ justifyContent: 'center', height: '100%' }}>
        <ErrorIcon />
        <p>Failed to load panels for {dashboard.title}</p>
      </Wrapper>
    );
  }
  if (!externalPanels.data.length) {
    return (
      <Wrapper
        direction="column"
        css={{ justifyContent: 'center', height: '100%' }}>
        <ErrorIcon />
        <p>No panels found for {dashboard.title}</p>
      </Wrapper>
    );
  }

  const availablePanels = externalPanels.data.filter((panel) => {
    if (!panel.panelSchema?.type) {
      return false;
    }
    const availableComponents = panelRegistry.findPanelConfigsByType(
      panel.panelSchema.type,
    );
    return availableComponents.length > 0;
  });

  return (
    <>
      {availablePanels.map((panel) => (
        <Button
          key={panel.id}
          variant="tertiary"
          className={css`
            width: 100%;
            min-height: 34px;
            gap: 8px;
            padding: 8px 14px 8px 34px !important;
            justify-content: space-between;
            text-align: left;
            & svg {
              & path {
                stroke: ${theme.colors.greyDarker};
                stroke-width: 1.4px;
              }
            }
          `}
          onClick={() => onPanelClick?.(dashboard, panel)}>
          {panel.title}
          <Icon name="plus" size={12} />
        </Button>
      ))}
    </>
  );
};

export type ExternalDashboardsListProps = {
  onPanelClick?: (dashboard: GrafanaDashboard, panel: GrafanaPanel) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const ExternalDashboardsList = ({
  onPanelClick,
  ...divProps
}: ExternalDashboardsListProps) => {
  const theme = useTheme() as Theme;
  const dashboardsQuery = useGrafanaDashboards();

  if (!dashboardsQuery.isLoaded) {
    return (
      <Wrapper
        direction="column"
        css={{ justifyContent: 'center', height: '100%' }}
        {...divProps}>
        <ProgressCircle
          classnames={{
            inner: css(`
            background: none !important;
          `),
            outer: css(`
            background: none !important;
            border: 12px solid ${theme.colors.greyLighter};
          `),
          }}
          currentValue={3}
          max={10}
          size={64}
          color="blue"
          mode="infinite"
        />
      </Wrapper>
    );
  }
  if (dashboardsQuery.error) {
    return (
      <Wrapper
        direction="column"
        css={{ justifyContent: 'center', height: '100%' }}
        {...divProps}>
        <ErrorIcon />
        <p>Failed to load external dashboards</p>
      </Wrapper>
    );
  }
  if (!dashboardsQuery.data.length) {
    return (
      <Wrapper
        direction="column"
        css={{ justifyContent: 'center', height: '100%' }}
        {...divProps}>
        <ErrorIcon />
        <p>No external dashboards found</p>
      </Wrapper>
    );
  }

  return (
    <AccordionGroupContextProvider>
      <AccordionGroup size="small" css={{ overflow: 'auto' }} {...divProps}>
        {dashboardsQuery.data.map((dashboard) => (
          <Accordion
            key={dashboard.id}
            id={dashboard.id}
            title={dashboard.title}
            className={css`
              padding: 0 !important;
              align-items: start !important;
            `}
            renderTitle={({ title, isOpened, onClick }) => (
              <Button
                onClick={onClick}
                variant="tertiary"
                className={css`
                  width: 100%;
                  min-height: 34px;
                  gap: 8px;
                  padding: 8px 14px !important;
                  text-align: left;
                  & svg {
                    & path {
                      stroke: ${theme.colors.greyDarker};
                      stroke-width: 1.4px;
                    }
                  }
                `}
                startIcon={
                  isOpened ? (
                    <Icon name="carrot-down" size={12} />
                  ) : (
                    <Icon name="carrot-right" size={12} />
                  )
                }>
                {title}
              </Button>
            )}
            renderContent={({ isOpened }) => (
              <div
                css={{
                  width: '100%',
                  display: isOpened ? 'block' : 'none',
                  fontWeight: 500,
                  fontSize: '14px',
                }}>
                <ExternalPanelList
                  dashboard={dashboard}
                  onPanelClick={onPanelClick}
                />
              </div>
            )}
          />
        ))}
      </AccordionGroup>
    </AccordionGroupContextProvider>
  );
};
