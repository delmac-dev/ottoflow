import type { Metadata } from "next";

import "./(styles)/globals.css";

import { ColorSchemeScript, mantineHtmlProps} from '@mantine/core';
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Ottoflow",
  description: "Design custom schedules, generate data with AI, and export them with ease — all in one clean workspace.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark"/>
      </head>
      <body className="antialiased bg-dark-100 dark:bg-dark-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
