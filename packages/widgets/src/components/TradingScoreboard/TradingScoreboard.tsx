import { TradingInfoCard } from '@components/TradingInfoCard';
import TradingScoreboardBase from './TradingScoreboardBase';
import { TradingScoreboardProps } from './types';

const TradingScoreboard = ({
  items,
  onClick,
  renderCard,
  ...props
}: TradingScoreboardProps) => {
  return (
    <div>
      <TradingScoreboardBase {...props}>
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
                  link={item.link}
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
