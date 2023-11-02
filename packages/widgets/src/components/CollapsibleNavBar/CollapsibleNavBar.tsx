import { useId } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import * as S from './styles';

import {
  Accordion,
  AccordionGroup,
  AccordionGroupContextProvider,
  AccordionTitle,
  Icon,
  ResponsiveImage,
  Wrapper,
} from '@ssa-ui-kit/core';

import CollapsibleNavBarBase from './CollapsibleNavBarBase';
import CollapsibleNavBarWrapper from './CollapsibleNavBarWrapper';
import CollapsibleNavBarList from './CollapsibleNavBarList';
import CollapsibleNavBarItem from './CollapsibleNavBarItem';
import CollapsibleNavBarLink from './CollapsibleNavBarLink';
import CollapsibleNavToggle from './CollapsibleNavToggle';

import { INavBarExtendedProps } from './types';
import { CollapsibleNavBarAccordionContent } from './CollapsibleNavBarAccordionContent';
import { CollapsibleNavBarPopover } from './CollapsibleNavBarPopover';

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
        <ResponsiveImage
          css={S.ResponsiveLogo}
          srcSet="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FCTP_Large_Left.png?alt=media&token=b6fe7ab8-fd0b-475f-bb08-360311f27693 69w, https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FCTP_Medium_Left.png?alt=media&token=a1aeba69-7c07-40c9-aeac-c2477640870d 55w"
          sizes="(min-width: 1440px) 69px, 55px"
          src="https://firebasestorage.googleapis.com/v0/b/admin-themes.appspot.com/o/logo%2FCTP_Small_Left.png?alt=media&token=bff7149e-3b90-4657-8a11-040e83990e6f"
          alt="SSA CTP logo"
        />
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
                          <CollapsibleNavBarAccordionContent
                            items={items}
                            accordionUniqName={accordionUniqName}
                            prefix={prefix}
                            pathname={pathname}
                            isPopover={false}
                            {...props}
                          />
                        )}
                        renderTitle={(data) => (
                          <Wrapper
                            onClick={data.onClick}
                            css={S.AccordionTitleWrapper}>
                            <div css={S.IconWrapper}>
                              <CollapsibleNavBarPopover
                                triggerIcon={
                                  <Icon
                                    name={iconName}
                                    color={theme.colors.grey}
                                    size={24}
                                  />
                                }
                                title={data.title}
                                content={
                                  <CollapsibleNavBarAccordionContent
                                    items={items}
                                    accordionUniqName={accordionUniqName}
                                    prefix={prefix}
                                    pathname={pathname}
                                    id={accordionUniqName}
                                    isOpened
                                    isPopover
                                  />
                                }
                              />
                            </div>
                            <AccordionTitle {...data} css={S.AccordionTitle} />
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
                    <CollapsibleNavBarPopover
                      triggerIcon={
                        <Icon
                          name={iconName}
                          color={theme.colors.grey}
                          css={{ marginRight: 20 }}
                        />
                      }
                      title={title}
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
