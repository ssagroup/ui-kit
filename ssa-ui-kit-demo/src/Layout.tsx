import { CollapsibleNavBar } from '@ssa-ui-kit/core';

// Logo component for the navbar
const Logo = () => (
  <div style={{
    color: '#fff',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px 0',
  }}>
    SSA UI Kit
  </div>
);

// Navigation items
const NAV_ITEMS = [
  { 
    path: 'main', 
    iconName: 'home' as const, 
    iconSize: 20, 
    title: 'Main' 
  },
  { 
    path: 'another-page', 
    iconName: 'settings' as const, 
    iconSize: 20, 
    title: 'Another Page' 
  },
  { 
    path: 'ai-dashboard', 
    iconName: 'plus' as const, 
    iconSize: 20, 
    title: 'AI Dashboard' 
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      overflow: 'hidden',
    }}>
      {/* Navigation Column */}
      <div style={{
        position: 'relative',
        zIndex: 10,
      }}>
        <CollapsibleNavBar
          items={NAV_ITEMS}
          renderLogo={<Logo />}
          theme="default"
          showIconTooltip={true}
          onChange={(isChecked) => {
            console.log('Navigation toggled:', isChecked);
          }}
        />
      </div>

      {/* Content Column */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Main Content Area */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '24px',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
};
