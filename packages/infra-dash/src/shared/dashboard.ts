import { Panel } from './panel';

/**
 * Represents the configuration data for a dashboard.
 */
export type DashboardDefinition = Record<string, unknown>;

/**
 * Represents a complete dashboard with its metadata and associated panels.
 * Combines dashboard identity, display information, configuration, and
 * the collection of panels that make up the dashboard content.
 */
export type Dashboard = {
  /** Unique numeric identifier for the dashboard */
  id: number;
  /** Display title of the dashboard shown in the UI */
  title: string;
  /** Dashboard-specific configuration and settings */
  dashboardDefinition: DashboardDefinition;
  /** Array of panels that belong to this dashboard */
  panels: Panel[];
};
