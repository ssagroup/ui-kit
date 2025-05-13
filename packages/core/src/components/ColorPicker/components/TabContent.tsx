import { useTabBarContext } from '@components/TabBar';

export const TabContent = () => {
  const { activeTab } = useTabBarContext();

  return <>{activeTab?.renderContent()}</>;
};
