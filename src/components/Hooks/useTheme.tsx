"use client";

import { ThemeOption, themeOptions } from "@/src/utils/customVariables";
import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

export default function useTheme() {
  const { theme, setTheme } = useNextTheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(
    themeOptions.find((option) => option.value === theme) ?? themeOptions[0],
  );

  useEffect(() => {
    if (!currentTheme) return;
    setTheme(currentTheme.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme]);

  return { theme, currentTheme, setCurrentTheme };
}
