import { useTheme } from '@emotion/react';

export const ChartBackground = () => {
  const theme = useTheme();
  return (
    <div
      css={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.24,
        background: theme.colors.greyShadow24,
        filter: 'blur(5px)',
      }}
    />
  );
};
