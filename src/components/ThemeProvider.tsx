"use client";

import { themes } from "@/src/types/global";
import { ThemeProvider as NextThemeProvider } from "next-themes";

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
