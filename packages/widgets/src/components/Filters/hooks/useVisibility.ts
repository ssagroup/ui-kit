import { createRef, useEffect, useRef, useState } from 'react';
import { ElementInfo } from '../types';
import { TableFilterConfig } from '@components/TableFilters/types';
import { useWindowSize } from '@ssa-ui-kit/hooks';

export type RefsByKey = Record<string, ElementInfo>;

// TODO: unit test
export const useVisibility = (
  checkboxData: TableFilterConfig,
  wrapperRef?: React.RefObject<HTMLElement>,
) => {
  const [refsByKey, setRefsByKey] = useState<
    Record<string, React.MutableRefObject<HTMLElement | null>>
  >({});

  const getRefs = () =>
    Object.keys(checkboxData).reduce(
      (res: Record<string, ElementInfo>, groupName) => {
        res[groupName] = {
          name: groupName,
          visibility: false,
          element: createRef<HTMLElement>(),
        };
        if (Object.keys(refsByKey).length > 0) {
          res[groupName].element.current = refsByKey[groupName].current;
        }
        return res;
      },
      {},
    );

  const setElementRef = (groupId: string, element: HTMLElement | null) => {
    if (element !== null && !Object.keys(refsByKey).includes(groupId)) {
      setRefsByKey((state) => {
        const newRef: React.MutableRefObject<HTMLElement | null> =
          createRef<HTMLElement>();
        newRef.current = element;
        return {
          ...state,
          [groupId]: newRef,
        };
      });
    }
  };

  const processVisibility = () => {
    for (const itemKey of Object.keys(checkboxData)) {
      const element = elementsRef.current[itemKey].element.current;
      if (element && wrapperRef?.current) {
        const visibility = element?.offsetLeft < wrapperRef?.current.offsetLeft;
        element.style.visibility = visibility ? 'hidden' : 'visible';
        elementsRef.current[itemKey].visibility = visibility;
      }
    }
  };

  const [refs, setRefs] = useState(getRefs());

  const elementsRef = useRef(refs);

  useEffect(() => {
    const newRefs = getRefs();
    setRefs(newRefs);
    elementsRef.current = newRefs;
  }, [checkboxData]);

  useEffect(() => {
    const groupsCount = Object.keys(checkboxData).length;
    if (
      groupsCount > 0 &&
      Object.keys(refsByKey).length === groupsCount &&
      Object.keys(elementsRef.current).length > 0
    ) {
      for (const groupId of Object.keys(refsByKey)) {
        elementsRef.current[groupId].element.current =
          refsByKey[groupId].current;
      }
    }
  }, [refsByKey, elementsRef]);

  const windowSize = useWindowSize();

  useEffect(() => {
    processVisibility();
  }, [windowSize.width]);

  return {
    elementsRef,
    setElementRef,
    processVisibility,
  };
};
