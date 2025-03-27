import { useState, useId, useEffect } from 'react';
import { useWindowSize } from '@ssa-ui-kit/hooks';
import Wrapper from '@components/Wrapper';
import * as S from './styles';
import {
  CollapsibleNavBarBase,
  CollapsibleNavBarWrapper,
  CollapsibleNavBarList,
  CollapsibleNavToggle,
  NavContentToggle,
  NavBarItem,
} from './components';
import { CollapsibleNavBarProvider } from './CollapsibleNavBarContext';
import { CollapsibleNavBarExtendedProps } from './types';
import { SCREEN_SIZES } from '../../consts';
/**
 * UI Component that shows the collapsible navigation bar
 */
export const CollapsibleNavBar = ({
  items,
  renderLogo,
  theme = 'default',
  subMenuMaxWidth,
  className,
  useMatchPattern,
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
        className={className + (isChecked ? ' opened' : '')}
        data-theme={theme}>
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
              return (
                <NavBarItem
                  onClick={handleCloseMobileMenu}
                  useMatchPattern={useMatchPattern}
                  item={item}
                  key={keyName}
                />
              );
            })}
          </CollapsibleNavBarList>
        </CollapsibleNavBarWrapper>
      </CollapsibleNavBarBase>
    </CollapsibleNavBarProvider>
  );
};
