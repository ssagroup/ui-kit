import CardContent from '@components/CardContent';
import { RenderContentProps } from './types';
import { createContentStyles } from './styles';
import { useTheme } from '@emotion/react';

export const AccordionContent = ({
  isOpened,
  children,
  size = 'empty',
}: RenderContentProps & {
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  const styles = createContentStyles(theme, isOpened);
  return (
    <CardContent css={styles[size]} role="tabpanel">
      {children}
    </CardContent>
  );
};
