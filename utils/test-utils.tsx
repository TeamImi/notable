import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import {
  QueryClient,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import { createIndexedDBPersister } from "@thisday/services/indexed-db-storage";

const persister = createIndexedDBPersister();
const theme = createTheme({});

const createQueryClient = () => {
  // create a mock react query client with no retry delays
  return new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: 0,
      },
      mutations: {
        retryDelay: 0,
      },
    },
    logger: {
      log: () => null,
      warn: () => null,
      error: () => null,
    },
  });
};

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider
      client={createQueryClient()}
      //   persistOptions={{ persister }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
