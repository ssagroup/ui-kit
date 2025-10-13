import { useTheme } from '@emotion/react';

import CardContent from '@components/CardContent';

import { createContentStyles } from './styles';
import { RenderContentProps } from './types';

export const AccordionContent = ({
  isOpened,
  children,
  size = 'empty',
  ...rest
}: RenderContentProps & {
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  const styles = createContentStyles(theme, isOpened);
  return (
    <CardContent css={styles[size]} {...rest}>
      {children}
    </CardContent>
  );
};
