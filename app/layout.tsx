import type { Metadata } from "next";

import "./globals.css";

import { ColorSchemeScript, MantineProvider, mantineHtmlProps} from '@mantine/core';
import theme from "./theme";

export const metadata: Metadata = {
  title: "Ottoflow",
  description: "Design custom schedules, generate data with AI, and export them with ease — all in one clean workspace.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className="antialiased bg-[var(--mantine-color-dark-9)]">
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
