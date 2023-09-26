import { BaseSyntheticEvent, useState } from 'react';
import { assocPath, dissocPath } from '@ssa-ui-kit/utils';
import {
  AccordionTitle,
  AccordionGroup,
  AccordionGroupContextProvider,
  Popover,
  PopoverContent,
  PopoverDescription,
} from '@ssa-ui-kit/core';
import {
  tableFilterDividerStyles,
  tableFilterPopoverContentStyles,
} from './styles';
import {
  TableFilterCheckbox,
  TableFilterTrigger,
  TableFiltersAccordion,
  TableFiltersAccordionContent,
  TableFiltersButtons,
} from '.';
import { CheckboxData, TableFiltersView } from './types';

export const TableFilters = ({
  handleReset,
  handleSubmit,
  initialState = {} as CheckboxData,
  data,
}: TableFiltersView) => {
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
    handleSubmit?.(checkboxData);
  };
  const onReset = () => {
    setCheckboxData(() => initialState);
    handleReset?.();
  };
  return (
    <Popover>
      <TableFilterTrigger>More</TableFilterTrigger>
      <PopoverContent className="popover" css={tableFilterPopoverContentStyles}>
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
                {data.map((accordionInfo) => (
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
                            name={info.name}
                            id={info.key}
                            onChange={handleCheckboxChange(
                              info.content.statePath,
                            )}
                            text={info.content.text}
                            externalState={
                              !!checkboxData[accordionInfo.id][info.name]
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
  );
};
