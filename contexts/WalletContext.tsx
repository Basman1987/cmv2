"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"
import OG_royalties_ABI from "../OG_royalties.json"

const CRONOS_CHAIN_ID = 25
const CRONOS_RPC_URL = "https://evm.cronos.org"
const OG_CONTRACT_ADDRESS = "0x1f1b82B98Ea65bea0dd39811b80FdBDa9e2ABd84"
const ARCANE_CONTRACT_ADDRESS = "0x1732008B974e970D094dc9b2810D2230Be3c90Bf"
const NFT_CONTRACT_ADDRESS = "0x8f2836874DC85B81C2CF0421aF593E6E8d5DffA1"
const ARCANE_NFT_CONTRACT_ADDRESS = "0xc73E9b57f8678C1dd20879fc19369BBC15c62Df3"

const NFT_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
]

interface RoyaltyData {
  totalDistributed: string
  claimableRoyalties: string
  ownedNFTIds: number[]
  isLoading: boolean
  error: string | null
  successMessage: string | null
  lastFetchTime: number
  cooldownTime: number
  token: string
}

interface TransactionDetails {
  action: string
  gasEstimate?: string
  contractAddress?: string
}

interface WalletContextType {
  isConnected: boolean
  address: string
  error: string | null
  isLoading: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  ogRoyalties: RoyaltyData
  arcaneRoyalties: RoyaltyData
  fetchRoyaltiesData: () => Promise<void>
  claimRoyalties: (
    contractAddress: string,
    ownedNFTIds: number[],
    setRoyaltyData: React.Dispatch<React.SetStateAction<RoyaltyData>>,
  ) => Promise<void>
  getTransactionDetails: (contractAddress: string, action: string) => Promise<TransactionDetails>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [ogRoyalties, setOgRoyalties] = useState<RoyaltyData>({
    totalDistributed: "0",
    claimableRoyalties: "0",
    ownedNFTIds: [],
    isLoading: false,
    error: null,
    successMessage: null,
    lastFetchTime: 0,
    cooldownTime: 0,
    token: "CRY",
  })
  const [arcaneRoyalties, setArcaneRoyalties] = useState<RoyaltyData>({
    totalDistributed: "0",
    claimableRoyalties: "0",
    ownedNFTIds: [],
    isLoading: false,
    error: null,
    successMessage: null,
    lastFetchTime: 0,
    cooldownTime: 0,
    token: "CRO",
  })

