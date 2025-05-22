import Tag from '@components/Tag';

export const TableTag = ({
  children,
  color,
}: {
  children: string;
  color: keyof MainColors;
}) => (
  <Tag
    color={color}
    css={{
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
