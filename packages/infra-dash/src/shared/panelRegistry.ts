import { PanelConfig } from './panel';

export class PanelRegistry {
  private panels: Map<string, PanelConfig> = new Map();

  registerPanel(panelConfig: PanelConfig) {
    if (this.panels.has(panelConfig.componentId)) {
      throw new Error(
        `Panel with id ${panelConfig.componentId} is already registered.`,
      );
    }
    this.panels.set(panelConfig.componentId, panelConfig);
  }

  getPanelConfig(componentId: string) {
    const panel = this.panels.get(componentId);
    if (!panel) {
      throw new Error(`Panel with id ${componentId} is not registered.`);
    }
    return panel;
  }
}
