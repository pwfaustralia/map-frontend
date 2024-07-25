import { useState, useEffect, useRef } from "react";

const useDebounce = <T>(value: any, delay: number): T => {
  const oldValue = useRef(value);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      oldValue.current = value;
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
