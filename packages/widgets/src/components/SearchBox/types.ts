import { InputProps } from '@ssa-ui-kit/core/dist/components/Input/types';
import { UseFormReturn } from 'react-hook-form';

export type SearchBoxProps = InputProps &
  Pick<UseFormReturn, 'control' | 'resetField'> & {
    callback: (searchTerm: string) => void;
    callbackDelay?: number;
    autoSearchTrigger?: boolean;
  };
