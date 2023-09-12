import React from 'react';
import Accordion from '../Accordion';
import { DecoratorFunction } from '@storybook/types';
import { AccordionContextProvider } from '../AccordionContext';

type Args = Parameters<typeof Accordion>[0];

export const AccordionDecorator: DecoratorFunction<
  {
    component: typeof Accordion;
    storyResult: React.ReactElement;
    canvasElement: unknown;
  },
  Args
> = (Story, { args }) => {
  return (
    <AccordionContextProvider>
      <Story {...args} />
    </AccordionContextProvider>
  );
};
