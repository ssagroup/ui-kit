import { PanelRegistry } from '@shared/panelRegistry';

import { panelConfig as grafanaTimeseriesPanelConfig } from './TimeseriesPanel';
import { panelConfig as grafanaGaugePanelConfig } from './GaugePanel';
import { panelConfig as grafanaBarGaugePanelConfig } from './BarGaugePanel';

const panelRegistry = new PanelRegistry();
panelRegistry.registerPanel(grafanaTimeseriesPanelConfig);
panelRegistry.registerPanel(grafanaGaugePanelConfig);
panelRegistry.registerPanel(grafanaBarGaugePanelConfig);

export { panelRegistry };
