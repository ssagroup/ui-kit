import CardContent from '@components/CardContent';
import { RenderContentProps } from './types';
import { createContentStyles } from './styles';

const AccordionContent = ({
  isActive,
  children,
  variant = 'empty',
}: RenderContentProps & {
  children: React.ReactNode;
}) => {
  const styles = createContentStyles(isActive);
  return <CardContent css={styles[variant]}>{children}</CardContent>;
};

export default AccordionContent;
