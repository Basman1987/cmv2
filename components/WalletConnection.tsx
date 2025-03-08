"use client"
import { useState } from "react"
import { useWallet } from "../contexts/WalletContext"
import WalletSecurityNotice from "./WalletSecurityNotice"
import { usePathname } from "next/navigation"

export default function WalletConnection() {
  const { isConnected, address, error, isLoading, connectWallet, disconnectWallet } = useWallet()
  const [showSecurityNotice, setShowSecurityNotice] = useState(false)
  const pathname = usePathname()

  // Check if we're on the royalties or NFT viewer page
  const isFromRoyaltiesPage = pathname?.includes("/royalties") || pathname?.includes("/nft-viewer")

  const handleWalletAction = () => {
    if (isConnected) {
      disconnectWallet()
    } else {
      setShowSecurityNotice(true)
    }
  }

  const handleSecurityNoticeClose = () => {
    setShowSecurityNotice(false)
  }

  const handleProceedWithConnection = () => {
    setShowSecurityNotice(false)
    connectWallet()
  }

  return (
    <>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        onClick={handleWalletAction}
        disabled={isLoading}
        className={`px-4 py-2 rounded-full text-sm font-semibold ${
          isConnected
            ? "bg-green-500 text-white"
            : "bg-gradient-to-r from-pink-500 to-green-500 text-white hover:from-pink-600 hover:to-green-600"
        } transition duration-300`}
      >
        {isLoading
          ? "Processing..."
          : isConnected
            ? `Disconnect: ${address.slice(0, 6)}...${address.slice(-4)}`
            : "Connect Wallet"}
      </button>

      <WalletSecurityNotice
        isOpen={showSecurityNotice}
        onClose={handleSecurityNoticeClose}
        onProceed={handleProceedWithConnection}
        type="connect"
        isFromRoyaltiesPage={isFromRoyaltiesPage}
      />
    </>
  )
}

