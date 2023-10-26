import { MouseEventHandler, useState } from 'react';
import { useTheme } from '@emotion/react';
import {
  Icon,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTrigger,
} from '@ssa-ui-kit/core';
import { TableBotItem } from '@components/TableBots/types';
import { ActionItem } from './ActionItem';
import { ActionsWrapper } from './ActionsWrapper';

export const ActionMore = ({ row: { isDisabled } }: { row: TableBotItem }) => {
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
      setOpen(false);
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
          marginLeft: 10,
          padding: '0 10px',
          cursor: isDisabled ? 'default' : 'pointer',
          backgroundColor: 'unset',
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
          <ActionsWrapper>
            <ActionItem
              startIcon={
                <Icon
                  name="copy"
                  size={15}
                  color={theme.colors.greyFilterIcon}
                />
              }
              onClick={actionHandler('copy')}>
              Copy
            </ActionItem>
            <ActionItem
              startIcon={
                <Icon
                  name="archive"
                  size={15}
                  color={theme.colors.greyFilterIcon}
                />
              }
              onClick={actionHandler('archive')}>
              Archive
            </ActionItem>
          </ActionsWrapper>
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
};
