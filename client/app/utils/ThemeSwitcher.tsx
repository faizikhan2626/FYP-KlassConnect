"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Ensure no hydration issues

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "dark" ? (
        <BiSun
          className="cursor-pointer"
          size={25}
          onClick={() => setTheme("light")} // Correct theme setting
        />
      ) : (
        <BiMoon
          className="cursor-pointer"
          size={25}
          onClick={() => setTheme("dark")} // Correct theme setting
        />
      )}
    </div>
  );
};
