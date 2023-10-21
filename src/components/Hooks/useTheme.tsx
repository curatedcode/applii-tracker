"use client";

import {
  ThemeOption,
  ThemesType,
  themeOptions,
} from "@/src/utils/customVariables";
import { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

export default function useTheme() {
  const { theme, setTheme } = useNextTheme();
  const [currentTheme, setCurrentTheme] = useState<ThemeOption | undefined>(
    theme
      ? themeOptions[themeOptions.findIndex((option) => option.value === theme)]
      : undefined,
  );

  useEffect(() => {
    if (!currentTheme) return;
    setTheme(currentTheme.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme]);

  return { theme, currentTheme, setCurrentTheme };
}
