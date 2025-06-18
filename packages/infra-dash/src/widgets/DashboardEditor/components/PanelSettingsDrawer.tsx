import { useTheme } from '@emotion/react';
import { Button, Drawer, Theme, useDrawer } from '@ssa-ui-kit/core';

import { SidebarIcon } from '@shared/icons';

export type PanelSettingsDrawerProps = {
  drawer: ReturnType<typeof useDrawer>;
  children?: React.ReactNode;
};

export const PanelSettingsDrawer = ({
  drawer,
  children,
}: PanelSettingsDrawerProps) => {
  const theme = useTheme() as Theme;
  return (
    <Drawer.Root store={drawer}>
      <Drawer.Overlay>
        <Drawer.Content css={{ maxWidth: '400px', padding: '24px 32px' }}>
          <Drawer.Header css={{ width: '100%' }}>
            <Drawer.Title>Panel Settings</Drawer.Title>
            <Button
              variant="secondary"
              css={{
                ':hover': {
                  background: theme.colors.greyDropdownFocused,
                },
                width: '36px',
                height: '36px',
                padding: '8px',
                background: theme.colors.greyDropdownFocused,
              }}
              onClick={() => drawer.toggle(false)}>
              <SidebarIcon fill={theme.colors.white} />
            </Button>
          </Drawer.Header>
          {children}
        </Drawer.Content>
      </Drawer.Overlay>
    </Drawer.Root>
  );
};
