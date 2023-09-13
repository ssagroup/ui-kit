import styled from '@emotion/styled';
import { Children, cloneElement, isValidElement, useLayoutEffect } from 'react';
import { useAccordionGroupContext } from './AccordionContext';
import { AccordionGroupProps, Accordion } from './types';

const AccordionBase = styled.div``;

const AccordionGroup = ({
  children,
  variant = 'empty',
  ...rest
}: AccordionGroupProps) => {
  const { activeTabs, setActiveTabs, toggleActiveTab } =
    useAccordionGroupContext();

  useLayoutEffect(() => {
    const initialTabs: Accordion[] = [];
    Children.map(children, (child) => {
      if (isValidElement(child) && child.props.isActive) {
        const { renderContent, renderTitle, ...rest } = child.props;
        initialTabs.push({
          tabId: rest.tabId,
          renderContent: renderContent.bind(null, rest),
          renderTitle: renderTitle.bind(null, rest),
        });
      }
    });
    setActiveTabs(initialTabs);
  }, []);

  return (
    <AccordionBase role="tablist" {...rest}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          const { renderContent, renderTitle, ...rest } = child.props;
          const tabId = rest.tabId;
          const isActive = !!activeTabs.find(
            (activeTab) => activeTab.tabId === tabId,
          );

          return cloneElement(child, {
            key: tabId,
            isActive,
            variant,
            onClick: () =>
              toggleActiveTab({
                tabId,
                renderContent: renderContent.bind(null, rest),
                renderTitle: renderTitle.bind(null, rest),
              }),
          });
        }
      })}
    </AccordionBase>
  );
};

export default AccordionGroup;
