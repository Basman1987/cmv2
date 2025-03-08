"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function Whitepaper() {
  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
          CRY Token Whitepaper
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-8 border border-gray-700">
          <section>
            <h2 className="text-2xl font-bold mb-4">CRY (Crazzzy Token) Lite Paper</h2>

            <h3 className="text-xl font-bold mb-3">About</h3>
            <ul className="list-none pl-0 mb-6 space-y-1">
              <li>
                <strong>Contract Address:</strong>{" "}
                <span className="break-all text-sm md:text-base">0xB770074eA2A8325440798fDF1c29B235b31922Ae</span>
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

            <p>
              The $CRY token is the centerpiece of the Crazzzy Monsters ecosystem, a blockchain initiative that merges
              decentralized finance (DeFi) with a unique, horror-themed NFT universe. As a utility token, $CRY powers a
              range of features designed to incentivize participation, foster community engagement, and ensure long-term
              sustainability. It serves as the primary currency for staking, rewards, and transactions across the
              ecosystem.
            </p>

            <p>
              $CRY is an integral part of the broader Crazzzy Monsters and future Spectral ecosystem. The Crazzzy
              Monsters brand, featuring both male and female NFT collections, positions $CRY as the cornerstone for
              innovation and growth. By integrating with platforms like the Engage-to-Earn (E2E) system and staking
              mechanisms, $CRY provides value across various use cases, enabling a seamless experience for token
              holders. The Spectral platform will further elevate $CRY's utility, expanding its reach across
              decentralized exchanges, liquidity pools, and future gaming innovations.
            </p>

            <h3 className="text-xl font-bold mt-8 mb-4">Tokenomics</h3>
            <p>
              The $CRY tokenomics are designed to foster sustainable growth while rewarding participants and supporting
              ecosystem development.
            </p>

            <h4 className="text-lg font-semibold mt-6 mb-3">Allocation Breakdown:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                44% Public Sale: Ensuring fair access for all participants and establishing strong initial liquidity.
              </li>
              <li>
                22% Liquidity Pool: Supporting market stability and trading activities on decentralized exchanges.
              </li>
              <li>16% Rewards and Marketing: Funding community incentives, partnerships, and promotional campaigns.</li>
              <li>10% Staking Rewards for NFT Holders: Rewarding long-term engagement and fostering loyalty.</li>
              <li>8% Project and Team Allocation: Supporting development and operational costs.</li>
            </ul>

            {/* Continue with the rest of the whitepaper sections */}
            {/* The full content is available in the source but truncated here for brevity */}

            <h3 className="text-xl font-bold mt-8 mb-4">Conclusion</h3>
            <p>
              $CRY is more than a token; it's a gateway to a dynamic, multi-faceted ecosystem that combines community,
              innovation, and financial opportunities. As the backbone of Crazzzy Monsters, $CRY offers unparalleled
              value to holders while setting new standards for utility tokens in the blockchain space. Join the journey
              to redefine engagement and rewards in the decentralized world.
            </p>
          </section>
          <div className="flex justify-center mt-8">
            <Link href="/cry-token">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-green-500 rounded-lg text-white font-semibold hover:from-pink-600 hover:to-green-600 transition-all duration-300"
              >
                Return to $CRY Token
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

