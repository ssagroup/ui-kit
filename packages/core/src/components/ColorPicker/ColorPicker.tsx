import { Popover, PopoverContent } from '@components/Popover';
import TabBar, { TabBarContextProvider } from '@components/TabBar';
import Tab from '@components/Tab';
import { ColorPickerProps } from './types';
import { TabColorPalette, TabColorPicker, TabContent } from './components';
import { ColorPickerProvider } from './ColorPickerContext';
import { ColorPickerTrigger } from './components/ColorPickerTrigger';
import '@rc-component/color-picker/assets/index.css';

export const ColorPicker = ({
  color: providedColor,
  format: providedFormat,
  ...rest
}: ColorPickerProps) => {
  const tabsConfig = {
    colorPalette: {
      tabId: 'color-palette',
      ariaControls: 'color-palette-panel',
      text: 'General',
      renderContent: TabColorPalette,
    },
    colorPicker: {
      tabId: 'color-picker',
      ariaControls: 'color-picker-panel',
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
        {...rest}>
        <Popover interactionsEnabled={'click'} placement={'top-start'}>
          <ColorPickerTrigger />
          <PopoverContent
            css={{
              gap: 16,
              padding: 16,
              borderRadius: 8,
              boxShadow:
                '0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)',
            }}
            className={rest.classnames?.content}>
            <TabBar css={{ alignItems: 'flex-start' }}>
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
