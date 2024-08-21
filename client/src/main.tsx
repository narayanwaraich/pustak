/*
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query.ts";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SelectedFolderProvider } from "./services/selectedFolder";
import { AuthProvider } from "./services/auth";
import { ThemeProvider } from "./components/theme-provider";
*/
import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './app';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
/* 
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SelectedFolderProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <App />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
        </AuthProvider>
      </SelectedFolderProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
 */
