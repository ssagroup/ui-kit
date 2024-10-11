import React, { MouseEventHandler, useState } from 'react';
import { useTheme } from '@emotion/react';
import {
  Icon,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTrigger,
} from '@ssa-ui-kit/core';
import { useTranslation } from '@contexts';
import { ActionItem } from './ActionItem';
import { ActionsWrapper } from './ActionsWrapper';
import { showSimpleToast } from '@/trading/utils';

export const ActionMore = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const isDisabled = false;

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };
  const actionMoreHandler: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
  };

  const actionCopyHandler: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    setOpen(false);
    showSimpleToast(t('toasts.copyService.progress'), {
      hideProgressBar: true,
    });
    setTimeout(() => {
      showSimpleToast(t('toasts.copyService.success'), { type: 'success' });
    }, 1000);
  };

  const actionRemoveHandler: MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation();
    setOpen(false);
    showSimpleToast(t('toasts.removeService.progress'), {
      hideProgressBar: true,
    });
    setTimeout(() => {
      showSimpleToast(t('toasts.removeService.success'), { type: 'success' });
    }, 1000);
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
          cursor: 'pointer',
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
              onClick={actionCopyHandler}>
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
              onClick={actionRemoveHandler}>
              {t('buttons.delete')}
            </ActionItem>
          </ActionsWrapper>
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
};
