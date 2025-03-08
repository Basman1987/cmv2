"use client"

import type React from "react"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ParallaxProvider } from "react-scroll-parallax"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ParallaxProvider>{children}</ParallaxProvider>
    </QueryClientProvider>
  )
}

