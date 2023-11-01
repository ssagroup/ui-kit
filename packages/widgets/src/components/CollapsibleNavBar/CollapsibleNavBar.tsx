import React, { useId } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import * as S from './styles';

import {
  Accordion,
  AccordionContent,
  AccordionGroup,
  AccordionGroupContextProvider,
  AccordionTitle,
  Icon,
  Wrapper,
} from '@ssa-ui-kit/core';

import CollapsibleNavBarBase from './CollapsibleNavBarBase';
import CollapsibleNavBarWrapper from './CollapsibleNavBarWrapper';
import CollapsibleNavBarList from './CollapsibleNavBarList';
import CollapsibleNavBarItem from './CollapsibleNavBarItem';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import CollapsibleNavToggle from './CollapsibleNavToggle';

import { INavBarExtendedProps } from './types';

/**
 * UI Component that shows the collapsible navigation bar
 */
export const CollapsibleNavBar = ({ items }: INavBarExtendedProps) => {
  const { pathname } = useLocation();
  const toggleId = useId();
  const theme = useTheme();

  return (
    <CollapsibleNavBarBase>
      <CollapsibleNavToggle id={toggleId} />

      <CollapsibleNavBarWrapper>
        <CollapsibleNavBarList>
          {items.map((item) => {
            if ('items' in item) {
              const { iconName, title, items, prefix } = item;
              const uniqName = iconName + title.replace(' ', '').toLowerCase();
              const accordionUniqName = uniqName + 'accordion';
              return (
                <AccordionGroupContextProvider key={uniqName}>
                  <CollapsibleNavBarItem>
                    <AccordionGroup
                      size="small"
                      css={{
                        width: '100%',
                      }}>
                      <Accordion
                        id={accordionUniqName}
                        title={title}
                        isOpened={false}
                        ariaControls={`${accordionUniqName}-panel`}
                        css={{
                          padding: 0,
                        }}
                        renderContent={(props) => (
                          <AccordionContent {...props} css={S.AccordionContent}>
                            {items.map((subMenuItem) => (
                              <CollapsibleNavBarLink
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
                              </CollapsibleNavBarLink>
                            ))}
                          </AccordionContent>
                        )}
                        renderTitle={(data) => (
                          <Wrapper
                            onClick={data.onClick}
                            css={{
                              cursor: 'pointer',
                              alignItems: 'flex-start',
                            }}>
                            <div css={S.IconWrapper}>
                              <Icon
                                name={iconName}
                                color={theme.colors.grey}
                                size={24}
                              />
                            </div>
                            <AccordionTitle
                              {...data}
                              css={{
                                padding: '0 14px 0 20px',
                              }}
                            />
                          </Wrapper>
                        )}
                      />
                    </AccordionGroup>
                  </CollapsibleNavBarItem>
                </AccordionGroupContextProvider>
              );
            } else {
              const { path, iconName, title } = item;
              return (
                <CollapsibleNavBarItem key={path}>
                  <CollapsibleNavBarLink
                    to={'/' + path}
                    active={pathname === path ? true : undefined}>
                    <Icon
                      name={iconName}
                      color={theme.colors.grey}
                      css={{ marginRight: 20 }}
                    />
                    <span>{title}</span>
                  </CollapsibleNavBarLink>
                </CollapsibleNavBarItem>
              );
            }
          })}
        </CollapsibleNavBarList>
      </CollapsibleNavBarWrapper>
    </CollapsibleNavBarBase>
  );
};
