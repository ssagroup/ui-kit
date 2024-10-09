import { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import {
  Icon,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTrigger,
} from '@ssa-ui-kit/core';
import { useTranslation } from '@contexts';
import { Bot } from '@trading/types';
import { ActionItem } from './ActionItem';
import { ActionsWrapper } from './ActionsWrapper';

export const ActionMore = ({ row }: { row: Bot }) => {
  const { isActionsDisabled, id: botId } = row;
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isDisabled = false;

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const actionMoreHandler: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
  };

  const actionHandler: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    navigate(`create-bot/basic?mode=copy&id=${botId}`);
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
        dataTestId="more-trigger-button"
        css={{
          marginLeft: 10,
          padding: '0 10px',
          cursor: isActionsDisabled || isDisabled ? 'default' : 'pointer',
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
              onClick={actionHandler}>
              {t('buttons.copy')}
            </ActionItem>
            <ActionItem
              startIcon={
                <Icon
                  name="bin"
                  size={15}
                  color={theme.colors.greyFilterIcon}
                />
              }
              onClick={actionHandler}>
              {t('buttons.delete')}
            </ActionItem>
          </ActionsWrapper>
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
};
