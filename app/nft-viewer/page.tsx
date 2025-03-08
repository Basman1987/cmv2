"use client"

import { useState, useEffect } from "react"
import { useWallet } from "../../contexts/WalletContext"
import WalletConnection from "../../components/WalletConnection"
import NFTCollection from "../../components/NFTCollection"
import { fetchOwnedNFTs } from "../../utils/nftFetcher"
import { ethers } from "ethers"

const OG_CONTRACT_ADDRESS = "0x8f2836874DC85B81C2CF0421aF593E6E8d5DffA1"
const ARCANE_CONTRACT_ADDRESS = "0xc73E9b57f8678C1dd20879fc19369BBC15c62Df3"

export default function NFTViewer() {
  const { isConnected, address } = useWallet()
  const [ogNFTs, setOgNFTs] = useState<number[]>([])
  const [arcaneNFTs, setArcaneNFTs] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNFTs = async () => {
      if (!isConnected || !address) {
        setOgNFTs([])
        setArcaneNFTs([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
          const provider = new ethers.BrowserProvider(window.ethereum)

          // Fetch NFTs from both collections
          const [ogIds, arcaneIds] = await Promise.all([
            fetchOwnedNFTs(provider, OG_CONTRACT_ADDRESS, address),
            fetchOwnedNFTs(provider, ARCANE_CONTRACT_ADDRESS, address),
          ])

          setOgNFTs(ogIds)
          setArcaneNFTs(arcaneIds)
        }
      } catch (error) {
        console.error("Error fetching NFTs:", error)
        setError("Failed to fetch your NFTs. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchNFTs()
  }, [isConnected, address])

  // Update the container and layout for better mobile centering
  return (
    <div className="container mx-auto px-4 pt-20 pb-20">
      <h1 className="text-4xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
        NFT Viewer
      </h1>

      {error && <div className="text-red-500 text-center mb-8">{error}</div>}

      {!isConnected ? (
        <div className="text-center max-w-md mx-auto">
          <p className="text-xl mb-4">Please connect your wallet to view your NFTs.</p>
          <WalletConnection />
        </div>
      ) : isLoading ? (
        <div className="text-center">Loading your NFTs...</div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 mb-12 w-full max-w-5xl mx-auto">
          <NFTCollection title="Crazzzy Monsters OG" tokenIds={ogNFTs} isArcane={false} />
          <NFTCollection title="Crazzzy Monsters Arcane Creatures" tokenIds={arcaneNFTs} isArcane={true} />
        </div>
      )}
    </div>
  )
}

