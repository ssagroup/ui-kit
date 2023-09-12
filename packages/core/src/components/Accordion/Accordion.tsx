import styled from '@emotion/styled';
import { Children, cloneElement, isValidElement, useLayoutEffect } from 'react';
import { useAccordionContext } from './AccordionContext';
import { AccordionProps, AccordionTab } from './types';

const AccordionBase = styled.div``;

const Accordion = ({ children, variant = 'empty' }: AccordionProps) => {
  const { activeTabs, setActiveTabs, toggleActiveTab } = useAccordionContext();

  useLayoutEffect(() => {
    const initialTabs: AccordionTab[] = [];
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
    <AccordionBase role="tablist">
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

export default Accordion;
