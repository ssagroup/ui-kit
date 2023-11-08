import { useLocation } from 'react-router-dom';
import { Wrapper } from '@ssa-ui-kit/core';
import * as S from './styles';

import CollapsibleNavBarBase from './CollapsibleNavBarBase';
import CollapsibleNavBarWrapper from './CollapsibleNavBarWrapper';
import CollapsibleNavBarList from './CollapsibleNavBarList';
import CollapsibleNavToggle from './CollapsibleNavToggle';
import { CollapsibleNavBarExtendedProps } from './types';
import { NavContentToggle } from './CollapsibleNavContentToggle';
import { NavBarItemWithSubMenu } from './NavBarItemWithSubMenu';
import { NavBarItemWithoutSubMenu } from './NavBarItemWithoutSubMenu';

/**
 * UI Component that shows the collapsible navigation bar
 *
 */
export const CollapsibleNavBar = ({
  items,
  renderLogo,
}: CollapsibleNavBarExtendedProps) => {
  const { pathname } = useLocation();

  return (
    <CollapsibleNavBarBase>
      <CollapsibleNavToggle />

      <CollapsibleNavBarWrapper>
        <Wrapper css={S.LogoWrapper}>
          {renderLogo}
          <NavContentToggle id={'contentToggler'} />
        </Wrapper>
        <CollapsibleNavBarList>
          {items.map((item) => {
            const { iconName, title } = item;
            const keyName = iconName + title.replace(' ', '').toLowerCase();
            return 'items' in item ? (
              <NavBarItemWithSubMenu
                item={item}
                pathname={pathname}
                key={keyName}
              />
            ) : (
              <NavBarItemWithoutSubMenu
                item={item}
                pathname={pathname}
                key={keyName}
              />
            );
          })}
        </CollapsibleNavBarList>
      </CollapsibleNavBarWrapper>
    </CollapsibleNavBarBase>
  );
};
