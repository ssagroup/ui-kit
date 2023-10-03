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
import { CheckboxData, TableFiltersView } from './types';
import { useTableData } from './hooks/useTableData';

export const TableFilters = ({
  handleCancel,
  handleSubmit,
  handleClear,
  initialState = {} as CheckboxData,
  data,
}: TableFiltersView) => {
  const {
    checkboxData,
    selectedGroupsCount,
    handleCheckboxChange,
    onClear,
    onReset,
    onSubmit,
  } = useTableData({
    data,
    initialState,
    handleCancel,
    handleSubmit,
    handleClear,
  });
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
                {data.map((accordionInfo) => (
                  <TableFiltersAccordion
                    key={accordionInfo.id}
                    id={accordionInfo.id}
                    title={accordionInfo.title}
                    isOpened={accordionInfo.isOpened}
                    ariaControls={accordionInfo.ariaControls}
                    renderContent={(props) => (
                      <TableFiltersAccordionContent {...props}>
                        {accordionInfo.items.map((info) => {
                          const extraProps: Partial<ICheckboxProps> = {};
                          if (info.isDisabled) {
                            extraProps.initialState =
                              !!checkboxData?.[accordionInfo.id]?.[info.name];
                          } else {
                            extraProps.externalState =
                              !!checkboxData?.[accordionInfo.id]?.[info.name];
                          }
                          return (
                            <TableFilterCheckbox
                              key={info.key}
                              name={info.name}
                              id={info.key}
                              onChange={handleCheckboxChange(
                                info.content.statePath,
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
                ))}
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
