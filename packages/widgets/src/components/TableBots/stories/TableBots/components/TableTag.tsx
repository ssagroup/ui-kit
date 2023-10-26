import { Tag } from '@ssa-ui-kit/core';

export const TableTag = ({
  children,
  color,
}: {
  children: string;
  color: string;
}) => (
  <Tag
    color={color}
    extraCSS={{
      borderRadius: 25,
      border: 'none',
      boxShadow: 'none',
      height: 22,
      padding: '1px 12px',
      fontSize: 14,
    }}>
    {children}
  </Tag>
);
