import { PanelRegistry } from '@shared/panelRegistry';

import { panelConfig as grafanaBarGaugePanelConfig } from './BarGaugePanel';
import { panelConfig as grafanaGaugePanelConfig } from './GaugePanel';
import { panelConfig as grafanaTimeseriesPanelConfig } from './TimeseriesPanel';

const panelRegistry = new PanelRegistry();
panelRegistry.registerPanel(grafanaTimeseriesPanelConfig);
panelRegistry.registerPanel(grafanaGaugePanelConfig);
panelRegistry.registerPanel(grafanaBarGaugePanelConfig);

export { panelRegistry };
