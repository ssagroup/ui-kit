import CardContent from '@components/CardContent';
import { RenderContentProps } from './types';
import { createContentStyles } from './styles';
import { useTheme } from '@emotion/react';

const AccordionContent = ({
  isActive,
  children,
  variant = 'empty',
}: RenderContentProps & {
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  const styles = createContentStyles(theme, isActive);
  return (
    <CardContent css={styles[variant]} role="tabpanel">
      {children}
    </CardContent>
  );
};

export default AccordionContent;
