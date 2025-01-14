import { useTranslation } from '@contexts';
import { SmallText, LargeText } from './BotsText';
import { BotsCountContentProps } from './types';

export const BotsCountContent = ({ running = 0 }: BotsCountContentProps) => {
  const { t } = useTranslation();
  return (
    <div
      css={{
        textAlign: 'center',
      }}>
      <LargeText data-testid="bots-count-number">{running}</LargeText>
      <SmallText css={{ marginTop: '2px' }}>{t('bots.running')}</SmallText>
    </div>
  );
};
