import { withTheme } from '@emotion/react';
import { useTranslation } from '@contexts';
import { AllBotsBlockProps } from './types';
import { SmallText, LargeText } from './BotsText';

export const AllBotsBlock = withTheme(({ theme, all }: AllBotsBlockProps) => {
  const { t } = useTranslation();
  return (
    <div
      css={{
        borderRadius: 6,
        height: 20,
        width: '100%',
        backgroundColor: theme.colors.greyPopoverLight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        [theme.mediaQueries.md]: {
          marginTop: 11,
        },
        [theme.mediaQueries.lg]: {
          marginTop: 8,
        },
      }}>
      <SmallText
        as="span"
        css={{
          marginRight: 4,
        }}>
        {t('bots.all')}
      </SmallText>
      <LargeText as="span">{all}</LargeText>
    </div>
  );
});
