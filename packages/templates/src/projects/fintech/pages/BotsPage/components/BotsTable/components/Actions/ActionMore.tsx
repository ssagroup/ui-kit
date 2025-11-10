import { MouseEvent, MouseEventHandler, useState } from 'react';

import { useTheme } from '@emotion/react';

import {
  Icon,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTrigger,
} from '@ssa-ui-kit/core';

import { useTranslation } from '@contexts';
import { showSimpleToast } from '@/fintech/utils';

import { ActionItem } from './ActionItem';
import { ActionsWrapper } from './ActionsWrapper';

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

  const actionHandler =
    (translationKeyPrefix: string) => (event: MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      setOpen(false);
      showSimpleToast(t(`${translationKeyPrefix}.progress`), {
        hideProgressBar: true,
      });
      setTimeout(() => {
        showSimpleToast(t(`${translationKeyPrefix}.success`), {
          type: 'success',
        });
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
              onClick={actionHandler('toasts.copyService')}>
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
              onClick={actionHandler('toasts.removeService')}>
              {t('buttons.delete')}
            </ActionItem>
            <ActionItem
              startIcon={
                <Icon
                  name="archive"
                  size={15}
                  color={theme.colors.greyFilterIcon}
                />
              }
              onClick={actionHandler('toasts.archive')}>
              {t('buttons.archive')}
            </ActionItem>
          </ActionsWrapper>
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  );
};
