import { useId } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';

import {
  Accordion,
  AccordionContent,
  AccordionGroup,
  AccordionGroupContextProvider,
  AccordionTitle,
  Icon,
} from '@ssa-ui-kit/core';

import NavBarBase from '../NavBar/NavBarBase';
import NavBarWrapper from '../NavBar/NavBarWrapper';
import NavBarList from '../NavBar/NavBarList';
import NavBarItem from '../NavBar/NavBarItem';
import NavBarLink from '../NavBar/NavBarLink';
import NavToggle from '../NavBar/NavToggle';

import { INavBarExtendedProps } from './types';

/**
 * UI Component that shows the collapsible navigation bar
 */
export const CollapsibleNavBar = ({ items }: INavBarExtendedProps) => {
  const toggleId = useId();
  const { pathname } = useLocation();
  const theme = useTheme();

  return (
    <NavBarBase>
      <input type="checkbox" id={toggleId} />

      <NavToggle htmlFor={toggleId} />

      <NavBarWrapper>
        <NavBarList>
          {items.map((item) => {
            if ('items' in item) {
              const { iconName, title, items, prefix } = item;
              const uniqName = iconName + title.replace(' ', '').toLowerCase();
              const accordionUniqName = uniqName + 'accordion';
              return (
                <AccordionGroupContextProvider key={uniqName}>
                  <NavBarItem>
                    <Icon name={iconName} color={theme.colors.grey} />
                    <AccordionGroup size="small">
                      <Accordion
                        id={accordionUniqName}
                        title={title}
                        isOpened={false}
                        ariaControls={`${accordionUniqName}-panel`}
                        css={{
                          padding: 0,
                        }}
                        renderContent={(props) => (
                          <AccordionContent
                            {...props}
                            css={{
                              alignItems: 'flex-start',
                            }}>
                            {items.map((subMenuItem) => (
                              <NavBarLink
                                key={`${accordionUniqName}-link-${subMenuItem.title
                                  .replace(' ', '')
                                  .toLowerCase()}`}
                                to={'/' + prefix + subMenuItem.path}
                                active={
                                  pathname === subMenuItem.path
                                    ? true
                                    : undefined
                                }>
                                {subMenuItem.title}
                              </NavBarLink>
                            ))}
                          </AccordionContent>
                        )}
                        renderTitle={AccordionTitle}
                      />
                    </AccordionGroup>
                  </NavBarItem>
                </AccordionGroupContextProvider>
              );
            } else {
              const { path, iconName } = item;
              return (
                <NavBarItem key={path}>
                  <NavBarLink
                    to={'/' + path}
                    active={pathname === path ? true : undefined}>
                    <Icon name={iconName} color={theme.colors.grey} />
                  </NavBarLink>
                </NavBarItem>
              );
            }
          })}
        </NavBarList>
      </NavBarWrapper>
    </NavBarBase>
  );
};
