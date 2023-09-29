import { TradingInfoCard } from '@components/TradingInfoCard';
import TradingScoreboardBase from './TradingScoreboardBase';
import { ITradingScoreboardProps } from './types';

const TradingScoreboard = ({
  items,
  onClick,
  renderCard,
  ...props
}: ITradingScoreboardProps) => {
  return (
    <div>
      <TradingScoreboardBase {...props} data-testid="score-board">
        {items.map((item, index) => {
          return (
            <div key={index}>
              {typeof renderCard === 'function' ? (
                renderCard(item, onClick)
              ) : (
                <TradingInfoCard
                  value={item.value}
                  unit={item.unit}
                  title={item.title}
                  icon={item.icon}
                  onClick={() => {
                    if (typeof onClick === 'function') {
                      onClick(item);
                    }
                  }}
                />
              )}
            </div>
          );
        })}
      </TradingScoreboardBase>
    </div>
  );
};

export default TradingScoreboard;
