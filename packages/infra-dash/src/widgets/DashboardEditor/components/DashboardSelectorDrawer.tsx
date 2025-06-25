import { useTheme } from '@emotion/react';
import { Button, Drawer, Theme, useDrawer, Wrapper } from '@ssa-ui-kit/core';

import { DashboardIcon } from '@shared/icons';

export type DashboardSelectorDrawerProps = {
  drawer: ReturnType<typeof useDrawer>;
  children?: React.ReactNode;
};

export const DashboardSelectorDrawer = ({
  drawer,
  children,
}: DashboardSelectorDrawerProps) => {
  const theme = useTheme() as Theme;
  return (
    <Drawer.Root store={drawer}>
      <Drawer.Content
        css={{ width: '400px', padding: '24px 32px', zIndex: 10 }}>
        <Wrapper direction="column" alignItems="start" css={{ height: '100%' }}>
          <Drawer.Header css={{ width: '100%' }}>
            <Drawer.Title>Dashboard Selector</Drawer.Title>
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
              <DashboardIcon fill={theme.colors.white} />
            </Button>
          </Drawer.Header>
          {children}
        </Wrapper>
      </Drawer.Content>
    </Drawer.Root>
  );
};
