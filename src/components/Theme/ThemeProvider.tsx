"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import { themes } from "../../utils/customVariables";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemeProvider
      themes={themes}
      attribute="class"
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
