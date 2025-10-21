import { useTheme } from '@emotion/react';
import { Bot } from '@fintech/types';

import { Typography, Wrapper } from '@ssa-ui-kit/core';

import { useTranslation } from '@contexts';

export const BotVersionConfirmationContent = ({
  version,
  bot,
}: {
  version: string | number;
  bot?: Bot;
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Wrapper
      css={{
        gap: 10,
        padding: '25px 0',
        flexDirection: 'column',
        marginBottom: 16,
      }}>
      <Typography
        css={{
          fontSize: 16,
          lineHeight: 'normal',
          textAlign: 'center',
        }}>
        {t(
          'pages.bots.actions.updateToLatestVersion.confirmationModal.contentStart',
        ) +
          bot?.name +
          t(
            'pages.bots.actions.updateToLatestVersion.confirmationModal.contentMiddle',
          ) +
          version}
      </Typography>
      {bot?.isRunning && (
        <Typography
          css={{
            fontSize: 16,
            lineHeight: 'normal',
            textAlign: 'center',
            color: theme.colors.red,
          }}>
          {t(
            'pages.bots.actions.updateToLatestVersion.confirmationModal.warning',
          )}
        </Typography>
      )}
    </Wrapper>
  );
};
