"use client"

import type React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ParallaxProvider } from "react-scroll-parallax"
import Header from "../components/Header"
import Footer from "../components/Footer"
import StarBackground from "../components/StarBackground"
import PlanetBackground from "../components/PlanetBackground"
import ScrollToTop from "../components/ScrollToTop"
import PromoPopup from "../components/PromoPopup"
import { WalletProvider } from "../contexts/WalletContext"
import "../styles/globals.css"

const queryClient = new QueryClient()

// Metadata for the site
const metadata = {
  metadataBase: new URL("https://your-domain.com"), // Replace with your actual domain when deployed
  title: "Crazzzy Monsters - NFT Collection on Cronos",
  description:
    "Explore the wild world of Crazzzy Monsters NFT collections on the Cronos blockchain. Featuring unique monster characters, exclusive rewards, and an engaging community.",
  openGraph: {
    title: "Crazzzy Monsters - NFT Collection on Cronos",
    description:
      "Explore the wild world of Crazzzy Monsters NFT collections on the Cronos blockchain. Featuring unique monster characters, exclusive rewards, and an engaging community.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cm-NQ6VcBHBnD1N7ioiked3m10otrkgYR.webp",
        width: 1200,
        height: 1200,
        alt: "Crazzzy Monsters NFT Collection",
      },
    ],
    type: "website",
    siteName: "Crazzzy Monsters",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crazzzy Monsters - NFT Collection on Cronos",
    description:
      "Explore the wild world of Crazzzy Monsters NFT collections on the Cronos blockchain. Join our community!",
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cm-NQ6VcBHBnD1N7ioiked3m10otrkgYR.webp"],
    creator: "@CrazzzyMonsters",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Favicon and app icons */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-32x32-8hym7pipFYWAyBVnVU9vaAebeQCoNb.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-16x16-lUpHQX3NSlGZyxUkdPhh9PwaKS0R9w.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-touch-icon-h2RrxRieoXPOxiZA806YpZTyjQaJXi.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/android-chrome-192x192-z9l3nYK2pWUu8VqM5iRg3d9NL2hWxH.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/android-chrome-512x512-UfHCTu1EPPkhzQlsdjeifzcH7mbHWy.png"
        />

        {/* Web app manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />

        {/* Twitter */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.images[0]} />
        <meta name="twitter:creator" content={metadata.twitter.creator} />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <ParallaxProvider>
            <WalletProvider>
              <div className="relative min-h-screen flex flex-col text-white overflow-hidden">
                <StarBackground />
                <PlanetBackground />
                <Header />
                <main className="relative z-10 pt-16 flex-grow">{children}</main>
                <Footer />
                <ScrollToTop />
                <PromoPopup />
              </div>
            </WalletProvider>
          </ParallaxProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}

import "./globals.css"



import './globals.css'