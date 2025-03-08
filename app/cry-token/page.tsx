"use client"

import { motion } from "framer-motion"
import { Check, Copy, ExternalLink, LineChart } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function CryToken() {
  const [copied, setCopied] = useState(false)
  const contractAddress = "0xB770074eA2A8325440798fDF1c29B235b31922Ae"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="container mx-auto px-4 pt-20 min-h-screen">
      <div className="text-center relative">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500"
        >
          $CRY Token
        </motion.h1>

        {/* Coin Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="relative w-32 h-32 md:w-40 md:h-40 mx-auto my-8"
        >
          <motion.div
            animate={{
              rotateY: 360,
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
            className="w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Cry_coin-hHXsunV1MwTi6WB3hKjcFKl0O4hCV1.webp"
              alt="CRY Token Coin"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              priority
            />
          </motion.div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-yellow-500/20 blur-2xl rounded-full" />
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
            $CRY: The Crazzzy Monster Token 🌈💧
          </h2>

          <div className="space-y-4 text-gray-300">
            <p>
              Meet Teardrop Terry the ever-dripping, color-shifting icon of $CRY, the official Crazzzy Monsters token!
            </p>
            <p>
              Teardrop Terry flows with power, changing color at will to keep things fresh and always a bit
              unpredictable.
            </p>
            <p>
              Built to energize your journey in the Crazzzy Monsters universe, $CRY isn't just a token it's your key to
              unlocking exclusive monster experiences, powering up, and joining the wild world of Crazzzy Monsters and
              Crazzzy Monsters Arcane Creatures.
            </p>
            <p className="text-xl font-bold text-white">Get ready to get CRAZZZY with $CRY! 💀🔥</p>
          </div>
        </motion.div>

        {/* Contract Address Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        >
          <div className="flex flex-col space-y-2">
            <label className="text-sm text-gray-400">Contract Address:</label>
            <div className="flex items-center gap-2 flex-wrap">
              <code className="flex-1 bg-gray-900/50 p-3 rounded-lg font-mono text-sm break-all">
                {contractAddress}
              </code>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-green-500 rounded-lg text-white font-semibold hover:from-pink-600 hover:to-green-600 transition-all duration-300"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Terry Teardrop Mascot Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-white">Meet Terry Teardrop!</h3>
              <p className="text-gray-300">
                The official mascot of $CRY, Terry brings personality and charm to the Crazzzy Monsters ecosystem.
              </p>
              <motion.div
                className="relative w-48 h-48 mx-auto"
                whileHover={{ scale: 1.05 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  },
                }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Terry-ZU3ZpizHcRFMNl5jsVVlE1hASAGqV4.webp"
                  alt="Terry Teardrop - $CRY Token Mascot"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
              <p className="text-sm text-blue-300 font-medium">
                Watch Terry float and glow – just like the value he brings to our community! ✨
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-green-500/10 blur-3xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Live Chart Data</h3>
            <Link
              href="https://dexscreener.com/cronos/0x5ed3bc0e3745a453b51ee3106f89c858dd69816b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                className="group relative overflow-hidden rounded-lg bg-gray-900/50 p-6 hover:bg-gray-900/70 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <LineChart className="w-6 h-6 text-pink-500" />
                    <span className="text-lg font-semibold text-white">View Live Chart on DEX Screener</span>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div className="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                  Click to see real-time price, volume, and trading data
                </div>

                {/* Gradient border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-pink-500/50 group-hover:to-green-500/50 rounded-lg transition-colors" />

                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-green-500/0 group-hover:from-pink-500/5 group-hover:to-green-500/5 transition-all duration-300" />
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Whitepaper Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-green-500/10 blur-3xl" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Whitepaper</h3>
            <div className="prose prose-invert max-w-none">
              <div className="space-y-4 text-gray-300">
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">CRY (Crazzzy Token) Lite Paper</h4>
                  <div className="mb-4">
                    <p className="font-semibold">About</p>
                    <ul className="list-none pl-0 mb-4 space-y-1">
                      <li className="break-all text-sm md:text-base">
                        <strong>Contract Address:</strong> {contractAddress}
                      </li>
                      <li>
                        <strong>Name:</strong> Crazzzy
                      </li>
                      <li>
                        <strong>Symbol:</strong> CRY
                      </li>
                      <li>
                        <strong>Supply:</strong> 10,000,000,000
                      </li>
                      <li>
                        <strong>Token Type:</strong> CRC-20
                      </li>
                    </ul>
                  </div>
                  <p>
                    The $CRY token is the centerpiece of the Crazzzy Monsters ecosystem, a blockchain initiative that
                    merges decentralized finance (DeFi) with a unique, horror-themed NFT universe. As a utility token,
                    $CRY powers a range of features designed to incentivize participation, foster community engagement,
                    and ensure long-term sustainability. It serves as the primary currency for staking, rewards, and
                    transactions across the ecosystem.
                  </p>
                  <p>
                    $CRY is an integral part of the broader Crazzzy Monsters and future Spectral ecosystem. The Crazzzy
                    Monsters brand, featuring both male and female NFT collections, positions $CRY as the cornerstone
                    for innovation and growth...
                  </p>
                </div>
                <Link href="/whitepaper" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-pink-500 to-green-500 rounded-lg text-white font-semibold hover:from-pink-600 hover:to-green-600 transition-all duration-300"
                  >
                    Read Full Whitepaper
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

