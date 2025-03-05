import { useState } from 'react';

interface UseUncontrolledInput<T, P extends unknown[]> {
  value?: T;
  defaultValue?: T;
  finalValue?: T;
  onChange?: (value: T, ...payload: P) => void;
}

export function useUncontrolled<T, P extends unknown[]>({
  value,
  defaultValue,
  finalValue,
  onChange = () => {},
}: UseUncontrolledInput<T, P>): [
  T,
  (value: T, ...payload: P) => void,
  boolean,
] {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue !== undefined ? defaultValue : finalValue,
  );

  const handleUncontrolledChange = (val: T, ...payload: P) => {
    setUncontrolledValue(val);
    onChange?.(val, ...payload);
  };

  if (value !== undefined) {
    return [value as T, onChange, true];
  }

  return [uncontrolledValue as T, handleUncontrolledChange, false];
}