  const getProvider = useCallback(() => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      return new ethers.BrowserProvider(window.ethereum)
    }
    return null
  }, [])

  const getTransactionDetails = useCallback(
    async (contractAddress: string, action: string): Promise<TransactionDetails> => {
      const details: TransactionDetails = {
        action,
        contractAddress,
      }

      try {
        const provider = getProvider()
        if (provider) {
          // Get current gas price
          const feeData = await provider.getFeeData()
          if (feeData.gasPrice) {
            const gasPriceInGwei = ethers.formatUnits(feeData.gasPrice, "gwei")
            details.gasEstimate = `~${gasPriceInGwei} Gwei (varies by network conditions)`
          }
        }
      } catch (error) {
        console.error("Error estimating gas:", error)
      }

      return details
    },
    [getProvider],
  )

  const fetchOwnedNFTs = useCallback(async (signer: ethers.Signer, nftContractAddress: string) => {
    console.log("Fetching owned NFTs...")
    const nftContract = new ethers.Contract(nftContractAddress, NFT_ABI, signer)
    const address = await signer.getAddress()
    try {
      const balance = await nftContract.balanceOf(address)
      console.log(`NFT balance: ${balance}`)
      const ids = []
      for (let i = 0; i < balance; i++) {
        try {
          const id = await nftContract.tokenOfOwnerByIndex(address, i)
          ids.push(Number(id))
        } catch (error) {
          console.error(`Error fetching token at index ${i}:`, error)
          break
        }
      }
      console.log(`Owned NFT IDs: ${ids.join(", ")}`)
      return ids
    } catch (error) {
      console.error("Error fetching NFT balance:", error)
      if (error instanceof Error && error.message && error.message.includes("missing revert data")) {
        console.log("Contract might not support balanceOf or tokenOfOwnerByIndex. Assuming no owned NFTs.")
        return []
      }
      throw error
    }
  }, [])

  const fetchRoyaltiesData = useCallback(async () => {
    if (!isConnected) return

    const fetchData = async (
      contractAddress: string,
      setRoyaltyData: React.Dispatch<React.SetStateAction<RoyaltyData>>,
      nftContractAddress: string,
    ) => {
      console.log(`Fetching royalties data for contract: ${contractAddress}...`)
      setRoyaltyData((prev) => ({ ...prev, isLoading: true, error: null }))

      try {
        const provider = getProvider()
        if (!provider) {
          throw new Error("No provider available")
        }

        const network = await provider.getNetwork()
        if (network.chainId !== BigInt(CRONOS_CHAIN_ID)) {
          throw new Error("Please switch to the Cronos network")
        }

        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, OG_royalties_ABI, signer)

        const totalReleased = await contract.totalReleased()
        const ownedNFTs = await fetchOwnedNFTs(signer, nftContractAddress)

        let claimable = ethers.parseEther("0")
        if (ownedNFTs.length > 0) {
          try {
            claimable = await contract.mymultiPAYOUT(ownedNFTs)
          } catch (error) {
            console.error("Error fetching claimable royalties:", error)
          }
        }

        setRoyaltyData((prev) => ({
          ...prev,
          totalDistributed: ethers.formatEther(totalReleased),
          claimableRoyalties: ethers.formatEther(claimable),
          ownedNFTIds: ownedNFTs,
          isLoading: false,
          lastFetchTime: Date.now(),
          cooldownTime: 30000,
        }))
      } catch (error) {
        console.error("Error fetching royalties data:", error)
        setRoyaltyData((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : "Failed to fetch royalties data",
        }))
      }
    }

    await fetchData(OG_CONTRACT_ADDRESS, setOgRoyalties, NFT_CONTRACT_ADDRESS)
    await fetchData(ARCANE_CONTRACT_ADDRESS, setArcaneRoyalties, ARCANE_NFT_CONTRACT_ADDRESS)
  }, [isConnected, getProvider, fetchOwnedNFTs])

  const claimRoyalties = useCallback(
    async (
      contractAddress: string,
      ownedNFTIds: number[],
      setRoyaltyData: React.Dispatch<React.SetStateAction<RoyaltyData>>,
    ) => {
      setRoyaltyData((prev) => ({ ...prev, isLoading: true, error: null, successMessage: null }))
      try {
        const provider = getProvider()
        if (!provider) {
          throw new Error("No provider available")
        }

        const network = await provider.getNetwork()
        if (network.chainId !== BigInt(CRONOS_CHAIN_ID)) {
          throw new Error("Please switch to the Cronos network")
        }

        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, OG_royalties_ABI, signer)

        const address = await signer.getAddress()

        if (ownedNFTIds.length === 0) {
          throw new Error("You don't own any NFTs eligible for royalties")
        }

        console.log("Claiming royalties for NFT IDs:", ownedNFTIds)
        console.log("Contract address:", contractAddress)
        console.log("User address:", address)

        // Estimate gas for the transaction
        const gasEstimate = await contract.multiRelease.estimateGas(ownedNFTIds, address)
        console.log(`Estimated gas: ${gasEstimate.toString()}`)

        // Get current gas price
        const feeData = await provider.getFeeData()
        const gasPrice = feeData.gasPrice || ethers.parseUnits("5", "gwei") // Default if not available

        // Calculate estimated cost
        const estimatedCost = gasEstimate * gasPrice
        console.log(`Estimated cost: ${ethers.formatEther(estimatedCost)} CRO`)

        // Proceed with transaction
        const tx = await contract.multiRelease(ownedNFTIds, address)
        setRoyaltyData((prev) => ({ ...prev, successMessage: "Transaction submitted. Waiting for confirmation..." }))

        const receipt = await tx.wait()

        if (receipt.status === 1) {
          setRoyaltyData((prev) => ({ ...prev, successMessage: "Royalties claimed successfully!" }))
          await fetchRoyaltiesData()
        } else {
          throw new Error("Transaction failed")
        }
      } catch (error) {
        console.error("Error claiming royalties:", error)
        setRoyaltyData((prev) => ({
          ...prev,
          error: error instanceof Error ? error.message : "Failed to claim royalties",
        }))
      } finally {
        setRoyaltyData((prev) => ({ ...prev, isLoading: false }))
      }
    },
    [getProvider, fetchRoyaltiesData],
  )

  const connectWallet = useCallback(async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        setIsLoading(true)
        setError(null)

        await window.ethereum.request({ method: "eth_requestAccounts" })

        const provider = new ethers.BrowserProvider(window.ethereum)
        const network = await provider.getNetwork()

        if (network.chainId !== BigInt(CRONOS_CHAIN_ID)) {
          try {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: `0x${CRONOS_CHAIN_ID.toString(16)}` }],
            })
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: `0x${CRONOS_CHAIN_ID.toString(16)}`,
                    chainName: "Cronos Mainnet",
                    nativeCurrency: {
                      name: "Cronos",
                      symbol: "CRO",
                      decimals: 18,
                    },
                    rpcUrls: [CRONOS_RPC_URL],
                    blockExplorerUrls: ["https://cronoscan.com/"],
                  },
                ],
              })
            } else {
              throw switchError
            }
          }
        }

        const signer = await provider.getSigner()
        const address = await signer.getAddress()

        setIsConnected(true)
        setAddress(address)
        localStorage.setItem("walletConnected", "true")

        // Fetch royalties data immediately after connecting
        await fetchRoyaltiesData()
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        setIsConnected(false)
        setAddress("")
        setError(error instanceof Error ? error.message : "Failed to connect wallet")
      } finally {
        setIsLoading(false)
      }
    } else {
      console.error("MetaMask is not installed. Please install it to use this app.")
      setError("MetaMask is not installed")
    }
  }, [fetchRoyaltiesData])

  const disconnectWallet = useCallback(() => {
    setIsConnected(false)
    setAddress("")
    setError(null)
    localStorage.removeItem("walletConnected")
    setOgRoyalties((prev) => ({ ...prev, totalDistributed: "0", claimableRoyalties: "0", ownedNFTIds: [] }))
    setArcaneRoyalties((prev) => ({ ...prev, totalDistributed: "0", claimableRoyalties: "0", ownedNFTIds: [] }))
  }, [])

  useEffect(() => {
    const checkConnection = async () => {
      const savedConnectionState = localStorage.getItem("walletConnected")
      if (savedConnectionState === "true" && typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum)
          const accounts = await provider.listAccounts()
          if (accounts.length > 0) {
            setIsConnected(true)
            setAddress(accounts[0].address)
            await fetchRoyaltiesData()
          } else {
            disconnectWallet()
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
          disconnectWallet()
        }
      }
    }

    checkConnection()
  }, [disconnectWallet, fetchRoyaltiesData])

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        error,
        isLoading,
        connectWallet,
        disconnectWallet,
        ogRoyalties,
        arcaneRoyalties,
        fetchRoyaltiesData,
        claimRoyalties,
        getTransactionDetails,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

