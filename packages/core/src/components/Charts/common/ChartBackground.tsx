import { useTheme } from '@emotion/react';

export const ChartBackground = () => {
  const theme = useTheme();
  return (
    <div
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: theme.colors.greyFocused,
        opacity: 0.8,
        zIndex: 1,
      }}
    />
  );
};
