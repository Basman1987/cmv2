"use client"
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useWallet } from "../../contexts/WalletContext"
import WalletConnection from "../../components/WalletConnection"
import WalletSecurityNotice from "../../components/WalletSecurityNotice"

export default function Royalties() {
  const { isConnected, ogRoyalties, arcaneRoyalties, fetchRoyaltiesData, claimRoyalties, getTransactionDetails } =
    useWallet()
  const [showSecurityNotice, setShowSecurityNotice] = useState(false)
  const [transactionDetails, setTransactionDetails] = useState({
    action: "",
    contractAddress: "",
    gasEstimate: "",
  })
  const [activeContractAddress, setActiveContractAddress] = useState("")
  const [activeNFTIds, setActiveNFTIds] = useState<number[]>([])
  const [activeCollection, setActiveCollection] = useState<"og" | "arcane">("og")

  const OG_CONTRACT_ADDRESS = "0x1f1b82B98Ea65bea0dd39811b80FdBDa9e2ABd84"
  const ARCANE_CONTRACT_ADDRESS = "0x1732008B974e970D094dc9b2810D2230Be3c90Bf"

  const RoyaltySection = ({
    title,
    data,
    contractAddress,
    collection,
    nftContractAddress,
  }: {
    title: string
    data: typeof ogRoyalties
    contractAddress: string
    collection: "og" | "arcane"
    nftContractAddress: string
  }) => {
    const [showAllNFTs, setShowAllNFTs] = useState(false)
    const displayedNFTs = showAllNFTs ? data.ownedNFTIds : data.ownedNFTIds.slice(0, 10)

    const handleClaimClick = async () => {
      // Get transaction details before showing security notice
      const details = await getTransactionDetails(contractAddress, `Claim ${data.token} Royalties`)

      setTransactionDetails({
        action: details.action,
        contractAddress: details.contractAddress || contractAddress,
        gasEstimate: details.gasEstimate || "Will be calculated by your wallet",
      })

      setActiveContractAddress(contractAddress)
      setActiveNFTIds([...data.ownedNFTIds]) // Make a copy of the NFT IDs
      setActiveCollection(collection)
      setShowSecurityNotice(true)
    }

    return (
      <div className="flex flex-col items-center">
        <Image
          src={
            title.includes("OG")
              ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cm-NQ6VcBHBnD1N7ioiked3m10otrkgYR.webp"
              : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cmac-y2xFRvqx6AR7PWvw88w3PwIZ2KxDC7.webp"
          }
          alt={title}
          width={300}
          height={300}
          className="rounded-lg shadow-lg object-cover"
        />
        <p className="mt-4 text-center font-semibold">{title}</p>
        {data.error && <p className="text-red-500 mt-2">{data.error}</p>}
        {data.successMessage && <p className="text-green-500 mt-2">{data.successMessage}</p>}
        {isConnected && (
          <div className="mt-4 text-left">
            <p>
              Total {data.token} royalties distributed: {data.totalDistributed}
            </p>
            <p>
              Your claimable {data.token} Royalties: {data.claimableRoyalties}
            </p>
            <p>
              Your owned NFT IDs:
              {displayedNFTs.length > 0 ? displayedNFTs.join(", ") : "None"}
              {data.ownedNFTIds.length > 10 && (
                <button
                  onClick={() => setShowAllNFTs(!showAllNFTs)}
                  className="ml-2 text-blue-500 hover:text-blue-700 underline"
                >
                  {showAllNFTs ? "Show less" : "Show more..."}
                </button>
              )}
            </p>
          </div>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchRoyaltiesData}
          disabled={data.isLoading || !isConnected}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-base md:text-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300"
        >
          {data.isLoading ? "Fetching Data..." : "Refresh Data"}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClaimClick}
          disabled={data.isLoading || !isConnected || data.ownedNFTIds.length === 0}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-green-500 text-white rounded-full text-base md:text-lg font-semibold hover:from-pink-600 hover:to-green-600 transition duration-300"
        >
          {data.isLoading ? "Processing Transaction..." : "Claim Royalties"}
        </motion.button>
      </div>
    )
  }

  const handleProceedWithClaim = async () => {
    setShowSecurityNotice(false)

    if (activeContractAddress && activeNFTIds.length > 0) {
      try {
        // Directly call the claimRoyalties function with the correct parameters
        if (activeCollection === "og") {
          await claimRoyalties(activeContractAddress, activeNFTIds, (state) => ({
            ...state,
            isLoading: true,
            error: null,
            successMessage: null,
          }))
        } else {
          await claimRoyalties(activeContractAddress, activeNFTIds, (state) => ({
            ...state,
            isLoading: true,
            error: null,
            successMessage: null,
          }))
        }

        // Refresh data after claiming
        setTimeout(() => {
          fetchRoyaltiesData()
        }, 2000)
      } catch (error) {
        console.error("Error claiming royalties:", error)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 pt-20 pb-20">
      <h1 className="text-4xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
        Royalties
      </h1>
      {isConnected ? (
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 mb-12 w-full max-w-4xl mx-auto">
          <RoyaltySection
            title="Royalties Crazzzy Monsters OG"
            data={ogRoyalties}
            contractAddress={OG_CONTRACT_ADDRESS}
            collection="og"
            nftContractAddress="0x8f2836874DC85B81C2CF0421aF593E6E8d5DffA1"
          />
          <RoyaltySection
            title="Royalties Crazzzy Monsters Arcane Creatures"
            data={arcaneRoyalties}
            contractAddress={ARCANE_CONTRACT_ADDRESS}
            collection="arcane"
            nftContractAddress="0xc73E9b57f8678C1dd20879fc19369BBC15c62Df3"
          />
        </div>
      ) : (
        <div className="text-center max-w-md mx-auto">
          <p className="text-xl mb-4">Please connect your wallet to view royalties data.</p>
          <WalletConnection />
        </div>
      )}

      <WalletSecurityNotice
        isOpen={showSecurityNotice}
        onClose={() => setShowSecurityNotice(false)}
        onProceed={handleProceedWithClaim}
        type="transaction"
        transactionDetails={transactionDetails}
        isFromRoyaltiesPage={true}
      />
    </div>
  )
}

