"use client";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProviders({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Avoid hydration mismatch
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
