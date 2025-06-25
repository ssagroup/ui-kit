import { RJSFSchema, UiSchema } from '@rjsf/utils';
import { GrafanaPanelData, GrafanaPanelSchema } from './grafana';

/**
 * Defines the configuration and positioning information for a dashboard panel.
 * Contains both the component configuration and grid layout positioning.
 */
export type PanelDefinition = {
  component: {
    /** Unique identifier for the component type */
    id: string;
    /** Dynamic properties passed to the component instance */
    props: Record<string, unknown>;
  };
  /** Grid positioning and sizing information */
  gridPos: Record<'h' | 'w' | 'x' | 'y', number>;

  /** Version of the panel definition schema */
  version: 1;
};

/**
 * Represents a complete dashboard panel with its metadata, schema, and definition.
 * Combines panel identity, display information, data schema, and component configuration.
 */
export type Panel = {
  /** Unique numeric identifier for the panel */
  id: number;
  /** Display title shown in the panel header */
  title: string;
  /** Grafana-specific panel schema configuration */
  panelSchema: GrafanaPanelSchema;
  /** Component and layout definition for the panel */
  panelDefinition: PanelDefinition;
  source: {
    type: typeof PANEL_DATA_SOURCE.GRAFANA;
    dashboardUid: string;
    panelId: number;
  };
};

/**
 * Optional schema defining the structure of props this component expects.
 * Used for validation and form generation in configuration UIs.
 */
type PanelConfigProps<T> = object extends T
  ? { defaultProps?: T; propsSchema?: RJSFSchema } // all props are optional → defaultProps stays optional
  : { defaultProps: T; propsSchema: RJSFSchema };

/**
 * Configuration object for registering a panel component type.
 * Defines how a specific component should be rendered and what panel types it supports.
 */
export type PanelConfig<T extends Record<string, unknown> | undefined> = {
  /** Unique identifier for this component type */
  componentId: string;
  /** React component that will render the panel */
  Component: React.ComponentType<{ panel: Panel }>;
  /** Human-readable name for this panel type */
  name: string;
  /** Array of Grafana panel types this component can handle */
  supportedTypes: string[];
  uiSchema?: UiSchema;
} & PanelConfigProps<Omit<T, 'panel' | 'panelData'>>;

/**
 * Constant object defining available panel data sources.
 * Currently only supports Grafana as a data source.
 */
export const PANEL_DATA_SOURCE = {
  GRAFANA: 'grafana',
} as const;
export type PanelDataSource =
  (typeof PANEL_DATA_SOURCE)[keyof typeof PANEL_DATA_SOURCE];

/**
 * Pattern matching utility function for handling different panel data sources.
 * Provides type-safe way to handle operations based on the data source type.
 *
 * @param source - The panel data source to match against
 * @param handlers - Object containing handler functions for each data source type
 */
export const matchPanelDataSource = <Grafana>(
  source: PanelDataSource,
  handlers: {
    grafana: () => Grafana;
  },
): Grafana => {
  switch (source) {
    case PANEL_DATA_SOURCE.GRAFANA:
      return handlers.grafana();
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = source;
      throw new Error(`Unsupported panel data source: ${source}`);
    }
  }
};

/**
 * Represents panel data with its source and associated data.
 * Currently only supports Grafana as a data source.
 */
export type PanelData = {
  /** The data source type identifier */
  source: typeof PANEL_DATA_SOURCE.GRAFANA;
  /** The actual panel data from Grafana */
  data: GrafanaPanelData;
};

export const PANEL_DATA_PERIOD = {
  LAST_HOUR: 0,
  LAST_6_HOURS: 1,
  LAST_24_HOURS: 2,
  LAST_7_DAYS: 3,
  LAST_30_DAYS: 4,
} as const;
export type PanelDataPeriod =
  (typeof PANEL_DATA_PERIOD)[keyof typeof PANEL_DATA_PERIOD];
