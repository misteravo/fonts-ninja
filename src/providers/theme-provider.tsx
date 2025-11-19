"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type ThemeValue = "default" | "light" | "dark";

const ThemeContext = createContext<{
  theme: ThemeValue;
  toggleTheme: () => void;
}>({
  theme: "default",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeValue>("default");

  useEffect(() => {
    const cookieTheme = Cookies.get("theme");
    if (cookieTheme) setTheme(cookieTheme as ThemeValue);
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

export const useTheme = () => useContext(ThemeContext);
