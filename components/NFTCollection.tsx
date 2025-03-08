"use client"

import React from "react"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Image from "next/image"
import type { NFTMetadata } from "../utils/nftFetcher"
import { fetchNFTMetadata } from "../utils/nftFetcher"
import { ErrorBoundary } from "./ErrorBoundary"

interface NFTCollectionProps {
  title: string
  tokenIds: number[]
  isArcane?: boolean
}

function NFTCard({ nft, isArcane }: { nft: NFTMetadata; isArcane: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  // Add retryCount state for image loading
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3

  // Handle image load/error only once
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  // Update handleImageError to implement retry logic
  const handleImageError = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount((prev) => prev + 1)
      // Force image reload by adding timestamp to URL
      if (imageRef.current) {
        const currentSrc = imageRef.current.src
        if (currentSrc.includes("ipfs")) {
          imageRef.current.src = `${currentSrc}?retry=${Date.now()}`
        }
      }
    } else {
      setImageError(true)
    }
  }, [retryCount])

  // Reset states when NFT changes
  useEffect(() => {
    setRetryCount(0)
    setImageError(false)
    setImageLoaded(false)
  }, [nft])

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="aspect-square relative bg-gray-700">
        {!imageError ? (
          <div className="w-full h-full relative">
            {isArcane ? (
              <img
                ref={imageRef}
                src={nft.image || "/placeholder.svg"}
                alt={nft.name}
                className={`w-full h-full object-cover transition-opacity duration-200 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <Image
                src={nft.image || "/placeholder.svg"}
                alt={nft.name}
                fill
                className={`object-cover transition-opacity duration-200 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                unoptimized
                loading="lazy"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-red-500">Failed to load image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{nft.name}</h3>
        <p className="text-sm text-gray-400">ID: {nft.id}</p>
      </div>
    </div>
  )
}

// Memoize NFTCard to prevent unnecessary re-renders
const MemoizedNFTCard = React.memo(NFTCard)

function NFTCollectionContent({ title, tokenIds, isArcane }: NFTCollectionProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [nfts, setNfts] = useState<NFTMetadata[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const mountedRef = useRef(true)
  const abortControllerRef = useRef<AbortController | null>(null)

  const itemsPerPage = 6
  const totalPages = Math.ceil(tokenIds.length / itemsPerPage)

  // Memoize current token IDs to prevent unnecessary recalculations
  const currentTokenIds = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return tokenIds.slice(startIndex, endIndex)
  }, [currentPage, tokenIds])

  // Memoize load NFTs function
  const loadNFTs = useCallback(async () => {
    if (!currentTokenIds.length || !mountedRef.current) return

    // Cleanup previous fetch if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    setIsLoading(true)
    setNfts([]) // Clear current NFTs while loading

    try {
      const loadedNFTs: NFTMetadata[] = []
      for (const id of currentTokenIds) {
        if (!mountedRef.current) break

        const nft = await fetchNFTMetadata(id, isArcane)
        if (!mountedRef.current) break

        loadedNFTs.push(nft)
        setNfts((prev) => [...prev, nft]) // Update state progressively

        // Small delay between loads
        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted")
      } else {
        console.error("Error loading NFTs:", error)
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false)
        abortControllerRef.current = null
      }
    }
  }, [currentTokenIds, isArcane])

  // Load NFTs when page changes
  useEffect(() => {
    mountedRef.current = true
    loadNFTs()

    return () => {
      mountedRef.current = false
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [loadNFTs])

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (!isLoading) {
        setCurrentPage(newPage)
      }
    },
    [isLoading],
  )

  if (tokenIds.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-[300px] h-[200px] bg-gray-800 rounded-lg" />
        <p className="mt-4 text-center font-semibold">{title}</p>
        <p className="mt-2 text-center text-gray-400">No NFTs found in this collection</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
        {isLoading && nfts.length === 0
          ? // Loading skeletons
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <div key={`skeleton-${index}`} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="aspect-square bg-gray-700 animate-pulse" />
                <div className="p-4">
                  <div className="h-4 bg-gray-700 rounded animate-pulse mb-2" />
                  <div className="h-4 w-1/2 bg-gray-700 rounded animate-pulse" />
                </div>
              </div>
            ))
          : // Loaded NFTs
            nfts.map((nft) => <MemoizedNFTCard key={nft.id} nft={nft} isArcane={isArcane} />)}
      </div>

      {totalPages > 1 && (
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1 || isLoading}
            className="px-4 py-2 rounded-full bg-gray-800 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || isLoading}
            className="px-4 py-2 rounded-full bg-gray-800 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

// Wrap with ErrorBoundary
export default function NFTCollection(props: NFTCollectionProps) {
  return (
    <ErrorBoundary>
      <NFTCollectionContent {...props} />
    </ErrorBoundary>
  )
}

