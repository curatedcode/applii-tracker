"use client";

import { useEffect, useState } from "react";

export default function usePrefersColorScheme() {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme:dark)");

    if (mediaQuery.matches) {
      setColorScheme("dark");
    } else {
      setColorScheme("light");
    }

    mediaQuery.addEventListener("change", (e) =>
      e.matches ? setColorScheme("dark") : setColorScheme("light"),
    );
  }, []);

  return { colorScheme, setColorScheme };
}
