import { InputProps } from '@components/Input/types';
import { UseFormReturn } from 'react-hook-form';

/**
 * Props for the SearchBox component
 *
 * A specialized search input component with debounced search callback, clear
 * functionality, and React Hook Form integration. Automatically triggers search
 * callbacks with configurable debounce delay and supports manual search via
 * Enter key.
 *
 * Features:
 * - Debounced search callbacks (reduces API calls)
 * - Clear button that appears when input has value
 * - Search icon when input is empty
 * - Enter key to trigger immediate search
 * - Auto-search trigger on input change (configurable)
 *
 * @example
 * ```tsx
 * const { control, register, resetField } = useForm();
 * <SearchBox
 *   name="search"
 *   placeholder="Search products..."
 *   control={control}
 *   register={register}
 *   resetField={resetField}
 *   callback={(term) => handleSearch(term)}
 *   callbackDelay={500}
 * />
 * ```
 *
 * @requires React Hook Form - Must be used within FormProvider context
 */
export type SearchBoxProps = InputProps &
  Pick<UseFormReturn, 'control' | 'resetField'> & {
    /**
     * Callback function called when search is triggered
     * Receives the current search term as parameter
     * Triggered either by debounced input changes or Enter key press
     */
    callback: (searchTerm: string) => void;

    /**
     * Debounce delay in milliseconds for search callback
     * Prevents excessive API calls while user is typing
     * @default 500
     */
    callbackDelay?: number;

    /**
     * Whether to automatically trigger search on input change
     * When false, search only triggers on Enter key press
     * @default true
     */
    autoSearchTrigger?: boolean;
  };
