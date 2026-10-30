import { InputProps } from '@components/Input/types';
import { UseFormReturn } from 'react-hook-form';

/**
 * Props for the SearchBox component. Also accepts every `Input` prop
 * (`placeholder` defaults to `Search by name`); `name`, `register`, `control`
 * and `resetField` are required.
 */
export type SearchBoxProps = InputProps &
  Pick<UseFormReturn, 'control' | 'resetField'> & {
    /**
     * Called with the search term after typing pauses for `callbackDelay`, or
     * immediately on Enter. Clearing the field calls it with `''` (when
     * `autoSearchTrigger` is on). Enter before anything was typed passes
     * `undefined`. A consumer `onKeyUp` replaces the Enter handler.
     */
    callback: (searchTerm: string) => void;

    /**
     * Debounce delay in milliseconds before `callback` runs while typing.
     * @default 500
     */
    callbackDelay?: number;

    /**
     * Call `callback` as the user types (debounced). When false, only Enter
     * calls it.
     * @default true
     */
    autoSearchTrigger?: boolean;
  };
