import { useTabBarContext } from '@components/TabBar';
import { TabColorPicker } from './TabColorPicker';
import { TabColorPalette } from './TabColorPalette';

export const TabContent = () => {
  const { activeTab } = useTabBarContext();

  return (
    <>
      {activeTab?.tabId === 'color-picker' && <TabColorPicker />}
      {activeTab?.tabId === 'color-palette' && <TabColorPalette />}
    </>
  );
};
