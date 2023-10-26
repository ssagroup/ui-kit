import { MouseEventHandler, useState } from 'react';
import { useTheme } from '@emotion/react';
import {
  Icon,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTrigger,
} from '@ssa-ui-kit/core';
import { NoControlOrdersItem } from '@components/TableBots/types';
import { ActionItem } from '../../TableBots/components/Actions/ActionItem';
import { ActionsWrapper } from '../../TableBots/components/Actions//ActionsWrapper';
import { ActionIcon } from '../../TableBots/components/Actions/ActionIcon';

export const ActionMore = ({
  row: { isDisabled },
}: {
  row: NoControlOrdersItem;
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const actionMoreHandler: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
  };
  const actionHandler =
    (actionName: string): MouseEventHandler<HTMLElement> =>
    (event) => {
      event.stopPropagation();
      alert(`action ${actionName}`);
    };

  return (
    <Popover
      floatingOptions={{
        onOpenChange,
        open,
      }}
      placement="top-start">
      <PopoverTrigger
        variant="custom"
        isDisabled={isDisabled}
        css={{
          borderLeft: '1px solid #eaecf0',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          cursor: isDisabled ? 'default' : 'pointer',
          background: 'unset',
          borderRadius: '0',
        }}
        startIcon={
          <Icon
            name="more-vertical"
            size={15}
            color={theme.colors.greyDropdownFocused}
          />
        }
        onClick={actionMoreHandler}
      />
      <PopoverContent>
        <PopoverDescription>
          <ActionsWrapper
            css={{
              width: 160,
            }}>
            <ActionItem
              startIcon={<ActionIcon name="invisible" />}
              onClick={actionHandler('liquidate')}>
              Liquidate
            </ActionItem>
            <ActionItem
              startIcon={<ActionIcon name="change" />}
              onClick={actionHandler('changePrice')}>
              Change Price
            </ActionItem>
            <ActionItem
              startIcon={<ActionIcon name="cross" />}
              onClick={actionHandler('cancel')}>
              Cancel
            </ActionItem>
            <ActionItem
              startIcon={<ActionIcon name="bin" />}
              onClick={actionHandler('deleteFromList')}>
              Delete from list
            </ActionItem>
          </ActionsWrapper>
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
};
