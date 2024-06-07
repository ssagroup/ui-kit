import {
  BaseSyntheticEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { assocPath } from '@ssa-ui-kit/utils';
import {
  AccordionTitle,
  AccordionGroup,
  AccordionGroupContextProvider,
  Popover,
  PopoverContent,
  PopoverDescription,
  CheckboxProps,
} from '@components';
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
import { TableFilterConfig, TableFiltersView } from './types';
import {
  getCheckboxChangedItems,
  getClearData,
  getResetData,
  getSubmitData,
} from './utils/handlers';

export const TableFilters = ({
  checkboxData = {} as TableFilterConfig,
  onReset,
  onSubmit,
  onClear,
  onCheckboxToggle,
  handleMoreButtonVisibleChange,
}: TableFiltersView) => {
  const [localCheckboxData, setLocalCheckboxData] =
    useState<TableFilterConfig>(checkboxData);
  const [selectedGroupsCount, setSelectedGroupsCount] = useState(0);
  const [isMoreButtonVisible, setIsMoreButtonVisible] = useState(false);

  const [open, setOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  useEffect(() => {
    setLocalCheckboxData(checkboxData);
  }, [checkboxData]);

  useLayoutEffect(() => {
    let counter = 0;
    Object.keys(localCheckboxData).forEach((groupName) => {
      const selectedItemsDraft =
        localCheckboxData[groupName].selectedItemsDraft || [];
      if (selectedItemsDraft.length > 0) {
        counter++;
      }
    });
    setSelectedGroupsCount(counter);

    if (Object.keys(localCheckboxData).length === 0) {
      setOpen(false);
    }
    const isMoreButtonVisibleLocal = !(
      Object.keys(localCheckboxData).length === 0
    );
    setIsMoreButtonVisible(isMoreButtonVisibleLocal);
  }, [localCheckboxData]);

  useEffect(() => {
    handleMoreButtonVisibleChange?.(isMoreButtonVisible);
  }, [isMoreButtonVisible]);

  const onCheckboxChange = (groupName: string, name: string) => () => {
    const { items, path } = getCheckboxChangedItems(
      localCheckboxData,
      groupName,
      name,
    );
    setLocalCheckboxData(assocPath(path, items));
    onCheckboxToggle?.(groupName, name);
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    const { submitCheckboxData } = getSubmitData(localCheckboxData);
    setLocalCheckboxData(submitCheckboxData);
    onSubmit?.();
  };

  const handleReset = () => {
    const resetData = getResetData(localCheckboxData);
    setLocalCheckboxData(resetData);
    setOpen(false);
    onReset?.();
  };

  const handleClear = () => {
    const newData = getClearData(localCheckboxData);
    setLocalCheckboxData(newData);
    onClear?.();
  };

  return (
    <Popover
      floatingOptions={{
        onOpenChange,
        open: open,
      }}>
      <TableFilterTriggerWithNotification
        count={selectedGroupsCount}
        visible={isMoreButtonVisible}
      />
      <PopoverContent className="popover" css={tableFilterPopoverContentStyles}>
        <form
          onSubmit={handleSubmit}
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
          data-testid="table-filters-form">
          <PopoverDescription variant="body1">
            <AccordionGroupContextProvider>
              <AccordionGroup size="medium">
                {Object.keys(localCheckboxData).map((groupName) => {
                  const accordionInfo = localCheckboxData[groupName];
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
                            const extraProps: Partial<CheckboxProps> = {};
                            const currentState = !!localCheckboxData?.[
                              accordionInfo.id
                            ].selectedItemsDraft?.includes(info.name);
                            if (info.isDisabled) {
                              extraProps.initialState = currentState;
                            } else {
                              extraProps.externalState = currentState;
                            }
                            return (
                              <TableFilterCheckbox
                                key={info.key}
                                name={info.name}
                                id={info.key}
                                onChange={onCheckboxChange(
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
          <TableFiltersButtons onClear={handleClear} onCancel={handleReset} />
        </form>
      </PopoverContent>
    </Popover>
  );
};
