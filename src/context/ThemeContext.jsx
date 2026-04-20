import { useState, useEffect, useRef } from "react";
import { ThemeContext } from "./themeContextObject";

export function ThemeProvider({ children }) {
  const transitionTimerRef = useRef(null);

  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-animating");

    setIsDark((prev) => !prev);

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }

    transitionTimerRef.current = window.setTimeout(() => {
      root.classList.remove("theme-animating");
    }, 420);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
