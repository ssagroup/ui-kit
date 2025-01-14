import { ReactNode } from 'react';
import { Bot } from '@fintech/types';

export interface ActionsProps {
  row: Pick<Bot, 'id' | 'isRunning' | 'isActionsDisabled'>;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children?: ReactNode;
  className?: string;
}
