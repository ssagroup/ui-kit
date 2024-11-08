import { PieChartProps } from '@components/Charts/PieChart';
import { WidgetCard } from './WidgetCard';

export const WithWidgetCard = ({
  children,
  features = [],
  cardProps = {},
}: {
  children: React.ReactNode;
} & Pick<PieChartProps, 'features' | 'cardProps'>) =>
  features && features.includes('header') ? (
    <WidgetCard {...cardProps}>{children}</WidgetCard>
  ) : (
    children
  );
