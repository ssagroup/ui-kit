import { Decorator } from '@storybook/react-webpack5';
import { AccordionGroupContextProvider } from '../AccordionContext';
import Typography from '@components/Typography';
import {
  Accordion,
  AccordionTitle,
  AccordionGroup,
  AccordionContent,
} from '@components/AccordionGroup';
import { AccordionGroupProps } from '../types';

export const AccordionGroupDecorator: Decorator = (Story, { args }) => {
  return (
    <AccordionGroupContextProvider>
      <Story {...args} />
    </AccordionGroupContextProvider>
  );
};

export const AccordionTemplate = (
  args: Pick<AccordionGroupProps, 'size' | 'accordionsStayOpen'>,
) => (
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
