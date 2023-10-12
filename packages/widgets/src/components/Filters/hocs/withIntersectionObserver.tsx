import React, { useEffect, useRef, ReactNode } from 'react';
import { useMergeRefs } from '@floating-ui/react';

interface WithIntersectionObserverProps {
  children?: ReactNode;
  wrapperRef?: React.MutableRefObject<HTMLElement | null>;
  onIntersection: (props: {
    entries: IntersectionObserverEntry[];
    elementRef: React.RefObject<HTMLElement>;
    wrapperRef?: React.RefObject<HTMLElement>;
  }) => void;
}

export const withIntersectionObserver = <
  P extends WithIntersectionObserverProps,
>(
  WrappedComponent: React.ComponentType<P>,
) =>
  React.forwardRef<
    HTMLElement,
    P & Pick<WithIntersectionObserverProps, 'onIntersection' | 'wrapperRef'>
  >(function withIntersectionObserver(props, ref) {
    const internalRef = useRef<HTMLElement>(null);
    const { wrapperRef, onIntersection } = props;

    useEffect(() => {
      const observer = new IntersectionObserver(handleIntersection, {
        root: wrapperRef?.current,
        rootMargin: '0px',
        threshold: 0.5,
      });

      if (internalRef.current) {
        observer.observe(internalRef.current);
      }

      return () => {
        if (internalRef.current) {
          observer.unobserve(internalRef.current);
        }
      };
    }, [wrapperRef?.current]);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      onIntersection({ entries, wrapperRef, elementRef: internalRef });
    };

    const mergedRef = useMergeRefs([internalRef, ref]);

    return <WrappedComponent {...props} ref={mergedRef} />;
  });
