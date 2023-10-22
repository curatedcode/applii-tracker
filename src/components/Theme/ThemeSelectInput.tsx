"use client";

import { themeOptions } from "@/src/utils/customVariables";
import SelectInput from "../SelectInput";
import useTheme from "../Hooks/useTheme";
import { useEffect } from "react";
import { updateSetting } from "@/src/utils/db";

export default function ThemeSelectInput() {
  const { currentTheme, setCurrentTheme } = useTheme();

  useEffect(() => {
    if (!currentTheme) return;
    updateSetting({ name: "theme", value: currentTheme.value });
  }, [currentTheme]);

  return (
    <div className="flex w-fit items-center gap-2">
      <span>Theme:</span>
      <SelectInput
        options={themeOptions}
        selected={currentTheme ?? themeOptions[2]}
        onChange={setCurrentTheme}
      />
    </div>
  );
}
