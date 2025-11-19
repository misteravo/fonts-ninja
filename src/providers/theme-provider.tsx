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
    const cookieTheme = Cookies.get("theme");
    if (cookieTheme && ["light", "dark"].includes(cookieTheme))
      setTheme(cookieTheme as ThemeValue);
    else setTheme(prefersDark() ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    Cookies.set("theme", theme, { expires: 365 });
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

function prefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
