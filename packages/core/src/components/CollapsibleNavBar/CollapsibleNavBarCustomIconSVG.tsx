import React from 'react';

import styled from '@emotion/styled';

import { ClassnameArray } from '@ssa-ui-kit/utils';

import { useCollapsibleNavBarItemContext } from './CollapsibleNavBarItemContext';

interface CustomIconSVGProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const CustomIconSVGStyled = styled.svg`
  &.is-active > path,
  &:hover > path,
  &:not(.is-active):hover > path,
  &:not(.is-active).is-hover > path {
    fill: ${({ theme }) => theme.colors.white};
  }
`;

export const CollapsibleNavBarCustomIconSVG = ({
  className,
  css,
  children,
  ...rest
}: CustomIconSVGProps) => {
  const { isActive, isHover } = useCollapsibleNavBarItemContext();
  const classNames = new ClassnameArray();
  classNames.push('svg-icon');
  classNames.toggle('is-active', isActive);
  classNames.toggle('is-hover', isHover);
  if (className) {
    classNames.push(className);
  }
  return (
    <CustomIconSVGStyled className={classNames.join(' ')} css={css} {...rest}>
      {children}
    </CustomIconSVGStyled>
  );
};
