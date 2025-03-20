'use client';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {PropsWithChildren, useRef} from "react";

const Providers = ({ children }: PropsWithChildren<{}>) => {
  const queryClient = useRef(new QueryClient()).current;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default Providers;
