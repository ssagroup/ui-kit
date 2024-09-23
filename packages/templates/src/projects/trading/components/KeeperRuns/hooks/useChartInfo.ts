import { useEffect, useState } from 'react';
import { GraphsListItem } from '@trading/types';
import { useBarGroupGap } from '@trading/hooks';
import { useGraphs } from '@trading/contexts';
import { useAppLayout } from '@trading/pages/AppLayout/useAppLayoutContext';
import { getKeeperRuns } from '../helpers';

export const useChartInfo = ({
  dataOriginal,
}: {
  dataOriginal: GraphsListItem[];
}) => {
  const { tooltipRef } = useGraphs();
  const { isFullscreenMode } = useAppLayout();
  const barGroupGap = useBarGroupGap(dataOriginal);

  const [failures, setFailures] = useState<number[]>(() =>
    getKeeperRuns(dataOriginal, 'failures'),
  );

  const [serviceOperations, setServiceOperations] = useState<number[]>(() =>
    getKeeperRuns(dataOriginal, 'serviceOperations'),
  );

  useEffect(() => {
    tooltipRef.current?.style.setProperty('display', 'none');
  }, [isFullscreenMode]);

  useEffect(() => {
    setFailures(getKeeperRuns(dataOriginal, 'failures'));
    setServiceOperations(getKeeperRuns(dataOriginal, 'serviceOperations'));
  }, [dataOriginal]);

  return {
    barGroupGap,
    failures,
    serviceOperations,
  };
};
