import { useEffect, useMemo, useState } from 'react';
import { useWindowSize } from '@ssa-ui-kit/hooks';
import { TableFilterConfig } from '@components/TableFilters/types';
import { ElementInfo } from '../types';

export type RefsByKey = Record<string, ElementInfo>;
type UseVisibilityParams = {
  checkboxData: TableFilterConfig;
  refsList: Array<React.MutableRefObject<HTMLElement | null>>;
  wrapperRef?: React.RefObject<HTMLElement>;
  onVisibilityProcessed?: () => void;
};

export const useVisibility = ({
  checkboxData,
  wrapperRef,
  refsList,
  onVisibilityProcessed,
}: UseVisibilityParams) => {
  const [visibilities, setVisibilities] = useState<boolean[]>(
    Object.keys(checkboxData).map(() => false),
  );
  const handleIntersection = () => {
    if (wrapperRef && wrapperRef.current) {
      processVisibility();
    }
  };

  const observer = useMemo(
    () =>
      wrapperRef === null
        ? null
        : new IntersectionObserver(handleIntersection, {
            root: wrapperRef?.current,
            rootMargin: '0px',
            threshold: 1,
          }),
    [wrapperRef?.current, refsList],
  );

  useEffect(() => {
    return () => {
      if (observer !== null) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (refsList.length === Object.keys(checkboxData).length) {
      refsList.forEach((currentRef) => {
        if (currentRef.current && observer !== null) {
          observer.observe(currentRef.current);
        }
      });
    }
    return () => {
      refsList.forEach((currentRef) => {
        if (currentRef.current && observer !== null) {
          observer.unobserve(currentRef.current);
        }
      });
    };
  }, [refsList, observer]);

  const windowSize = useWindowSize();

  const processVisibility = () => {
    const newVisibilities: boolean[] = [];
    refsList.forEach((currentRef) => {
      if (currentRef.current && wrapperRef?.current) {
        const visibility =
          currentRef.current?.offsetLeft >= wrapperRef?.current.offsetLeft;
        newVisibilities.push(visibility);
        currentRef.current.style.visibility = visibility ? 'visible' : 'hidden';
      }
    });
    setVisibilities(newVisibilities);
  };

  const memoVisibilities = useMemo(() => {
    return visibilities;
  }, [JSON.stringify(visibilities)]);

  useEffect(() => {
    onVisibilityProcessed?.();
  }, [memoVisibilities]);

  useEffect(() => {
    if (
      refsList.length > 0 &&
      refsList.length === Object.keys(checkboxData).length
    ) {
      processVisibility();
    }
  }, [windowSize.width]);

  return {
    processVisibility,
  };
};
