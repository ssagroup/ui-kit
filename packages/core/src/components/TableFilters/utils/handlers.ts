import { assocPath, pathOr } from '@ssa-ui-kit/utils';

import { TableFilterConfig } from '../types';

export const getSubmitData = (checkboxData: TableFilterConfig) => {
  let submitCheckboxData: TableFilterConfig = JSON.parse(
    JSON.stringify(checkboxData),
  );
  const dataForSubmit: Record<string, string[]> = {};
  Object.keys(submitCheckboxData).forEach((groupName) => {
    submitCheckboxData = assocPath<TableFilterConfig>(
      [groupName, 'selectedItems'],
      submitCheckboxData[groupName]['selectedItemsDraft'],
    )(submitCheckboxData);
    dataForSubmit[groupName] = submitCheckboxData[groupName][
      'selectedItemsDraft'
    ] as string[];
  });
  return {
    submitCheckboxData,
    dataForSubmit,
  };
};

export const getResetData = (checkboxData: TableFilterConfig) => {
  let newData: TableFilterConfig = JSON.parse(JSON.stringify(checkboxData));
  Object.keys(newData).forEach((groupName) => {
    newData = assocPath<TableFilterConfig>(
      [groupName, 'selectedItemsDraft'],
      newData[groupName]['selectedItems'],
    )(newData);
  });
  return newData;
};

export const getClearData = (checkboxData: TableFilterConfig) => {
  let newData: TableFilterConfig = JSON.parse(JSON.stringify(checkboxData));
  Object.keys(checkboxData).forEach((groupName) => {
    const notChangedData: string[] = [];
    const selectedItems = checkboxData[groupName].selectedItems;
    const currentItems = checkboxData[groupName].items;
    Object.keys(checkboxData[groupName].items).forEach((itemKey) => {
      const itemInfo = currentItems[itemKey];
      if (itemInfo.isDisabled && selectedItems.includes(itemInfo.name)) {
        notChangedData.push(itemInfo.name);
      }
    });
    newData = assocPath<TableFilterConfig>(
      [groupName, 'selectedItemsDraft'],
      notChangedData,
    )(newData);
  });
  return newData;
};

export const getCheckboxChangedItems = (
  checkboxData: TableFilterConfig,
  groupName: string,
  name: string | number,
) => {
  const draftPath = [groupName, 'selectedItemsDraft'];
  const selectedItemsDraft = pathOr<TableFilterConfig, string[]>(
    [],
    draftPath,
  )(checkboxData);
  const newSelectedItems = selectedItemsDraft.includes(`${name}`)
    ? selectedItemsDraft.filter((currentItemName) => currentItemName !== name)
    : [...selectedItemsDraft, name];

  return {
    items: newSelectedItems,
    path: draftPath,
  };
};
