"use client";

import "@/app/globals.css";
import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
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
    typography: {
      button: {
        fontFamily: "var(--font-sejong)",
        fontSize: "16px",
        [`@media (min-width:1200px)`]: { fontSize: "18px" },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          ".MuiButton-root": {
            fontFamily: "var(--font-kingsejong) !important",
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
