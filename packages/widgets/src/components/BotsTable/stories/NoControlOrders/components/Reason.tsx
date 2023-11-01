export const Reason = ({ children }: { children: string }) => (
  <div
    css={{
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      maxWidth: 100,
    }}>
    {children}
  </div>
);
