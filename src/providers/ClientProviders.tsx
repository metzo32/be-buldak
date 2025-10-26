"use client";

import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LocalizationProviders from "@/providers/LocalizationProviders";
import MUIThemeProvider from "@/providers/MUIThemeProvider";
import QueryProvider from "@/providers/QueryProvider";
import ModalProvider from "@/providers/ModalProvider";
import { Modal } from "antd";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <AntdRegistry> */}
      <MUIThemeProvider>
        <LocalizationProviders>
          <ModalProvider>
            <QueryProvider>
              {/* <Modal/> */}
              {children}
            </QueryProvider>
          </ModalProvider>
        </LocalizationProviders>
      </MUIThemeProvider>
      {/* </AntdRegistry> */}
    </>
  );
}
