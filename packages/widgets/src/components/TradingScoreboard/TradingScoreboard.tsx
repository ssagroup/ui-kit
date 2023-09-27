import { TradingInfoCard } from '@components/TradingInfoCard';
import { ITradingScoreboardProps } from './types';
import TradingScoreboardBase from './TradingScoreboardBase';

const TradingScoreboard = ({ itemsPerRow, items }: ITradingScoreboardProps) => {
  return (
    <TradingScoreboardBase itemsPerRow={itemsPerRow}>
      {items.map((item: any, index: number) => {
        return (
          <TradingInfoCard
            key={index}
            value={item.value}
            unit={item.unit}
            title={item.title}
            icon={item.icon}
            onClick={() => console.log('object')}
          />
        );
      })}
    </TradingScoreboardBase>
  );
};

export default TradingScoreboard;
