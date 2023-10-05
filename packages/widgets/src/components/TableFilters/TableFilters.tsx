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
import { FiltersNames, TableFiltersView } from './types';
import { useTableData } from './hooks/useTableData';
import { useEffect } from 'react';
import { FiltersContextProvider } from '@components/Filters/FiltersContext';

export const TableFilters = ({
  handleCancel,
  handleSubmit,
  handleClear,
  initialState,
}: TableFiltersView) => {
  // use context...
  const {
    checkboxData,
    selectedItemsByGroup,
    selectedGroupsCount,
    setCheckboxData,
    handleCheckboxToggle,
    onClear,
    onReset,
    onSubmit,
  } = useTableData({
    handleCancel,
    handleSubmit,
    handleClear,
    initialState,
  });

  console.log('>>>TableFilters: render', {
    checkboxData,
    selectedItemsByGroup,
    selectedGroupsCount,
  });

  useEffect(() => {
    console.log('>>>TableFilters: initialState', initialState);
    if (initialState) {
      setCheckboxData(initialState);
    }
  }, [initialState]);

  useEffect(() => {
    console.log('>>>TableFilters: checkboxData', checkboxData);
  }, [checkboxData]);

  useEffect(() => {
    console.log('>>>TableFilters: selectedItemsByGroup', selectedItemsByGroup);
  }, [selectedItemsByGroup]);

  // TODO: use result of hook for the FiltersContextProvider!
  return (
    <Popover>
      <FiltersContextProvider
        initialState={initialState}
        handleCancel={handleCancel}
        handleClear={handleClear}
        handleSubmit={handleSubmit}>
        <TableFilterTriggerWithNotification count={selectedGroupsCount}>
          More
        </TableFilterTriggerWithNotification>
        <PopoverContent
          className="popover"
          css={tableFilterPopoverContentStyles}>
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
                    const accordionInfo =
                      checkboxData[groupName as FiltersNames];
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
      </FiltersContextProvider>
    </Popover>
  );
};
