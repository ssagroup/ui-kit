import { BaseSyntheticEvent, useState } from 'react';
import { assocPath, dissocPath } from '@ssa-ui-kit/utils';
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
import {
  tableFilterDividerStyles,
  tableFilterPopoverContentStyles,
} from '../styles';
import { mockData } from './mockData';
import {
  TableFilterCheckbox,
  TableFilterTrigger,
  TableFiltersAccordion,
  TableFiltersAccordionContent,
  TableFiltersButtons,
} from '..';

export type KeysNames =
  | 'checkbox1'
  | 'checkbox2'
  | 'checkbox3'
  | 'checkbox4'
  | 'checkbox5'
  | 'running'
  | 'btcfdusd'
  | 'binance';

type AccordionNames = 'strategy' | 'status' | 'pairs' | 'exchange';

export type InitialState = Record<
  AccordionNames,
  Partial<Record<KeysNames, boolean>>
>;

const initialState: InitialState = {
  strategy: {
    checkbox1: true,
    checkbox4: true,
  },
  status: {
    running: true,
  },
  pairs: {
    ['btcfdusd']: true,
  },
  exchange: {
    binance: true,
  },
};

export const StoryComponent = () => {
  const [checkboxData, setCheckboxData] = useState(initialState);
  const handleCheckboxChange = (path: string[]) => (newState: boolean) => {
    if (newState) {
      setCheckboxData(assocPath(path, newState));
    } else {
      setCheckboxData(dissocPath(path));
    }
  };
  const onSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    console.log('>>>onSubmit data', checkboxData);
  };
  const onReset = () => {
    setCheckboxData(() => initialState);
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
          <form
            onSubmit={onSubmit}
            css={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}>
            <PopoverDescription variant="body1">
              <AccordionGroupContextProvider>
                <AccordionGroup size="medium">
                  {mockData.map((accordionInfo) => (
                    <TableFiltersAccordion
                      key={accordionInfo.id}
                      id={accordionInfo.id}
                      title={accordionInfo.title}
                      isOpened={accordionInfo.isOpened}
                      ariaControls={accordionInfo.ariaControls}
                      renderContent={(props) => (
                        <TableFiltersAccordionContent {...props}>
                          {accordionInfo.items.map((info) => (
                            <TableFilterCheckbox
                              key={info.key}
                              name={info.content.text
                                .toLowerCase()
                                .replace('-', '')}
                              id={info.key}
                              onChange={handleCheckboxChange(
                                info.content.statePath,
                              )}
                              text={info.content.text}
                              externalState={
                                !!(checkboxData as any)[accordionInfo.id][
                                  info.content.text
                                    .toLowerCase()
                                    .replace('-', '')
                                ]
                              }
                              isDisabled={info.isDisabled}
                            />
                          ))}
                        </TableFiltersAccordionContent>
                      )}
                      renderTitle={AccordionTitle}
                    />
                  ))}
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
