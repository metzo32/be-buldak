"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";

export default function MUIThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#fe633c",
        contrastText: "#fff",
      },
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>
  );
}
