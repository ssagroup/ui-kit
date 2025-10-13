import { UseFormReturn } from 'react-hook-form';

import { InputProps } from '@components/Input/types';

export type SearchBoxProps = InputProps &
  Pick<UseFormReturn, 'control' | 'resetField'> & {
    callback: (searchTerm: string) => void;
    callbackDelay?: number;
    autoSearchTrigger?: boolean;
  };
