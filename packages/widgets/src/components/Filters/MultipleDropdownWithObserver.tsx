import React, { ReactNode } from 'react';
import { MultipleDropdown } from '@ssa-ui-kit/core';
import { IDropdownProps } from '@ssa-ui-kit/core/dist/components/MultipleDropdown/types';
import { IDropdownOption } from '@ssa-ui-kit/core/dist/components/MultipleDropdownOptions';
import { withIntersectionObserver } from './hocs/withIntersectionObserver';

interface WithIntersectionObserverProps {
  onIntersection: (props: {
    entries: IntersectionObserverEntry[];
    elementRef: React.RefObject<HTMLElement>;
  }) => void;
  wrapperRef?: React.MutableRefObject<HTMLElement | null>;
  children?: ReactNode;
}

export const MultipleDropdownWithObserver = withIntersectionObserver<
  IDropdownProps<IDropdownOption> & WithIntersectionObserverProps
>(MultipleDropdown);
