import { useState } from "react";

/**
 * 로컬 스토리지 사용 Hook
 */
export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // next.js에서 SSR을 할 때 페이지를 처음 렌더링 하는 과정에서 window나 document객체가 존재하지 않음.
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // key로 로컬스토리지에서 가져오기
      const item = window.localStorage.getItem(key);
      // JSON -> 데이터 유형
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // state로 저장
      setStoredValue(valueToStore);
      // 로컬 스토리지로 저장
      if (typeof window !== "undefined") {
        // 객체나 배열과 같은 유형을 저장하려면 JSON 으로 인코딩 필요
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}
