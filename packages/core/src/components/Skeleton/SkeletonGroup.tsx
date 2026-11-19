import { forwardRef, useEffect, useRef } from 'react';

import { SkeletonContext, useSkeletonContext } from './SkeletonContext';
import { SkeletonGroupProps } from './types';
import * as S from './styles';

const DEFAULT_LABEL = 'Loading…';

/**
 * SkeletonGroup - Marks a region as loading and sets the look of every
 * skeleton inside it.
 *
 * ### Look
 * `animation` and `corners` apply to every `Skeleton` and skeleton layout in
 * the group, so a whole page skeleton is configured in one place. A value set
 * on a piece still wins.
 *
 * ### Accessibility
 * The region gets `aria-busy` and one visually hidden status message
 * (`label`), so a screen reader hears "Loading…" once rather than once per
 * piece. The message sits next to the busy region, not inside it, and is
 * written just after mount, since screen readers skip updates from inside a
 * busy region and often ignore a live region that appears already filled.
 * A group nested in another group only passes its settings down; the outer
 * group does the announcing. Remove the group when the content arrives.
 *
 * The group adds no layout of its own: it is a plain block, so lay its
 * children out with your own grid or flex container.
 *
 * @category Components
 * @subcategory Feedback
 * @example
 * ```tsx
 * {isLoading ? (
 *   <SkeletonGroup animation="pulse" label="Loading employees">
 *     <SkeletonText lines={2} />
 *     <SkeletonTable rows={8} columns={5} />
 *   </SkeletonGroup>
 * ) : (
 *   <EmployeesTable rows={rows} />
 * )}
 * ```
 */
export const SkeletonGroup = forwardRef<HTMLDivElement, SkeletonGroupProps>(
  function SkeletonGroup(
    { animation, corners, label = DEFAULT_LABEL, children, className, style },
    ref,
  ) {
    const parent = useSkeletonContext();
    const statusRef = useRef<HTMLSpanElement>(null);

    // The live region mounts empty and gets its text here, so assistive tech
    // registers it first and then hears the change.
    useEffect(() => {
      if (statusRef.current) statusRef.current.textContent = label;
    }, [label]);

    const value = {
      animation: animation ?? parent.animation,
      corners: corners ?? parent.corners,
      inGroup: true,
    };

    if (parent.inGroup) {
      return (
        <SkeletonContext.Provider value={value}>
          <div ref={ref} className={className} style={style}>
            {children}
          </div>
        </SkeletonContext.Provider>
      );
    }

    return (
      <SkeletonContext.Provider value={value}>
        <span ref={statusRef} role="status" css={S.visuallyHidden} />
        <div ref={ref} aria-busy="true" className={className} style={style}>
          {children}
        </div>
      </SkeletonContext.Provider>
    );
  },
);
