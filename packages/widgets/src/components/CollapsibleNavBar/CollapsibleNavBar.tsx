import { useState, useId, useEffect } from 'react';
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
 */
export const CollapsibleNavBar = ({
  items,
  renderLogo,
}: CollapsibleNavBarExtendedProps) => {
  const toggleId = useId();
  const [isChecked, onToggle] = useState(false);

  useEffect(() => {
    const onResize = () => {
      onToggle(false);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <CollapsibleNavBarBase className={isChecked ? 'opened' : undefined}>
      <input
        type="checkbox"
        id={toggleId}
        checked={isChecked}
        onChange={() => {
          onToggle(!isChecked);
        }}
      />

      <CollapsibleNavToggle id={toggleId} />

      <CollapsibleNavBarWrapper>
        <Wrapper css={S.LogoWrapper}>
          {renderLogo}
          <NavContentToggle id={toggleId} isChecked={isChecked} />
        </Wrapper>
        <CollapsibleNavBarList>
          {items.map((item) => {
            const { iconName, title } = item;
            const keyName = iconName + title.replace(' ', '').toLowerCase();
            return 'items' in item ? (
              <NavBarItemWithSubMenu item={item} key={keyName} />
            ) : (
              <NavBarItemWithoutSubMenu item={item} key={keyName} />
            );
          })}
        </CollapsibleNavBarList>
      </CollapsibleNavBarWrapper>
    </CollapsibleNavBarBase>
  );
};
