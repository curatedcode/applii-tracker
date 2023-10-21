import { themeOptions } from "@/src/utils/customVariables";
import SelectInput from "../SelectInput";
import useTheme from "../Hooks/useTheme";

export default function ThemeSelectInput() {
  const { currentTheme, setCurrentTheme } = useTheme();

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
