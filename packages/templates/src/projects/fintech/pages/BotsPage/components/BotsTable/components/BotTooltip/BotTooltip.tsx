import { useTheme } from '@emotion/react';
import { Typography } from '@ssa-ui-kit/core';
import { useTranslation } from '@contexts';
import { LongText } from '@fintech/components';
import { transformBotTooltipDate } from './helpers';
import * as S from './styles';

export const BotTooltip = ({
  trigger,
  timeStamp,
  text,
}: {
  trigger: React.ReactNode;
  timeStamp: string | null;
  text: string;
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const date = transformBotTooltipDate(timeStamp, t)
    ? transformBotTooltipDate(timeStamp, t)
    : t('pages.bots.table.notAvailable');

  return (
    <LongText
      text={trigger}
      longText={
        <Typography variant="body1" color={theme.colors.white} weight="medium">
          {text}
          <span css={S.Date}>{date}</span>
        </Typography>
      }
      overflow={'visible'}
    />
  );
};
