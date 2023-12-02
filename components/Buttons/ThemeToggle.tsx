import * as React from "react"
import { useTheme } from "next-themes"

import { Button, IconSetCache } from "@/components"

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <IconSetCache.Carbon.Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <IconSetCache.Carbon.Moon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
};
