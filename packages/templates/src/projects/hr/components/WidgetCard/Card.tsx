import { ClassNames, useTheme } from '@emotion/react';

import { WidgetCardProps } from './types';
import { WidgetCard } from './WidgetCard';

type CardProps = Pick<
  WidgetCardProps,
  'link' | 'onClick' | 'children' | 'title'
> & {
  className?: string;
};

export const Card = ({ children, className, ...props }: CardProps) => {
  const theme = useTheme();
  return (
    <ClassNames>
      {({ css }) => (
        <WidgetCard
          className={className}
          contentClassName={css({
            display: 'flex',
            justifyContent: 'space-between',
            gap: '5px',
            height: '100%',
            [theme.mediaQueries.md]: {
              maxWidth: 'initial',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 'initial',
            },
          })}
          headerClassName={css({
            marginBottom: '5px',
            [theme.mediaQueries.md]: {
              marginBottom: '10px',
            },
          })}
          {...props}>
          {children}
        </WidgetCard>
      )}
    </ClassNames>
  );
};
