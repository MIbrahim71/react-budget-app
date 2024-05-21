import { useState, useEffect } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    // Get value from local storage
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    // If defaultValue is a function
    if (typeof defaultValue === "function") return defaultValue();
    else return defaultValue;
  });

  // Update the local storage anytime key/value changes with JSON version of value
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
