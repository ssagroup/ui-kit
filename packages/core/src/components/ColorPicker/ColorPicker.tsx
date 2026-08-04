import { useTheme } from '@emotion/react';
import { Popover, PopoverContent } from '@components/Popover';
import TabBar, { TabBarContextProvider } from '@components/TabBar';
import Tab from '@components/Tab';
import { resolveDeprecatedProp } from '@utils/deprecation';
import { ColorPickerProps } from './types';
import { TabColorPalette, TabColorPicker, TabContent } from './components';
import { ColorPickerProvider } from './ColorPickerContext';
import { ColorPickerTrigger } from './components/ColorPickerTrigger';
import { COLORS_PALETTE } from './constants';
import '@rc-component/color-picker/assets/index.css';

export const ColorPicker = ({
  value,
  color,
  defaultValue,
  defaultColor,
  format: providedFormat,
  colorsPalette = COLORS_PALETTE,
  ...rest
}: ColorPickerProps) => {
  const theme = useTheme();
  const providedColor = resolveDeprecatedProp({
    component: 'ColorPicker',
    prop: 'value',
    value,
    deprecatedProp: 'color',
    deprecatedValue: color,
  });
  const resolvedDefaultColor = resolveDeprecatedProp({
    component: 'ColorPicker',
    prop: 'defaultValue',
    value: defaultValue,
    deprecatedProp: 'defaultColor',
    deprecatedValue: defaultColor,
  });
  const tabsConfig = {
    colorPalette: {
      tabId: 'color-palette',
      'aria-controls': 'color-palette-panel',
      text: 'General',
      renderContent: TabColorPalette,
    },
    colorPicker: {
      tabId: 'color-picker',
      'aria-controls': 'color-picker-panel',
      text: 'Custom',
      renderContent: TabColorPicker,
    },
  };

  return (
    <TabBarContextProvider
      initialTab={{
        tabId: tabsConfig.colorPalette.tabId,
        renderContent: tabsConfig.colorPalette.renderContent,
      }}>
      <ColorPickerProvider
        providedColor={providedColor}
        providedFormat={providedFormat}
        defaultColor={resolvedDefaultColor}
        colorsPalette={colorsPalette}
        {...rest}>
        <Popover interactionsEnabled={'click'} placement={'top-start'}>
          <ColorPickerTrigger />
          <PopoverContent
            css={{
              gap: 16,
              padding: 16,
              borderRadius: 8,
              backgroundColor: theme.colors.white,
              zIndex: 10,
              boxShadow:
                '0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)',
            }}
            className={rest.classnames?.content}>
            <TabBar css={{ alignSelf: 'flex-start' }}>
              <Tab {...tabsConfig.colorPalette} />
              <Tab {...tabsConfig.colorPicker} />
            </TabBar>
            <TabContent />
          </PopoverContent>
        </Popover>
      </ColorPickerProvider>
    </TabBarContextProvider>
  );
};
