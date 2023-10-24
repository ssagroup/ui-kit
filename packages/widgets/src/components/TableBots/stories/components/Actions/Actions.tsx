import { useTheme } from '@emotion/react';
import { Wrapper, Icon } from '@ssa-ui-kit/core';
import { TableBotItem } from '@components/TableBots/types';
import { actionsIcons } from './consts';
import { ActionButton } from './ActionButton';

export const Actions = ({ status }: Pick<TableBotItem, 'status'>) => {
  const theme = useTheme();
  const ActionIcon = actionsIcons[status];
  const actionIconHandler = () => {
    console.log('>>>action...');
  };
  return (
    <Wrapper>
      <ActionButton onClick={actionIconHandler}>
        <ActionIcon />
      </ActionButton>
      <ActionButton onClick={actionIconHandler}>
        <Icon
          name="more-vertical"
          size={15}
          color={theme.colors.greyDropdownFocused}
        />
      </ActionButton>
    </Wrapper>
  );
};
