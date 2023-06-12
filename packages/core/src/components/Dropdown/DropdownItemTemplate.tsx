import { Fragment } from 'react';
import styled from '@emotion/styled';
import { ISmallTemplateProps, ILargeTemplateProps } from './types';

const ItemValue = styled.div``;

export const ItemBase = styled.div<{
  colors?: Array<string | undefined>;
  width?: string;
  maxWidth?: string;
  minWidth?: string;
}>`
  width: ${({ width }) => width};
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
  line-height: 18px;
  color: ${({ colors, theme }) => colors?.[0] || theme.colors.greyDarker};
  font-size: 13.33px;
  text-align: left;
  padding: 8px 14px 8px 14px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;

  ${ItemValue} {
    flex-grow: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: inherit;
  }
`;

export const ItemTemplateSmall = ({
  item: { val },
  colors,
  children,
}: ISmallTemplateProps) => {
  return (
    <ItemBase colors={colors} width="97px" maxWidth="97px">
      <ItemValue title={val}>{val}</ItemValue>
      {children}
    </ItemBase>
  );
};

export const ItemTemplateLarge = ({
  item: { val, extraVal },
  colors,
  children,
}: ILargeTemplateProps) => {
  return (
    <ItemBase colors={colors} width="164px" maxWidth="164px">
      <ItemValue title={`${val}${extraVal ? ` | ${extraVal}` : ''}`}>
        {val}
        {extraVal && (
          <Fragment>
            &nbsp;|&nbsp;
            <span
              css={(theme) => ({
                color: colors?.[1] || theme.colors.greyDarker60,
              })}>
              {extraVal}
            </span>
          </Fragment>
        )}
      </ItemValue>
      {children}
    </ItemBase>
  );
};
