import { useTabBarContext } from '@components/TabBar';

import { TabColorPalette } from './TabColorPalette';
import { TabColorPicker } from './TabColorPicker';

export const TabContent = () => {
  const { activeTab } = useTabBarContext();

  return (
    <>
      {activeTab?.tabId === 'color-picker' && <TabColorPicker />}
      {activeTab?.tabId === 'color-palette' && <TabColorPalette />}
    </>
  );
};
