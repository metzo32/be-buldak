"use client";

import { ReactNode } from "react";
import LocalizationProviders from "@/providers/LocalizationProviders";
import MUIThemeProvider from "@/providers/MUIThemeProvider";
import QueryProvider from "@/providers/QueryProvider";
import ModalProvider from "@/providers/ModalProvider";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <MUIThemeProvider>
        <LocalizationProviders>
          <ModalProvider>
            <QueryProvider>{children}</QueryProvider>
          </ModalProvider>
        </LocalizationProviders>
      </MUIThemeProvider>
    </>
  );
}
