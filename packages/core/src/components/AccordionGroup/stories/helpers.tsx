import React from 'react';
import { DecoratorFunction } from '@storybook/types';
import { AccordionGroupContextProvider } from '../AccordionContext';
import Typography from '@components/Typography';
import {
  Accordion,
  AccordionTitle,
  AccordionGroup,
  AccordionContent,
} from '@components/AccordionGroup';
import { AccordionGroupProps } from '../types';

type Args = Parameters<typeof AccordionGroup>[0];

export const AccordionGroupDecorator: DecoratorFunction<
  {
    component: typeof AccordionGroup;
    storyResult: React.ReactElement;
    canvasElement: unknown;
  },
  Args
> = (Story, { args }) => {
  return (
    <AccordionGroupContextProvider>
      <Story {...args} />
    </AccordionGroupContextProvider>
  );
};

export const AccordionTemplate = (args: Pick<AccordionGroupProps, 'size'>) => (
  <AccordionGroup {...args}>
    <Accordion
      id="first"
      title="Basic"
      ariaControls="first-panel"
      renderContent={(props) => (
        <AccordionContent {...props}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            eleifend, dui in commodo porttitor, neque metus lobortis sem, at
            suscipit arcu ligula non enim.
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            eleifend, dui in commodo porttitor, neque metus lobortis sem, at
            suscipit arcu ligula non enim.
          </Typography>
        </AccordionContent>
      )}
      renderTitle={AccordionTitle}
    />
    <Accordion
      id="second"
      title="Advanced"
      isOpened
      ariaControls="second-panel"
      renderContent={(props) => (
        <AccordionContent {...props}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            eleifend, dui in commodo porttitor, neque metus lobortis sem, at
            suscipit arcu ligula non enim.
          </Typography>
        </AccordionContent>
      )}
      renderTitle={AccordionTitle}
    />
    <Accordion
      id="third"
      title="Indicator"
      ariaControls="third-panel"
      renderContent={(props) => (
        <AccordionContent {...props}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            eleifend, dui in commodo porttitor, neque metus lobortis sem, at
            suscipit arcu ligula non enim.
          </Typography>
        </AccordionContent>
      )}
      renderTitle={AccordionTitle}
    />
  </AccordionGroup>
);
