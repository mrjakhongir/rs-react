import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? stored : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.log("failed to get search term");
    }
  }, [key, value]);

  const remove = () => {
    localStorage.removeItem(key);
    setValue(initialValue);
  };

  return { value, setValue, remove };
}
