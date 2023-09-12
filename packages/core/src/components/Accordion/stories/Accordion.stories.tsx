import type { Meta, StoryObj } from '@storybook/react';
import Typography from '@components/Typography';
import AccordionTab from '@components/Accordion/AccordionTab';
import Accordion from '../index';
import { AccordionDecorator } from './helpers';
import AccordionTitle from '../AccordionTitle';
import AccordionContent from '../AccordionContent';
import Tooltip from '@components/Tooltip';
import TooltipTrigger from '@components/TooltipTrigger';
import TooltipContent from '@components/TooltipContent';
import Button from '@components/Button';
import Icon from '@components/Icon';
import { css, useTheme } from '@emotion/react';
import { AccordionProps } from '../types';

type Args = StoryObj<typeof Accordion>;

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    docs: {
      description: {
        component:
          'An accordion is a container that allows users to toggle visible of related content on a page',
      },
    },
  },
  decorators: [AccordionDecorator],
  argTypes: {},
} as Meta<typeof Accordion>;

const AccordionTemplate = (args: Pick<AccordionProps, 'variant'>) => (
  <Accordion {...args}>
    <AccordionTab
      tabId="first"
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
    <AccordionTab
      tabId="second"
      title="Advanced"
      isActive
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
    <AccordionTab
      tabId="third"
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
  </Accordion>
);

const StoryTemplate: Args = {
  render: ({ ...args }) => <AccordionTemplate {...(args as any)} />,
};

export const Large = {
  ...StoryTemplate,
  args: {
    variant: 'large',
  },
};

export const Medium = () => {
  const theme = useTheme();

  return (
    <Tooltip size="large" placement="bottom-start" isOpen>
      <TooltipTrigger>
        <Button
          size="medium"
          variant="secondary"
          css={css`
            & svg {
              padding-top: 6px;
            }
          `}
          endIcon={<Icon name="more" color={theme.colors.dark} size={16} />}>
          More
        </Button>
      </TooltipTrigger>
      <TooltipContent
        css={{
          textAlign: 'center',
          background: '#fff',
          border: `1px solid ${theme.colors.greyDropdownMain}`,
        }}>
        <div css={{ margin: '0 auto', width: '340px' }}>
          <AccordionTemplate variant="medium" />
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export const Small = {
  ...StoryTemplate,
  args: {
    variant: 'small',
  },
};
