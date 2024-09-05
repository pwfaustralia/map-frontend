import { useState, useEffect, useRef } from 'react';

const useDebounce = <T>(value: any, delay: number): { debouncedValue: T; destroy: () => void } => {
  const oldValue = useRef(value);
  const [debouncedValue, setDebouncedValue] = useState(value);

  const destroy = () => {
    setDebouncedValue(null);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      oldValue.current = value;
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, destroy };
};

export default useDebounce;
