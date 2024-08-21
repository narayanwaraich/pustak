import { useState, useEffect } from "react";

export const useLocalStorage = (storageKey: string, fallbackState: unknown) => {
  const getItem = localStorage.getItem(storageKey);
  const [value, setValue] = useState(
    getItem ? JSON.parse(getItem) : fallbackState,
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};
