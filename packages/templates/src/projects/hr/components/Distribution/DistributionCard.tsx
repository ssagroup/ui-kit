import { ClassNames, useTheme } from '@emotion/react';

import { WidgetCard } from '../WidgetCard';

import { DistributionCardProps } from './types';

export const DistributionCard = ({
  children,
  title,
  ...props
}: DistributionCardProps) => {
  const theme = useTheme();
  return (
    <ClassNames>
      {({ css }) => (
        <WidgetCard
          title={title}
          css={{
            justifyContent: 'space-between',
          }}
          headerClassName={css({
            marginBottom: '0',
            [theme.mediaQueries.md]: {
              marginBottom: '10px',
            },
          })}
          contentClassName={css({
            maxWidth: 'initial',
          })}
          {...props}>
          {children}
        </WidgetCard>
      )}
    </ClassNames>
  );
};
