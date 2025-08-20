"use client";

import { ReactNode } from "react";
import LocalizationProviders from "@/providers/LocalizationProviders";
import MUIThemeProvider from "@/providers/MUIThemeProvider";
import QueryProvider from "@/providers/QueryProvider";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <MUIThemeProvider>
        <LocalizationProviders>
          <QueryProvider>{children}</QueryProvider>
        </LocalizationProviders>
      </MUIThemeProvider>
    </>
  );
}
