import { Panel, PanelData } from './panel';

/**
 * Configuration options for data adapters that transform panel data.
 * Data adapters are responsible for converting raw panel data into formats
 * suitable for specific visualization components.
 *
 * @template T - The type of panel data, constrained to extend PanelData['data']
 */
export type DataAdapterOptions<T extends PanelData['data']> = {
  /** The panel configuration and metadata */
  panel: Panel;
  /** The panel data to be adapted/transformed */
  data: T;
};
