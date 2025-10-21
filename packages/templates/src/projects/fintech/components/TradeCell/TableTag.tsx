import { useTheme } from '@emotion/react';

import { Tag } from '@ssa-ui-kit/core';

export const TableTag = ({
  children,
  fontColor,
  backgroundColor,
}: {
  children: string;
  fontColor: string;
  backgroundColor: string;
}) => {
  const theme = useTheme();
  return (
    <Tag
      color={fontColor}
      css={{
        borderRadius: 25,
        border: 'none',
        boxShadow: 'none',
        height: 22,
        padding: '1px 12px',
        fontSize: 12,
        color: fontColor,
        backgroundColor,
        lineHeight: '20px',
        [theme.mediaQueries.lg]: {
          fontSize: 14,
        },
      }}>
      {children}
    </Tag>
  );
};
