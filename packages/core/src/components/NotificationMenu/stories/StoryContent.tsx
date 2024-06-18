import { css, useTheme } from '@emotion/react';
import Button from '@components/Button';
import Icon from '@components/Icon';
import Indicator from '@components/Indicator';
import { ResetBtnStyles } from '../styles';

interface CommonNotificationPops {
  onClick: () => void;
}

export const Trigger = () => {
  const theme = useTheme();
  return (
    <Indicator
      position="right"
      isVisible
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
