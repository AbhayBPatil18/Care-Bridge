import { useEffect, useState } from "react";

export function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem("carebridge:theme") === "dark");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("carebridge:theme", dark ? "dark" : "light");
  }, [dark]);
  return { dark, toggleTheme: () => setDark((value) => !value) };
}
