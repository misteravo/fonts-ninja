"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";

export type ThemeValue = undefined | "light" | "dark";

const ThemeContext = createContext<{
  theme: ThemeValue;
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = (props: {
  theme: ThemeValue;
  children: ReactNode;
}) => {
  const [theme, setTheme] = useState<ThemeValue>(props.theme);

  useEffect(() => {
    if (!theme) {
      const newTheme = prefersDark() ? "dark" : "light";
      applyThemeClass(newTheme);
      setTheme(newTheme);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    applyThemeClass(newTheme);
    Cookies.set("theme", newTheme, { expires: 365 });
    setTheme(newTheme);
  }

  return (
    <ThemeContext value={{ theme, toggleTheme }}>{props.children}</ThemeContext>
  );
};

function applyThemeClass(theme: ThemeValue) {
  if (theme === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
}

function prefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
