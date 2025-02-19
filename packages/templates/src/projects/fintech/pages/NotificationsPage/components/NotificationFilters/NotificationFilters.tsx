import { css } from '@emotion/react';
import {
  ButtonGroupItem,
  ButtonGroup,
  WithVisibleMD,
  WithVisibleSM,
} from '@ssa-ui-kit/core';
import { useHeader } from '@fintech/contexts';
import { isTruthy } from '@fintech/utils';

import { NotificationFiltersProps } from './types';
import { ALL_FILTER_ID, UNREAD_FILTER_ID } from './consts';

const buttonStyles = css`
  &:disabled {
    cursor: default;
  }
`;

const ButtonGroupSM = WithVisibleSM(
  ButtonGroup,
  css`
    margin-left: auto;
  `,
);
const ButtonGroupMD = WithVisibleMD(ButtonGroup);

export const NotificationFilters = ({
  allFilter,
  unreadFilter,
  selectedItemId,
  ...props
}: NotificationFiltersProps) => {
  const { renderHeaderContent } = useHeader();

  const items: ButtonGroupItem[] = [
    unreadFilter?.isShown
      ? {
          id: UNREAD_FILTER_ID,
          isDisabled: unreadFilter.isDisabled,
          text: unreadFilter.text,
        }
      : null,
    allFilter?.isShown
      ? {
          id: ALL_FILTER_ID,
          isDisabled: allFilter.isDisabled,
          text: allFilter.text,
        }
      : null,
  ].filter(isTruthy);

  const selectedItem =
    selectedItemId != null
      ? selectedItemId === UNREAD_FILTER_ID
        ? items[0]
        : items[1]
      : undefined;

  return (
    <>
      <ButtonGroupMD
        items={items}
        {...props}
        buttonStyles={buttonStyles}
        selectedItem={selectedItem}
      />
      {renderHeaderContent(
        <ButtonGroupSM
          items={items}
          {...props}
          buttonStyles={buttonStyles}
          selectedItem={selectedItem}
        />,
      )}
    </>
  );
};
