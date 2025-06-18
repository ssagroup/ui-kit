import { PanelConfig } from './panel';

type AnyProps = Record<string, unknown> | undefined;

export class PanelRegistry {
  private panels: Map<string, PanelConfig<AnyProps>> = new Map();

  registerPanel(panelConfig: PanelConfig<AnyProps>) {
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

  findPanelConfigsByType(type: string): PanelConfig<AnyProps>[] {
    return Array.from(this.panels.values()).filter((panel) =>
      panel.supportedTypes.includes(type),
    );
  }
}
