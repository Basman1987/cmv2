"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is Crazzzy Monsters?",
    answer:
      "Crazzzy Monsters is a unique NFT collection on the Cronos blockchain featuring 10,000 distinctive monster characters. Each monster is algorithmically generated with various traits and attributes, making them one-of-a-kind digital collectibles.",
  },
  {
    question: "How can I buy a Crazzzy Monster NFT?",
    answer:
      "You can purchase Crazzzy Monster NFTs through our official minting process when available, or from secondary marketplaces like Crypto.com/NFT, Ebisus Bay, or Minted Network. Make sure to connect your wallet and have sufficient CRO for the purchase and gas fees.",
  },
  {
    question: "What are the benefits of holding a Crazzzy Monster NFT?",
    answer:
      "Holders of Crazzzy Monster NFTs receive various benefits including access to exclusive content, participation in community events, voting rights on future developments, potential airdrops, and eligibility for staking rewards through our $CRY token ecosystem.",
  },
  {
    question: "What is the $CRY token?",
    answer:
      "The $CRY token is the official utility token of the Crazzzy Monsters ecosystem. It can be used for staking, governance, rewards, and various other utilities within our platform. The token helps create a sustainable economy around the Crazzzy Monsters project.",
  },
  {
    question: "How do royalties work?",
    answer:
      "Royalties are distributed to NFT holders based on their ownership of Crazzzy Monsters NFTs. The amount of royalties depends on various factors including secondary market sales and the specific collection owned (OG or Arcane Creatures).",
  },
  {
    question: "What is the Arcane Creatures collection?",
    answer:
      "Arcane Creatures is our second NFT collection featuring female counterparts to the original Crazzzy Monsters. This collection consists of 10,000 unique NFTs with their own distinct traits and characteristics, expanding the Crazzzy Monsters universe.",
  },
  {
    question: "How can I get involved in the community?",
    answer:
      "You can join our community by following us on X (Twitter), joining our Discord server, and participating in community discussions. We regularly host events, contests, and other activities for community members.",
  },
  {
    question: "What blockchain is Crazzzy Monsters built on?",
    answer:
      "Crazzzy Monsters is built on the Cronos blockchain, which offers fast transactions, low fees, and seamless integration with the broader Crypto.com ecosystem.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
          Frequently Asked Questions
        </h1>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-4 text-gray-300">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-400">
          <p>Can't find what you're looking for?</p>
          <p className="mt-2">
            Reach out to us on{" "}
            <a
              href="https://discord.gg/YjYHgKNapj"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 transition-colors"
            >
              Discord
            </a>{" "}
            or{" "}
            <a
              href="https://x.com/CrazzzyMonsters"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 transition-colors"
            >
              X (Twitter)
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

