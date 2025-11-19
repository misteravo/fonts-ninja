"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type ThemeValue = "light" | "dark";

const ThemeContext = createContext<{
  theme: ThemeValue;
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeValue>("light");

  useEffect(() => {
    const theme = getTheme();
    applyThemeClass(theme);
    setTheme(theme);
  }, []);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    applyThemeClass(newTheme);
    Cookies.set("theme", newTheme, { expires: 365 });
    setTheme(newTheme);
  }

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

function getTheme() {
  const cookieTheme = Cookies.get("theme");
  if (cookieTheme && ["light", "dark"].includes(cookieTheme as ThemeValue))
    return cookieTheme as ThemeValue;
  return prefersDark() ? "dark" : "light";
}

function applyThemeClass(theme: ThemeValue) {
  if (theme === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
}

function prefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
