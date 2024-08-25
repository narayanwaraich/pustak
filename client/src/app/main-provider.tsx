// import { QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { MainErrorFallback } from '@/components/errors/main';
import { Spinner } from '@/components/ui/spinner';
import { queryClient, createIDBPersister } from '@/lib/react-query';

import { ChildrenProp } from '@/types/api';
const persister = createIDBPersister();

export const AppProvider = ({ children }: ChildrenProp) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        >
          <ReactQueryDevtools />
          {children}
        </PersistQueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
