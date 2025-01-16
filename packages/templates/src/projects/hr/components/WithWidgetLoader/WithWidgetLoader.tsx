import { useEffect, useState } from 'react';
import { useTranslation } from '@ssa-ui-kit/core';
import { Card, NoDataYet } from '..';

export const WithWidgetLoader = ({
  children,
  className,
  title,
  isFetching,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  isFetching: boolean;
}) => {
  const [isFirstFetching, setIsFirstFetching] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (isFirstFetching && !isFetching) {
      setIsFirstFetching(false);
    }
  }, [isFirstFetching, isFetching]);

  return isFirstFetching ? (
    <Card title={t(title)} className={className}>
      <NoDataYet />
    </Card>
  ) : (
    children
  );
};
