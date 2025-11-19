"use client";

import { Button } from "./button";
import { useTheme } from "../providers/theme-provider";

export function ThemeButton() {
  const { toggleTheme } = useTheme();
  return <Button onClick={toggleTheme}>Switch theme</Button>;
}
