import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';
import {
  Button,
  JsonSchema,
  Typeahead,
  TypeaheadOption,
} from '@ssa-ui-kit/core';
import validator from '@rjsf/validator-ajv8';

import { useInfraDashContext } from '@shared/context';
import { Panel } from '@shared/panel';

export type PanelSettingsProps = {
  panel: Panel;
  onChange?: (panel: Panel) => void;
  onSave?: () => void;
};

export const PanelSettings = ({
  panel,
  onChange,
  onSave,
}: PanelSettingsProps) => {
  const { panelRegistry } = useInfraDashContext();
  const [originalPanel, setOriginalPanel] = useState<Panel>(panel);
  const savedRef = useRef(false);

  if (panel.id !== originalPanel.id) {
    setOriginalPanel(panel);
  }

  // cleanup function to reset the original panel when the component unmounts or panel changes
  useEffect(() => {
    return () => {
      if (savedRef.current) {
        savedRef.current = false;
        return;
      }
      onChange?.(originalPanel);
    };
  }, [originalPanel]);

  const panelComponent = panel.panelDefinition.component;

  const { propsSchema, uiSchema } = panelRegistry.getPanelConfig(
    panelComponent.id,
  );
  const availableComponents = panelRegistry.findPanelConfigsByType(
    panel.panelSchema.type,
  );

  const handleComponentChange = (componentId: string) => {
    const originalComponent = originalPanel.panelDefinition.component;
    const props =
      originalComponent.id === componentId ? originalComponent.props : {};

    const newPanel: Panel = {
      ...panel,
      panelDefinition: {
        ...panel.panelDefinition,
        component: { id: componentId, props },
      },
    };
    onChange?.(newPanel);
  };

  const handlePropsChange = (props: Record<string, unknown>) => {
    const newPanel: Panel = {
      ...panel,
      panelDefinition: {
        ...panel.panelDefinition,
        component: {
          ...panelComponent,
          props: props,
        },
      },
    };
    onChange?.(newPanel);
  };

  const handlePanelSave = () => {
    savedRef.current = true;
    setOriginalPanel(panel);
    onSave?.();
  };

  return (
    <>
      <Typeahead
        label="Panel Component"
        wrapperClassName={css`
          margin-top: 20px;
          width: 100% !important;
        `}
        filterOptions={false}
        selectedItems={[panelComponent.id]}
        onChange={(componentId) =>
          handleComponentChange(componentId as string)
        }>
        {availableComponents.map((component) => (
          <TypeaheadOption
            key={component.componentId}
            value={component.componentId}
            label={component.name}>
            {component.name}
          </TypeaheadOption>
        ))}
      </Typeahead>
      {propsSchema && (
        <JsonSchema.Form
          idPrefix="infra-dash-panel-settings"
          onChange={({ formData }) =>
            handlePropsChange(formData as Record<string, unknown>)
          }
          css={{ marginTop: '20px' }}
          formData={panelComponent.props}
          schema={propsSchema}
          uiSchema={{
            'ui:submitButtonOptions': { norender: true },
            ...uiSchema,
          }}
          validator={validator}
        />
      )}
      <Button
        css={{ marginTop: '20px' }}
        variant="info"
        onClick={handlePanelSave}>
        Save
      </Button>
    </>
  );
};
