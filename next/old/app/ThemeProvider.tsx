"use client";

import type React from "react";

import { ThemeProvider as NextThemeProvider } from "next-themes";

type Props = {
    children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
    return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
};
