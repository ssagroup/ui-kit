import { CardList } from '@ssa-ui-kit/core';

import { ListGoalsCard } from './ListGoalsCard';
import { ListGoalsProps } from './types';

/**
 *
 * UI Component that uses CardList to render a list of goals
 */
export const ListGoals = ({ goals }: ListGoalsProps) => {
  return (
    <CardList
      title="Goals"
      items={goals}
      renderItem={(goal) => (
        <ListGoalsCard
          image={goal.image}
          title={goal.title}
          details={goal.details}
          progressProps={{
            currentValue: goal.completion,
            color: goal.color,
          }}
        />
      )}
    />
  );
};
