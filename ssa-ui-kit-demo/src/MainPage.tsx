import { useTheme } from '@emotion/react';
import { Badge } from '@ssa-ui-kit/core';

export const MainPage = () => {
  const theme = useTheme();
  return (
    <Badge color={theme.colors.red} size='medium'>Test badge</Badge>  
  )
}