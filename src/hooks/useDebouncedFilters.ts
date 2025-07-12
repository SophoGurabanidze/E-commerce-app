import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

export function useDebouncedFilter(
  value: string,
  onDebounce: (val: string) => void,
  delay = 500
) {
  const [localValue, setLocalValue] = useState(value);
  const [debounced] = useDebounce(localValue, delay);

  // ✅ Keep local in sync if parent resets externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // ✅ Call stable parent callback when debounce changes
  useEffect(() => {
    onDebounce(debounced);
  }, [debounced, onDebounce]);  

  return [localValue, setLocalValue] as const;
}
