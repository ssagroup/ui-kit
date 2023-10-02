import {
  BaseSyntheticEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { PathValue, assocPath, dissocPath, path } from '@ssa-ui-kit/utils';
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

export const TableFilters = ({
  handleCancel,
  handleSubmit,
  handleClear,
  initialState = {} as CheckboxData,
  data,
}: TableFiltersView) => {
  const [checkboxData, setCheckboxData] = useState(initialState);
  const [persistentData, setPersistentData] = useState({});
  const [selectedGroupsCount, setSelectedGroupsCount] = useState(0);
  useLayoutEffect(() => {
    let counter = 0;
    Object.keys(checkboxData).forEach((groupName) => {
      const currentItems = checkboxData[groupName];
      let elementChecked = false;
      Object.keys(currentItems).forEach((itemName) => {
        const currentValue = currentItems[itemName];
        if (elementChecked) {
          return;
        }
        if (currentValue) {
          elementChecked = true;
          counter++;
        }
      });
    });
    setSelectedGroupsCount(counter);
  }, [checkboxData]);
  useEffect(() => {
    let notChangedData = {} as CheckboxData;
    data.forEach((groupInfo) => {
      groupInfo.items.forEach((itemInfo) => {
        const initialStateValue = path(itemInfo.content.statePath)(
          initialState,
        );
        if (itemInfo.isDisabled && initialStateValue !== undefined) {
          notChangedData = assocPath<CheckboxData>(
            itemInfo.content.statePath,
            initialStateValue as PathValue,
          )(notChangedData);
        }
      });
    });
    setPersistentData(notChangedData);
  }, [data]);
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
    handleCancel?.();
  };
  const onClear = () => {
    setCheckboxData(persistentData);
    handleClear?.();
  };
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
