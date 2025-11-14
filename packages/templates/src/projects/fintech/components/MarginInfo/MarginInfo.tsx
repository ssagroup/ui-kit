import { ClassNames, useTheme } from '@emotion/react';
import { useTranslation } from '@contexts';
import {
  MarginInfo as MarginInfoWidget,
  MarginInfoProps,
} from '@ssa-ui-kit/widgets';
import { WithWidgetLoader } from '..';

export const MarginInfoWithLoader = ({
  isFetching,
  multiplier,
  ...props
}: MarginInfoProps & { isFetching: boolean; multiplier?: number }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const baseTitle = t('marginInfo.title');
  const title = multiplier ? `${baseTitle} (x${multiplier})` : baseTitle;

  return (
    <WithWidgetLoader
      title={'marginInfo.title'}
      css={{ gridArea: 'margin-info' }}
      isFetching={isFetching}>
      <ClassNames>
        {({ css }) => (
          <div css={css({ gridArea: 'margin-info' })}>
            <MarginInfoWidget
              {...props}
              title={title}
              headerClassName={css({
                marginBottom: 0,
                [theme.mediaQueries.md]: {
                  marginBottom: '0',
                },
              })}
            />
          </div>
        )}
      </ClassNames>
    </WithWidgetLoader>
  );
};
