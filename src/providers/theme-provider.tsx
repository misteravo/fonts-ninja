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

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    if (newTheme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    Cookies.set("theme", newTheme, { expires: 365 });
    setTheme(newTheme);
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

function prefersDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
