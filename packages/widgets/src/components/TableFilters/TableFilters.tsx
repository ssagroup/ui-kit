import {
  BaseSyntheticEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { assocPath, pathOr } from '@ssa-ui-kit/utils';
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
import { CheckboxData, TableFilterConfig, TableFiltersView } from './types';

// TODO: combine handlers with useTableData?..
export const TableFilters = ({
  checkboxData = {} as TableFilterConfig,
  onReset,
  onSubmit,
  onClear,
  handleCheckboxToggle,
}: TableFiltersView) => {
  const [localCheckboxData, setLocalCheckboxData] =
    useState<TableFilterConfig>(checkboxData);
  // TODO: Do we need this state? We use persistentData only once
  const [persistentData, setPersistentData] = useState<CheckboxData>({});
  const [selectedGroupsCount, setSelectedGroupsCount] = useState(0);

  const [open, setOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  useEffect(() => {
    setLocalCheckboxData(checkboxData);
  }, [checkboxData]);

  useLayoutEffect(() => {
    const notChangedData: CheckboxData = {};
    let counter = 0;
    Object.keys(localCheckboxData).forEach((groupName) => {
      const selectedItemsDraft =
        localCheckboxData[groupName].selectedItemsDraft || [];
      const selectedItems = localCheckboxData[groupName].selectedItems;
      const currentItems = localCheckboxData[groupName].items;
      notChangedData[groupName] = [];
      Object.keys(currentItems).forEach((itemKey) => {
        const itemInfo = currentItems[itemKey];
        if (itemInfo.isDisabled && selectedItems.includes(itemInfo.name)) {
          notChangedData[groupName].push(itemInfo.name);
        }
      });
      if (selectedItemsDraft.length > 0) {
        counter++;
      }
    });
    setPersistentData(notChangedData);
    setSelectedGroupsCount(counter);

    if (Object.keys(localCheckboxData).length === 0) {
      setOpen(false);
    }
  }, [localCheckboxData]);

  const onCheckboxChange = (groupName: string, name: string) => () => {
    const draftPath = [groupName, 'selectedItemsDraft'];
    const selectedItemsDraft = pathOr<TableFilterConfig, string[]>(
      [],
      draftPath,
    )(localCheckboxData);
    const newSelectedItems = selectedItemsDraft.includes(name)
      ? selectedItemsDraft.filter((currentItemName) => currentItemName !== name)
      : [...selectedItemsDraft, name];
    setLocalCheckboxData(assocPath(draftPath, newSelectedItems));
    handleCheckboxToggle?.(groupName, name);
  };

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    let newData = JSON.parse(JSON.stringify(localCheckboxData));
    const submitData: Record<string, string[]> = {};
    Object.keys(newData).forEach((groupName) => {
      newData = assocPath(
        [groupName, 'selectedItems'],
        newData[groupName]['selectedItemsDraft'],
      )(newData);
      submitData[groupName] = newData[groupName]['selectedItemsDraft'];
    });
    setLocalCheckboxData(newData);
    onSubmit?.();
  };

  const handleReset = () => {
    let newData = JSON.parse(JSON.stringify(localCheckboxData));
    Object.keys(newData).forEach((groupName) => {
      newData = assocPath(
        [groupName, 'selectedItemsDraft'],
        newData[groupName]['selectedItems'],
      )(newData);
    });
    setLocalCheckboxData(newData);
    onReset?.();
  };

  const handleClear = () => {
    let newData = JSON.parse(JSON.stringify(localCheckboxData));
    Object.keys(persistentData).forEach((groupName) => {
      newData = assocPath(
        [groupName, 'selectedItemsDraft'],
        persistentData[groupName],
      )(newData);
    });
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
        visible={!(Object.keys(localCheckboxData).length === 0)}>
        More
      </TableFilterTriggerWithNotification>
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
                            const extraProps: Partial<ICheckboxProps> = {};
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
