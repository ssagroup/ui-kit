import { SubmitHandler } from 'react-hook-form';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
} from '@components/Popover';
import {
  AccordionTitle,
  AccordionGroup,
  AccordionGroupContextProvider,
} from '@components/AccordionGroup';
import { TableFiltersAccordion } from './TableFiltersAccordion';
import { TableFiltersAccordionContent } from './TableFiltersAccordionContent';
import { TableFiltersButtons } from './TableFiltersButtons';
import { TableFilterTrigger } from './TableFilterTrigger';
import {
  tableFilterDividerStyles,
  tableFilterPopoverContentStyles,
} from '../styles';
import { TableFilterCheckbox } from './TableFilterCheckbox';
import { useState } from 'react';
import { assocPath } from '@ssa-ui-kit/utils';

type KeysNames2 = 'checkbox1' | 'checkbox2';

const initialState2: Record<
  'strategy',
  Partial<Record<KeysNames2, boolean>>
> = {
  strategy: {
    checkbox1: true,
    checkbox2: true,
  },
};

export const StoryComponent = () => {
  const [checkboxData, setCheckboxData] = useState(initialState2);
  const onSubmit: SubmitHandler<Record<string, any>> = (event) => {
    event.preventDefault();
    console.log('>>>onSubmit', checkboxData);
  };
  const onReset = () => {
    setCheckboxData(() => initialState2);
  };
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
          css={tableFilterPopoverContentStyles}>
          <form onSubmit={onSubmit}>
            <PopoverDescription variant="body1">
              <AccordionGroupContextProvider>
                <AccordionGroup size="medium">
                  <TableFiltersAccordion
                    id="strategy"
                    title="Strategy"
                    isOpened
                    ariaControls="strategy-panel"
                    renderContent={(props) => (
                      <TableFiltersAccordionContent {...props}>
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setCheckboxData(
                              assocPath(
                                ['strategy', 'checkbox1'],
                                newState,
                              ) as any,
                            )
                          }
                          // onChange={(newState) =>
                          //   setCheckboxData((data) => ({
                          //     ...data,
                          //     strategy: {
                          //       ...data.strategy,
                          //       checkbox1: newState,
                          //     },
                          //   }))
                          // }
                          text="checkbox1"
                          externalState={checkboxData.strategy.checkbox1}
                        />
                      </TableFiltersAccordionContent>
                    )}
                    renderTitle={AccordionTitle}
                  />
                  <TableFiltersAccordion
                    id="strategy2"
                    title="Strategy2"
                    isOpened
                    ariaControls="strategy-panel2"
                    renderContent={(props) => (
                      <TableFiltersAccordionContent {...props}>
                        <TableFilterCheckbox
                          onChange={(newState) =>
                            setCheckboxData(
                              assocPath(
                                ['strategy', 'checkbox2'],
                                newState,
                              ) as any,
                            )
                          }
                          // onChange={(newState) =>
                          //   setCheckboxData((data) => ({
                          //     ...data,
                          //     strategy: {
                          //       ...data.strategy,
                          //       checkbox2: newState,
                          //     },
                          //   }))
                          // }
                          text="checkbox1"
                          externalState={checkboxData.strategy.checkbox2}
                        />
                      </TableFiltersAccordionContent>
                    )}
                    renderTitle={AccordionTitle}
                  />
                </AccordionGroup>
              </AccordionGroupContextProvider>
            </PopoverDescription>
            <hr css={tableFilterDividerStyles} />
            <TableFiltersButtons onReset={onReset} />
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
};
