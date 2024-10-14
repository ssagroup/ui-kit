import React, { useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { Liquidation, Trade } from '@icons';
import { ActionRun } from '@trading/components';
import { ActionsProps } from './types';

export const BotsActionRun = ({
  row,
  className,
}: ActionsProps & {
  className?: string;
}) => {
  const { isRunning } = row;
  const ActionIcon = isRunning ? Trade : Liquidation;
  const { resetField } = useForm<FieldValues>();

  useEffect(() => {
    return () => {
      resetField('reason');
    };
  }, []);

  return (
    <ActionRun
      className={className}
      row={row}
      startIcon={
        <div
          data-state={isRunning ? 'trade' : 'liquidation'}
          data-testid="bot-action-icon">
          <ActionIcon />
        </div>
      }
    />
  );
};
