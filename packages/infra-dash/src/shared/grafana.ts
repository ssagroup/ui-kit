import type { Panel as PanelSchema } from '@grafana/schema';
import type { DataFrameJSON } from '@grafana/data';

/**
 * Represents a Grafana dashboard with its basic metadata.
 * Contains the essential information needed to identify and display a dashboard.
 */
export type GrafanaDashboard = {
  /** Unique string identifier for the dashboard */
  id: string;
  /** Display title of the dashboard */
  title: string;
};

/**
 * Represents a Grafana panel with its configuration and potential sub-panels.
 */
export type GrafanaPanel = {
  /** Unique numeric identifier for the panel */
  id: number;
  /** Display title of the panel */
  title: string;
  /** Grafana panel schema configuration, null if not available */
  panelSchema: PanelSchema | null;
  /** Array of nested panels, null if the panel has no sub-panels */
  subPanels: GrafanaPanel[] | null;
};

/**
 * Represents Grafana panel data with query results and metadata.
 * Contains the actual data returned from Grafana queries along with
 * information about the panel type and structure.
 */
export type GrafanaPanelData = {
  /** Type of chart/visualization for this panel */
  chartType: string;
  /** Unique numeric identifier for the panel */
  id: number;
  /** Display title of the panel */
  title: string;
  data: {
    /**
     * Query results indexed by query reference ID.
     * Each result contains status information and data frames.
     */
    results: Record<
      string,
      {
        status: number;
        /** Array of data frames containing the actual query results */
        frames: DataFrameJSON[];
      }
    >;
  };
};

/**
 * Type alias for Grafana panel schema.
 * Re-exports the Panel schema from @grafana/schema for convenience
 * and to maintain consistent naming conventions in the codebase.
 */
export type GrafanaPanelSchema = PanelSchema;
