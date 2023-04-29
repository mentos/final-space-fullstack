import "@/styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { useState } from "react";

const QUERY_RETRY_COUNT = 3;
const QUERY_CACHE_TTL = 15 * 60 * 1000;

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            keepPreviousData: true,
            refetchOnMount: false,
            retry: QUERY_RETRY_COUNT,
            staleTime: QUERY_CACHE_TTL,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}
