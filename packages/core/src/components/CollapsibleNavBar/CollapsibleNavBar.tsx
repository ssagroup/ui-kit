import { useState, useId, useEffect } from 'react';
import { useWindowSize } from '@ssa-ui-kit/hooks';
import Wrapper from '@components/Wrapper';
import * as S from './styles';
import CollapsibleNavBarBase from './CollapsibleNavBarBase';
import CollapsibleNavBarWrapper from './CollapsibleNavBarWrapper';
import CollapsibleNavBarList from './CollapsibleNavBarList';
import CollapsibleNavToggle from './CollapsibleNavToggle';
import { CollapsibleNavBarExtendedProps } from './types';
import { NavContentToggle } from './CollapsibleNavContentToggle';
import { NavBarItemWithSubMenu } from './NavBarItemWithSubMenu';
import { NavBarItemWithoutSubMenu } from './NavBarItemWithoutSubMenu';
import { CollapsibleNavBarProvider } from './CollapsibleNavBarContext';
import { SCREEN_SIZES } from '../../consts';
/**
 * UI Component that shows the collapsible navigation bar
 */
export const CollapsibleNavBar = ({
  items,
  renderLogo,
  theme = 'default',
  subMenuMaxWidth,
  onChange,
}: CollapsibleNavBarExtendedProps) => {
  const toggleId = useId();
  const { width } = useWindowSize();
  const [isChecked, onToggle] = useState(false);
  const isMobile = width < SCREEN_SIZES['900'].width;

  useEffect(() => {
    onToggle(false);
  }, [width]);

  useEffect(() => {
    onChange?.(isChecked);
  }, [isChecked]);

  const handleCloseMobileMenu = () => {
    if (isMobile) {
      onToggle(!isChecked);
    }
  };

  return (
    <CollapsibleNavBarProvider theme={theme} subMenuMaxWidth={subMenuMaxWidth}>
      <CollapsibleNavBarBase
        className={isChecked ? 'opened' : undefined}
        navBarTheme={theme}>
        <input
          type="checkbox"
          id={toggleId}
          checked={isChecked}
          onChange={() => {
            onToggle(!isChecked);
          }}
        />

        <CollapsibleNavToggle id={toggleId} />

        <CollapsibleNavBarWrapper navBarTheme={theme}>
          <Wrapper css={S.LogoWrapper}>
            {renderLogo}
            <NavContentToggle id={toggleId} isChecked={isChecked} />
          </Wrapper>
          <CollapsibleNavBarList navBarTheme={theme}>
            {items.map((item) => {
              const { iconName, title } = item;
              const keyName = iconName + title.replace(' ', '').toLowerCase();
              return 'items' in item ? (
                <NavBarItemWithSubMenu
                  item={item}
                  key={keyName}
                  onClick={handleCloseMobileMenu}
                />
              ) : (
                <NavBarItemWithoutSubMenu
                  item={item}
                  key={keyName}
                  onClick={handleCloseMobileMenu}
                />
              );
            })}
          </CollapsibleNavBarList>
        </CollapsibleNavBarWrapper>
      </CollapsibleNavBarBase>
    </CollapsibleNavBarProvider>
  );
};
