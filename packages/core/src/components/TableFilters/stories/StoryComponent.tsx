import { useTheme } from '@emotion/react';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
} from '@components/Popover';
import {
  AccordionTitle,
  AccordionGroup,
  AccordionContent,
  AccordionGroupContextProvider,
} from '@components/AccordionGroup';
import { TableFiltersAccordion } from './TableFiltersAccordion';
import Typography from '@components/Typography';
import { TableFiltersButtons } from './TableFiltersButtons';
import { TableFilterTrigger } from './TableFilterTrigger';

export const StoryComponent = () => {
  const theme = useTheme();
  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Popover>
        <TableFilterTrigger>More</TableFilterTrigger>
        <PopoverContent
          className="popover"
          css={{
            gap: 15,
            border: `1px solid ${theme.colors.greyDropdownMain}`,
            borderRadius: 20,
            padding: '20px 20px 17px 18px',
            width: 340,
            background: theme.colors.white,
          }}>
          <PopoverDescription variant="body1">
            <AccordionGroupContextProvider>
              <AccordionGroup size="medium">
                <TableFiltersAccordion
                  id="strategy"
                  title="Strategy"
                  ariaControls="strategy-panel"
                  renderContent={(props) => (
                    <AccordionContent {...props}>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris eleifend, dui in commodo porttitor, neque metus
                        lobortis sem, at suscipit arcu ligula non enim.
                      </Typography>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris eleifend, dui in commodo porttitor, neque metus
                        lobortis sem, at suscipit arcu ligula non enim.
                      </Typography>
                    </AccordionContent>
                  )}
                  renderTitle={AccordionTitle}
                />
                <TableFiltersAccordion
                  id="status"
                  title="Status"
                  isOpened
                  ariaControls="status-panel"
                  renderContent={(props) => (
                    <AccordionContent {...props}>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris eleifend, dui in commodo porttitor, neque metus
                        lobortis sem, at suscipit arcu ligula non enim.
                      </Typography>
                    </AccordionContent>
                  )}
                  renderTitle={AccordionTitle}
                />
                <TableFiltersAccordion
                  id="pairs"
                  title="Pairs"
                  ariaControls="pairs-panel"
                  renderContent={(props) => (
                    <AccordionContent {...props}>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris eleifend, dui in commodo porttitor, neque metus
                        lobortis sem, at suscipit arcu ligula non enim.
                      </Typography>
                    </AccordionContent>
                  )}
                  renderTitle={AccordionTitle}
                />
                <TableFiltersAccordion
                  id="exchange"
                  title="Exchange"
                  ariaControls="exchange-panel"
                  renderContent={(props) => (
                    <AccordionContent {...props}>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris eleifend, dui in commodo porttitor, neque metus
                        lobortis sem, at suscipit arcu ligula non enim.
                      </Typography>
                    </AccordionContent>
                  )}
                  renderTitle={AccordionTitle}
                />
              </AccordionGroup>
            </AccordionGroupContextProvider>
          </PopoverDescription>
          {/* TODO: Make the new component with these props + color... */}
          <hr
            css={{
              background: '#000',
              height: 1,
              width: 'calc(100% + 38px)',
              marginLeft: -19,
            }}
          />
          <TableFiltersButtons />
        </PopoverContent>
      </Popover>
    </div>
  );
};
