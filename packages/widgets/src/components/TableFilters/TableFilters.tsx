import {
  AccordionTitle,
  AccordionGroup,
  AccordionGroupContextProvider,
  Popover,
  PopoverContent,
  PopoverDescription,
  ICheckboxProps,
} from '@ssa-ui-kit/core';
import {
  tableFilterDividerStyles,
  tableFilterPopoverContentStyles,
} from './styles';
import {
  TableFilterCheckbox,
  TableFilterTriggerWithNotification,
  TableFiltersAccordion,
  TableFiltersAccordionContent,
  TableFiltersButtons,
} from '.';
import { FiltersNames, TableFilterConfig, TableFiltersView } from './types';
import { useEffect, useLayoutEffect } from 'react';
import { useWindowSize } from '@ssa-ui-kit/hooks';

export const TableFilters = ({
  checkboxData = {} as TableFilterConfig,
  selectedItemsByGroup,
  selectedGroupsCount,
  wrapperRef,
  refsByKey,
  onReset,
  onSubmit,
  onClear,
  handleCheckboxToggle,
}: TableFiltersView) => {
  const { width } = useWindowSize();

  useEffect(() => {
    console.log('>>>TableFilters: refsByKey', checkboxData);
  }, [refsByKey]);

  useLayoutEffect(() => {
    refsByKey &&
      Object.values(refsByKey)
        .filter(Boolean)
        .map((element) => {
          if (element && wrapperRef && wrapperRef.current) {
            element.style.visibility =
              element.offsetLeft < wrapperRef.current.offsetLeft
                ? 'hidden'
                : 'visible';
          }
        });
  }, [width, selectedItemsByGroup]);

  return (
    <Popover>
      <TableFilterTriggerWithNotification count={selectedGroupsCount}>
        More
      </TableFilterTriggerWithNotification>
      <PopoverContent className="popover" css={tableFilterPopoverContentStyles}>
        <form
          onSubmit={onSubmit}
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
          data-testid="table-filters-form">
          <PopoverDescription variant="body1">
            <AccordionGroupContextProvider>
              <AccordionGroup size="medium">
                {Object.keys(checkboxData).map((groupName) => {
                  const accordionInfo = checkboxData[groupName as FiltersNames];
                  const selectedItems = selectedItemsByGroup[groupName];
                  return (
                    <TableFiltersAccordion
                      key={accordionInfo.id}
                      id={accordionInfo.id}
                      title={accordionInfo.title}
                      isOpened={accordionInfo.isOpened}
                      ariaControls={accordionInfo.ariaControls}
                      renderContent={(props) => (
                        <TableFiltersAccordionContent {...props}>
                          {Object.keys(accordionInfo.items).map((itemKey) => {
                            const info = accordionInfo.items[itemKey];
                            const extraProps: Partial<ICheckboxProps> = {};
                            const checked = !!selectedItems?.includes(
                              info.name,
                            );
                            if (info.isDisabled) {
                              extraProps.initialState = checked;
                            } else {
                              extraProps.externalState = checked;
                            }
                            return (
                              <TableFilterCheckbox
                                key={info.key}
                                name={info.name}
                                id={info.key}
                                onChange={handleCheckboxToggle(
                                  groupName,
                                  info.name,
                                )}
                                text={info.content.text}
                                isDisabled={info.isDisabled}
                                {...extraProps}
                              />
                            );
                          })}
                        </TableFiltersAccordionContent>
                      )}
                      renderTitle={AccordionTitle}
                    />
                  );
                })}
              </AccordionGroup>
            </AccordionGroupContextProvider>
          </PopoverDescription>
          <hr css={tableFilterDividerStyles} />
          <TableFiltersButtons onClear={onClear} onCancel={onReset} />
        </form>
      </PopoverContent>
    </Popover>
  );
};
