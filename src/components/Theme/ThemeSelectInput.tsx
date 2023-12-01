"use client";

import { themeOptions } from "@/src/utils/customVariables";
import { updateSetting } from "@/src/utils/db";
import { useEffect } from "react";
import useTheme from "../Hooks/useTheme";
import SelectInput from "../SelectInput";

export default function ThemeSelectInput() {
  const { currentTheme, setCurrentTheme } = useTheme();

  useEffect(() => {
    if (!currentTheme) return;
    updateSetting({ name: "theme", value: currentTheme.value });
  }, [currentTheme]);

  return (
    <div className="flex items-center justify-between">
      <span>Theme:</span>
      <SelectInput
        options={themeOptions}
        selected={currentTheme ?? themeOptions[2]}
        setSelected={setCurrentTheme}
      />
    </div>
  );
}
