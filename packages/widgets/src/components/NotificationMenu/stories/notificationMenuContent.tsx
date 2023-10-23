import { css, useTheme } from '@emotion/react';
import { Button, Icon, Indicator } from '@ssa-ui-kit/core';
import { ChildrenWrapper, ResetBtnStyles } from '../styles';

interface CommonNotificationPops {
  onClick: () => void;
}

export const Trigger = () => {
  const theme = useTheme();
  return (
    <Indicator
      position="right"
      isVisible={true}
      text={
        <span
          css={{
            fontSize: 10,
            fontWeight: 600,
            color: '#fff',
            minWidth: '12px',
          }}>
          2
        </span>
      }
      background={`linear-gradient(90deg, ${theme.colors.yellow} 0%, ${theme.colors.yellowLighter} 100%)`}>
      <div css={{ padding: '0 5px' }}>
        <Icon name="notification" size={20} color={theme.colors.greyDarker} />
      </div>
    </Indicator>
  );
};

export const MarkAllReadButton = ({ onClick }: CommonNotificationPops) => {
  const theme = useTheme();
  return (
    <Button
      onClick={onClick}
      variant="tertiary"
      css={css`
        ${ResetBtnStyles}
        span {
          color: ${theme.colors.blueDark};
        }
      `}
      startIcon={
        <Icon name="check-circle" size={20} color={theme.colors.blueDark} />
      }
      text="Mark all as read"
    />
  );
};

export const NotificationCardButtons = () => {
  const theme = useTheme();
  return (
    <div css={ChildrenWrapper}>
      <Button
        size="small"
        variant="tertiary"
        text="Ignore"
        css={{
          border: `1px solid ${theme.colors.greyDropdownMain}`,
          fontWeight: '600',
          padding: '5px 21px',

          ['span']: {
            color: theme.colors.greyCancelClearButton,
          },
        }}
      />
      <Button
        size="small"
        variant="attention"
        text="Stop bot"
        css={{ padding: '5px 26px' }}
      />
    </div>
  );
};
