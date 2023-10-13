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
import { TableFilterConfig } from './types';
import { UseTableDataResult } from './hooks/useTableData';
import { useEffect, useState } from 'react';

export const TableFilters = ({
  checkboxData = {} as TableFilterConfig,
  selectedItemsByGroup,
  hiddenGroups,
  areAllFiltersVisible,
  extraFiltersCount,
  onReset,
  onSubmit,
  onClear,
  handleCheckboxToggle,
}: UseTableDataResult) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleReset = () => {
    setIsOpen(false);
    onReset();
  };

  useEffect(() => {
    if (extraFiltersCount === 0) {
      setIsOpen(false);
    }
  }, [extraFiltersCount]);

  return (
    <Popover
      floatingOptions={{
        onOpenChange,
        open: isOpen,
      }}>
      <TableFilterTriggerWithNotification
        count={extraFiltersCount}
        visible={!areAllFiltersVisible}>
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
                  const accordionInfo = checkboxData[groupName];
                  const selectedItems = selectedItemsByGroup[groupName];
                  const isHidden = hiddenGroups.includes(groupName);
                  return (
                    <TableFiltersAccordion
                      key={accordionInfo.id}
                      id={accordionInfo.id}
                      title={accordionInfo.title}
                      isOpened={accordionInfo.isOpened}
                      isHidden={isHidden}
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
          <TableFiltersButtons onClear={onClear} onCancel={handleReset} />
        </form>
      </PopoverContent>
    </Popover>
  );
};
