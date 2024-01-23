'use client'

import * as React from "react"
import { useTheme } from "next-themes"

import { Select } from "@/components";

const themes = ['light', 'dark', 'black', 'blueish'] as const;
export type Theme = typeof themes[number];

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Select items={Array.from(themes)} value={theme} onChange={setTheme} />
  )
};
