"use client";

import { ThemeOption, themeOptions } from "@/src/types/global";
import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function useTheme() {
	const { theme, setTheme } = useNextTheme();
	const [currentTheme, setCurrentTheme] = useState<ThemeOption>(
		themeOptions.find((option) => option.value === theme) ?? themeOptions[0],
	);

	useEffect(() => {
		if (!currentTheme) return;
		setTheme(currentTheme.value);
	}, [currentTheme, setTheme]);

	return { currentTheme, setCurrentTheme };
}
