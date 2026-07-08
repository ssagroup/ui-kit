'use client';

import { Switch, SwitchContextProvider } from '@ssa-ui-kit/core';
import { PreviewRoot } from '@/components/preview-root';

export default function SwitchDemo() {
  return (
    <PreviewRoot>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SwitchContextProvider initialState={false}>
          <Switch label="Enable notifications" />
        </SwitchContextProvider>
        <SwitchContextProvider initialState={true}>
          <Switch label="Success variant" color="success" />
        </SwitchContextProvider>
        <SwitchContextProvider initialState={true}>
          <Switch label="Disabled" isDisabled />
        </SwitchContextProvider>
      </div>
    </PreviewRoot>
  );
}
