import { ethers } from "ethers"

const NFT_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
]

export interface NFTMetadata {
  id: number
  name: string
  image: string
  attributes?: any[]
}

// Base URLs for metadata and images
const OG_CONTRACT_ADDRESS = "0x8f2836874dc85b81c2cf0421af593e6e8d5dffa1"
const ARCANE_IPFS_CID = "QmZ42zLqYt6J1q2W2G9jJ6Eq9Z2Kj9J6Z8zLqYt6J1q2W" // Example CID, replace with actual value

const padTokenId = (tokenId: number): string => {
  return ethers.zeroPadValue(ethers.toBeHex(tokenId), 32)
}

// Helper function to delay execution
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Helper function to retry failed requests
async function retry<T>(fn: () => Promise<T>, retries = 3, delayMs = 1000, backoff = 2): Promise<T> {
  try {
    return await fn()
  } catch (error) {
    if (retries === 0) throw error
    await delay(delayMs)
    return retry(fn, retries - 1, delayMs * backoff, backoff)
  }
}

export const fetchOwnedNFTs = async (
  provider: ethers.Provider,
  contractAddress: string,
  ownerAddress: string,
): Promise<number[]> => {
  console.log(`Fetching NFTs for contract ${contractAddress} and owner ${ownerAddress}`)

  const contract = new ethers.Contract(contractAddress, NFT_ABI, provider)
  try {
    // Get balance with retry
    const balance = await retry(() => contract.balanceOf(ownerAddress))
    const balanceNumber = Number(balance)
    console.log(`NFT balance for ${ownerAddress}:`, balanceNumber)

    if (balanceNumber === 0) {
      return []
    }

    // Fetch tokens with proper error handling and rate limiting
    const ownedTokens: number[] = []
    for (let i = 0; i < balanceNumber; i++) {
      try {
        // Add delay between requests to avoid rate limiting
        if (i > 0) await delay(500)

        const tokenId = await retry(() => contract.tokenOfOwnerByIndex(ownerAddress, i), 3, 1000)
        const tokenNumber = Number(tokenId)

        console.log(`Found token ID:`, tokenNumber)
        ownedTokens.push(tokenNumber)
      } catch (error) {
        console.error(`Error fetching token at index ${i}:`, error)
        // If we hit an error, try alternative method
        try {
          console.log("Attempting alternative fetching method using events...")
          // Implement alternative fetching method
          const events = await provider.getLogs({
            address: contractAddress,
            topics: [ethers.id("Transfer(address,address,uint256)"), null, ethers.zeroPadValue(ownerAddress, 32)],
            fromBlock: "earliest",
            toBlock: "latest",
          })

          const uniqueTokenIds = new Set(events.map((event) => Number(event.topics[3])))
          console.log("Found token IDs from events:", Array.from(uniqueTokenIds))

          // Verify ownership
          for (const tokenId of uniqueTokenIds) {
            try {
              const currentOwner = await contract.ownerOf(tokenId)
              if (currentOwner.toLowerCase() === ownerAddress.toLowerCase()) {
                ownedTokens.push(tokenId)
              }
            } catch (error) {
              console.error(`Error verifying ownership for token ${tokenId}:`, error)
            }
          }

          break // Exit the loop if we successfully got tokens through events
        } catch (fallbackError) {
          console.error("Fallback method failed:", fallbackError)
          continue
        }
      }
    }

    console.log(`Found ${ownedTokens.length} owned tokens:`, ownedTokens)
    return [...new Set(ownedTokens)] // Remove any duplicates
  } catch (error) {
    if (error.code === "CALL_EXCEPTION") {
      console.log("Contract call exception, possibly incompatible contract. Returning empty array.")
      return []
    }
    console.error("Error fetching owned NFTs:", error)
    return []
  }
}

// Implement rate limiting for image requests
class RateLimiter {
  private queue: (() => Promise<void>)[] = []
  private processing = false
  private lastRequest = 0
  private minDelay: number

  constructor(requestsPerSecond: number) {
    this.minDelay = 1000 / requestsPerSecond
  }

  async schedule<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const now = Date.now()
          const timeSinceLastRequest = now - this.lastRequest
          if (timeSinceLastRequest < this.minDelay) {
            await delay(this.minDelay - timeSinceLastRequest)
          }
          this.lastRequest = Date.now()
          resolve(await fn())
        } catch (error) {
          reject(error)
        }
      })
      this.process()
    })
  }

  private async process() {
    if (this.processing || this.queue.length === 0) return
    this.processing = true
    while (this.queue.length > 0) {
      const task = this.queue.shift()
      if (task) await task()
    }
    this.processing = false
  }
}

const rateLimiter = new RateLimiter(2) // 2 requests per second

export const fetchNFTMetadata = async (tokenId: number, isArcane = false): Promise<NFTMetadata> => {
  try {
    if (isArcane) {
      // Use rate limiter for Arcane requests
      return await rateLimiter.schedule(async () => {
        try {
          console.log(`Fetching Arcane NFT image for ID: ${tokenId}`)

          const imageUrl = `https://indigo-planned-cockroach-959.mypinata.cloud/ipfs/QmRCJxgivfALW6fUj2hZNaVGpiTzfK9WmY4rDMySE4pvQP/${tokenId}.png`
          const response = await fetch(imageUrl)

          if (!response.ok) {
            console.error(`Failed to fetch image for token ${tokenId}, Status: ${response.status}`)
            throw new Error(`Failed to fetch metadata: ${response.status}`)
          }

          return {
            id: tokenId,
            name: `Arcane Creature #${tokenId}`,
            image: imageUrl,
            attributes: [],
          }
        } catch (error) {
          console.error(`Error fetching Arcane metadata for token ${tokenId}:`, error)
          return {
            id: tokenId,
            name: `Arcane Creature #${tokenId}`,
            image: "/placeholder.svg",
            attributes: [],
          }
        }
      })
    } else {
      // For OG collection - using NFTScan URL structure
      const paddedTokenId = padTokenId(tokenId)
      return {
        id: tokenId,
        name: `Crazzzy Monster #${tokenId}`,
        image: `https://metadata.nftscan.com/cro/${OG_CONTRACT_ADDRESS}/${paddedTokenId}.png`,
        attributes: [],
      }
    }
  } catch (error) {
    console.error(`Error fetching metadata for token ${tokenId}:`, error)
    return {
      id: tokenId,
      name: isArcane ? `Arcane Creature #${tokenId}` : `Crazzzy Monster #${tokenId}`,
      image: "/placeholder.svg",
      attributes: [],
    }
  }
}

