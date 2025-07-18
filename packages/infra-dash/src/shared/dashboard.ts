import { Panel } from './panel';

/**
 * Represents the configuration data for a dashboard.
 */
export type DashboardDefinition = {
  version: 1;
};

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
  /** Indicates if the dashboard is published and available to users */
  published: boolean;
  /** Dashboard-specific configuration and settings */
  dashboardDefinition: DashboardDefinition;
  /** Array of panels that belong to this dashboard */
  panels: Panel[];
};
