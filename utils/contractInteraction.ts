import { ethers } from "ethers"

async function getProvider() {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running
    await window.ethereum.request({ method: "eth_requestAccounts" })
    return new ethers.BrowserProvider(window.ethereum)
  } else {
    // We are on the server *OR* the user is not running metamask
    // In this case, we should use a fallback provider, e.g., Infura
    // For this example, we'll just return null, but in a real app, you'd want to use a fallback
    console.log("No web3 provider detected. Please install MetaMask.")
    return null
  }
}

