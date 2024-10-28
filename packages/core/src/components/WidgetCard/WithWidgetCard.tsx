import { PieChartProps } from '@components/PieChart';
import { WidgetCard } from './WidgetCard';

export const WithWidgetCard = ({
  children,
  features = [],
  cardProps = {},
  width,
}: {
  children: React.ReactNode;
} & Pick<PieChartProps, 'features' | 'cardProps' | 'width'>) =>
  features && features.includes('header') ? (
    <WidgetCard {...cardProps} width={width}>
      {children}
    </WidgetCard>
  ) : (
    children
  );
