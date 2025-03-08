"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, AlertTriangle, Info, X, ExternalLink } from "lucide-react"
import Link from "next/link"

interface WalletSecurityNoticeProps {
  isOpen: boolean
  onClose: () => void
  onProceed: () => void
  type: "connect" | "transaction"
  transactionDetails?: {
    action: string
    gasEstimate?: string
    contractAddress?: string
  }
  isFromRoyaltiesPage?: boolean
}

export default function WalletSecurityNotice({
  isOpen,
  onClose,
  onProceed,
  type,
  transactionDetails,
  isFromRoyaltiesPage = false,
}: WalletSecurityNoticeProps) {
  const [currentTab, setCurrentTab] = useState<"info" | "permissions" | "security">("info")
  const [isMobile, setIsMobile] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Don't lock body scroll when modal is open - allow scrolling to see full popup
  useEffect(() => {
    // Scroll to the top of the modal when tab changes
    if (modalRef.current) {
      modalRef.current.scrollTop = 0
    }
  }, [currentTab])

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Determine the appropriate padding based on where the popup is triggered from
  const getDesktopPadding = () => {
    if (isMobile) return "0" // Mobile always has 0 padding

    if (type === "connect") {
      // For connect wallet popups
      return isFromRoyaltiesPage ? "150px" : "300px" // 150px for royalties/NFT viewer pages, 300px for header button
    } else {
      // For transaction popups
      return "0" // No padding for transaction popups
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            paddingTop: getDesktopPadding(),
            paddingBottom: isMobile ? "0" : "0",
            height: "100%",
          }}
        >
          <div className="relative w-full max-w-2xl mx-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={onClose}
            />

            <motion.div
              ref={containerRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-gray-900 rounded-xl overflow-hidden border border-gray-700 flex flex-col"
              style={{
                maxHeight: isMobile ? "100vh" : "85vh",
                height: isMobile ? "100vh" : "auto",
                position: isMobile ? "fixed" : "relative",
                top: isMobile ? "0" : "auto",
                left: isMobile ? "0" : "auto",
                right: isMobile ? "0" : "auto",
                bottom: isMobile ? "0" : "auto",
                margin: isMobile ? "0" : "auto",
                borderRadius: isMobile ? "0" : "0.75rem",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Always visible */}
              <div className="sticky top-0 z-20 flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <h2 className="text-lg font-bold text-white">
                    {type === "connect" ? "Wallet Connection Security" : "Transaction Security"}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs - Also sticky */}
              <div className="sticky top-[57px] z-10 flex border-b border-gray-700 bg-gray-900">
                <button
                  onClick={() => setCurrentTab("info")}
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    currentTab === "info"
                      ? "bg-gray-800 text-white border-b-2 border-pink-500"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  Transaction Info
                </button>
                <button
                  onClick={() => setCurrentTab("permissions")}
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    currentTab === "permissions"
                      ? "bg-gray-800 text-white border-b-2 border-green-500"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  Permissions
                </button>
                <button
                  onClick={() => setCurrentTab("security")}
                  className={`flex-1 py-3 px-4 text-sm font-medium ${
                    currentTab === "security"
                      ? "bg-gray-800 text-white border-b-2 border-yellow-500"
                      : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  Security Tips
                </button>
              </div>

              {/* Content - Scrollable */}
              <div
                ref={modalRef}
                className="flex-1 overflow-y-auto"
                style={{
                  WebkitOverflowScrolling: "touch",
                  maxHeight: isMobile ? "calc(100vh - 170px)" : "60vh", // Account for header, tabs, and footer
                  overflowY: "auto",
                  padding: "24px",
                  paddingBottom: isMobile ? "96px" : "24px", // Extra padding on mobile
                }}
              >
                {currentTab === "info" && (
                  <div className="space-y-4 min-h-full">
                    <h3 className="text-lg font-semibold text-white">
                      {type === "connect" ? "About This Connection" : "Transaction Details"}
                    </h3>

                    {type === "connect" ? (
                      <div className="space-y-3">
                        <p className="text-gray-300">
                          You are about to connect your wallet to the Crazzzy Monsters website. This will:
                        </p>
                        <ul className="space-y-2 text-gray-300 list-disc pl-5">
                          <li>Allow the site to see your public wallet address</li>
                          <li>Enable you to view your owned NFTs and royalties</li>
                          <li>Let you claim royalties if you own eligible NFTs</li>
                        </ul>
                        <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4 mt-4">
                          <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <p className="text-blue-200 text-sm">
                              We will never ask for your private keys or seed phrase. We only request connection to view
                              your public address and allow you to sign specific transactions that you initiate.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="col-span-1 text-gray-400">Action:</div>
                            <div className="col-span-2 text-white font-medium">
                              {transactionDetails?.action || "Unknown Action"}
                            </div>

                            <div className="col-span-1 text-gray-400">Contract:</div>
                            <div className="col-span-2 text-white font-mono text-xs break-all">
                              {transactionDetails?.contractAddress || "Unknown Contract"}
                            </div>

                            <div className="col-span-1 text-gray-400">Estimated Gas:</div>
                            <div className="col-span-2 text-white">
                              {transactionDetails?.gasEstimate || "Will be calculated by your wallet"}
                            </div>
                          </div>
                        </div>

                        <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <p className="text-yellow-200 text-sm">
                              Always verify transaction details in your wallet before signing. The actual gas cost will
                              be determined by network conditions at the time of transaction.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentTab === "permissions" && (
                  <div className="space-y-4 min-h-full">
                    <h3 className="text-lg font-semibold text-white">Wallet Permissions</h3>

                    <div className="space-y-4">
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">What we request access to:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-500 text-xs">✓</span>
                            </div>
                            <div>
                              <span className="text-white font-medium">View wallet address</span>
                              <p className="text-gray-400 text-sm mt-1">
                                To display your NFTs and check royalty eligibility
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-500 text-xs">✓</span>
                            </div>
                            <div>
                              <span className="text-white font-medium">Request transaction signatures</span>
                              <p className="text-gray-400 text-sm mt-1">
                                Only when you explicitly choose to claim royalties
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-green-500 text-xs">✓</span>
                            </div>
                            <div>
                              <span className="text-white font-medium">Switch networks</span>
                              <p className="text-gray-400 text-sm mt-1">
                                To ensure you're connected to the Cronos blockchain
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-2">What we will never do:</h4>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-red-500 text-xs">✕</span>
                            </div>
                            <div>
                              <span className="text-white font-medium">Request your private keys or seed phrase</span>
                              <p className="text-gray-400 text-sm mt-1">
                                We will never ask for your secret recovery phrase or private keys
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-red-500 text-xs">✕</span>
                            </div>
                            <div>
                              <span className="text-white font-medium">
                                Initiate transactions without your approval
                              </span>
                              <p className="text-gray-400 text-sm mt-1">
                                Every transaction requires your explicit confirmation
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-red-500 text-xs">✕</span>
                            </div>
                            <div>
                              <span className="text-white font-medium">Access other accounts or assets</span>
                              <p className="text-gray-400 text-sm mt-1">
                                We only interact with Crazzzy Monsters NFTs and related contracts
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentTab === "security" && (
                  <div className="space-y-4 min-h-full">
                    <h3 className="text-lg font-semibold text-white">Wallet Security Tips</h3>

                    <div className="space-y-4">
                      <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-red-200 font-medium">Phishing Warning</h4>
                            <p className="text-red-200/80 text-sm mt-1">
                              Always verify you're on the correct website (crazzzymonsters.com). Bookmark our site and
                              be wary of similar-looking URLs. We will never contact you via DM asking to connect your
                              wallet.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="font-medium text-white mb-3">Best Practices for Wallet Safety:</h4>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-blue-500 text-xs">1</span>
                            </div>
                            <p className="text-gray-300">
                              <span className="text-white font-medium">Verify transaction details</span> - Always check
                              what you're signing in your wallet app
                            </p>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-blue-500 text-xs">2</span>
                            </div>
                            <p className="text-gray-300">
                              <span className="text-white font-medium">Use hardware wallets</span> - For additional
                              security with large holdings
                            </p>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-blue-500 text-xs">3</span>
                            </div>
                            <p className="text-gray-300">
                              <span className="text-white font-medium">Consider a dedicated wallet</span> - Use separate
                              wallets for different purposes
                            </p>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-blue-500 text-xs">4</span>
                            </div>
                            <p className="text-gray-300">
                              <span className="text-white font-medium">Never share your seed phrase</span> - No
                              legitimate site will ever ask for it
                            </p>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-blue-500 text-xs">5</span>
                            </div>
                            <p className="text-gray-300">
                              <span className="text-white font-medium">Disconnect after use</span> - Always disconnect
                              your wallet when finished
                            </p>
                          </li>
                        </ul>
                      </div>

                      <div className="text-center">
                        <Link href="https://ethereum.org/en/security/" target="_blank" rel="noopener noreferrer">
                          <span className="inline-flex items-center gap-1 text-pink-400 hover:text-pink-300 text-sm">
                            Learn more about wallet security
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer - Always visible at bottom */}
              <div
                className="sticky bottom-0 p-4 border-t border-gray-700 bg-gray-800 flex justify-between mt-auto"
                style={{
                  zIndex: 20,
                }}
              >
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onProceed}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-green-500 hover:from-pink-600 hover:to-green-600 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  I Understand
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

