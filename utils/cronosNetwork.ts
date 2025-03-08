import { ethers } from "ethers"

export const CRONOS_MAINNET = {
  chainId: "0x19",
  chainName: "Cronos Mainnet",
  nativeCurrency: {
    name: "Cronos",
    symbol: "CRO",
    decimals: 18,
  },
  rpcUrls: ["https://evm.cronos.org"],
  blockExplorerUrls: ["https://cronoscan.com/"],
}

export const CRONOS_TESTNET = {
  chainId: "0x152",
  chainName: "Cronos Testnet",
  nativeCurrency: {
    name: "Cronos",
    symbol: "TCRO",
    decimals: 18,
  },
  rpcUrls: ["https://evm-t3.cronos.org"],
  blockExplorerUrls: ["https://testnet.cronoscan.com/"],
}

export const addCronosNetwork = async (testnet = false) => {
  const network = testnet ? CRONOS_TESTNET : CRONOS_MAINNET
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [network],
      })
      return true
    } catch (error) {
      console.error("Failed to add Cronos network:", error)
      return false
    }
  } else {
    console.error("MetaMask is not installed")
    return false
  }
}

export const switchToCronosNetwork = async (testnet = false) => {
  const chainId = testnet ? CRONOS_TESTNET.chainId : CRONOS_MAINNET.chainId
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      })
      return true
    } catch (error: any) {
      if (error.code === 4902) {
        return addCronosNetwork(testnet)
      } else {
        console.error("Failed to switch to Cronos network:", error)
        return false
      }
    }
  } else {
    console.error("MetaMask is not installed")
    return false
  }
}

export const isCronosNetwork = async (testnet = false) => {
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const network = await provider.getNetwork()
    const expectedChainId = Number.parseInt(testnet ? CRONOS_TESTNET.chainId : CRONOS_MAINNET.chainId, 16)
    return network.chainId === expectedChainId
  }
  return false
}

