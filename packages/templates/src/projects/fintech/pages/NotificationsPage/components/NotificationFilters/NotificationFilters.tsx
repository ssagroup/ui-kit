import { css } from '@emotion/react';
import {
  ButtonGroupItem,
  ButtonGroup,
  WithVisibleMD,
  WithVisibleSM,
} from '@ssa-ui-kit/core';
import { isNill } from '@ssa-ui-kit/utils';
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
          disabled: unreadFilter.isDisabled,
          text: unreadFilter.text,
        }
      : null,
    allFilter?.isShown
      ? {
          id: ALL_FILTER_ID,
          disabled: allFilter.isDisabled,
          text: allFilter.text,
        }
      : null,
  ].filter(isTruthy);

  // ButtonGroup matches on id, so hand it the id straight through. The previous
  // id → item mapping went via array index, which picked the wrong item
  // whenever `unreadFilter.isShown` was false and the array shifted up.
  const selectedItem = isNill(selectedItemId) ? undefined : selectedItemId;

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
