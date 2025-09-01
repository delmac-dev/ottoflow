"use client";

import theme from "@/app/(styles)/theme";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <EdgeStoreProvider>
          <MantineProvider theme={theme} defaultColorScheme="dark">
            {children}
          </MantineProvider>
        </EdgeStoreProvider>
      </SessionProvider>
    </QueryClientProvider>
  )
}