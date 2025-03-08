import { ethers } from "ethers"

const CONTRACT_ADDRESS = "0x8f2836874DC85B81C2CF0421aF593E6E8d5DffA1"

// This is a simplified ABI. You may need to adjust it based on the actual contract functions
const ABI = [
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function totalSupply() view returns (uint256)",
]

export async function getNFTData(tokenId: number) {
  const provider = await getProvider()
  if (!provider) return null

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)

  try {
    const tokenURI = await contract.tokenURI(tokenId)
    const response = await fetch(tokenURI)
    const metadata = await response.json()
    return metadata
  } catch (error) {
    console.error("Error fetching NFT data:", error)
    return null
  }
}

export async function getTotalSupply() {
  const provider = await getProvider()
  if (!provider) return 0

  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)

  try {
    const totalSupply = await contract.totalSupply()
    return totalSupply.toNumber()
  } catch (error) {
    console.error("Error fetching total supply:", error)
    return 0
  }
}

async function getProvider() {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running
    await window.ethereum.request({ method: "eth_requestAccounts" })
    return new ethers.providers.Web3Provider(window.ethereum)
  } else {
    // We are on the server *OR* the user is not running metamask
    // In this case, we should use a fallback provider, e.g., Infura
    // For this example, we'll just return null, but in a real app, you'd want to use a fallback
    console.log("No web3 provider detected. Please install MetaMask.")
    return null
  }
}

