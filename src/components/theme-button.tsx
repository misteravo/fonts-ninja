"use client";

import { Button } from "./button";
import { useTheme } from "../providers/theme-provider";

export function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return <Button onClick={toggleTheme}>Switch theme {theme}</Button>;
}
