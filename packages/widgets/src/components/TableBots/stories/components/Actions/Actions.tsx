import { SyntheticEvent } from 'react';
import { Wrapper } from '@ssa-ui-kit/core';
import { TableBotItem } from '@components/TableBots/types';
import { ActionButton } from './ActionButton';
import { actionsIcons } from './consts';
import { ActionMore } from './ActionMore';

export const Actions = ({ row }: { row: TableBotItem }) => {
  const { status, isDisabled } = row;
  const ActionIcon = actionsIcons[status];
  const actionIconHandler = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    alert('action...');
  };
  return (
    <Wrapper>
      <ActionButton
        onClick={isDisabled ? undefined : actionIconHandler}
        isDisabled={isDisabled}>
        <ActionIcon />
      </ActionButton>
      <ActionMore row={row} />
    </Wrapper>
  );
};
