import { useEffect, useState } from "react";

/**
 * 검색 시 검색키워드에 대한 keyup 이벤트 Delay처리
 * @param {*} value
 * @param {*} delay
 * @returns
 */
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
