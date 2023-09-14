import styled from '@emotion/styled';
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
} from 'react';
import { useAccordionGroupContext } from './AccordionContext';
import { AccordionGroupProps, AccordionProps } from './types';

const AccordionBase = styled.div``;

export const AccordionGroup = ({
  children,
  size = 'empty',
  accordionsStayOpen = true,
  ...rest
}: AccordionGroupProps) => {
  const {
    openedAccordions,
    setOpenedAccordions,
    toggleOpenedAccordion,
    setStayOpen,
  } = useAccordionGroupContext();

  useEffect(() => {
    setStayOpen(accordionsStayOpen);
  }, []);

  useLayoutEffect(() => {
    const initialAccordions: AccordionProps[] = [];
    Children.map(children, (child) => {
      if (isValidElement(child) && child.props.isOpened) {
        const { renderContent, renderTitle, ...rest } = child.props;
        initialAccordions.push({
          id: rest.id,
          renderContent: renderContent.bind(null, rest),
          renderTitle: renderTitle.bind(null, rest),
        });
      }
    });
    setOpenedAccordions(initialAccordions);
  }, []);

  return (
    <AccordionBase role="tablist" {...rest}>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          const { renderContent, renderTitle, ...rest } = child.props;
          const id = rest.id;
          const isOpened = !!openedAccordions.find(
            (activeAccordion) => activeAccordion.id === id,
          );

          return cloneElement(child, {
            key: id,
            isOpened,
            size,
            onClick: () =>
              toggleOpenedAccordion({
                id,
                renderContent: renderContent.bind(null, rest),
                renderTitle: renderTitle.bind(null, rest),
              }),
          });
        }
      })}
    </AccordionBase>
  );
};
