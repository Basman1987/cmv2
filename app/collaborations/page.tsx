"use client"

import { motion } from "framer-motion"
import { Twitter, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Collaboration {
  name: string
  logo: string
  description: string
  twitter: string
  twitter2?: string
  website?: string
}

const collaborations: Collaboration[] = [
  {
    name: "The Pride by $CROFam",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the_pride-6UKiHAR7b7zaPyaxqHaYJhacPVI0X5.webp",
    description: "Community-driven project focused on building a strong ecosystem on the Cronos blockchain.",
    twitter: "https://x.com/HQCroFam",
    website: "https://crofam-token.com/",
  },
  {
    name: "Paradise Square",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/paradise-gMrCCEJws7VmcVPPre8iM6W9NMxSzF.webp",
    description:
      "A New Way for #Crofam to invest in a Paradisiaq Island U MINT: We BUILD  15%/27% APR Guaranteed in U.S.D on real Estate + IRL",
    twitter: "https://x.com/ParadiseSquare1",
  },
  {
    name: "Loaded Lions",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LL-RpQVkSNnOg1IQy3A8PsjHztdsdkyxs.webp",
    description:
      "Premier NFT collection on the Cronos blockchain featuring unique lion characters. Flagship NFTS from crypto.com and the game Manecity.",
    twitter: "https://x.com/LoadedLions_CDC",
    website: "https://linktr.ee/LoadedLions_CDC",
  },
  {
    name: "Bob's Adventure",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Bobz-5BLDyJFlpAjjqc5e1DfITbNEJN0N0b.webp",
    description:
      "Bob's Adventure is an evolving NFT project on the Cronos blockchain, centered around Bob, a character journeying through space and the underworld. Known for its consistent delivery to the #crofam community, it features multiple collections, including 666 unique hand-drawn NFTs from its initial launch around August 2022.",
    twitter: "https://x.com/CroBobAdventure",
    twitter2: "https://x.com/BobzToken",
    website: "https://bobsadventure.xyz/",
  },
]

const CollaborationCard = ({ collaboration }: { collaboration: Collaboration }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-700/50"
  >
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      {/* Logo */}
      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-r from-pink-500/20 to-green-500/20 p-[1px] flex-shrink-0">
        <div className="w-full h-full rounded-lg overflow-hidden bg-gray-900">
          <Image
            src={collaboration.logo || "/placeholder.svg"}
            alt={`${collaboration.name} logo`}
            width={100}
            height={100}
            className="w-full h-full object-contain p-2"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center md:items-start">
        <h3 className="text-xl font-bold mb-2 text-white">{collaboration.name}</h3>
        <p className="text-gray-300 text-center md:text-left mb-4">{collaboration.description}</p>

        {/* Links */}
        <div className="flex gap-3 mt-auto">
          <Link href={collaboration.twitter} passHref>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-green-500 rounded-full text-white text-sm font-semibold hover:from-pink-600 hover:to-green-600 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
            </motion.a>
          </Link>

          {collaboration.twitter2 && (
            <Link href={collaboration.twitter2} passHref>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-green-500 rounded-full text-white text-sm font-semibold hover:from-pink-600 hover:to-green-600 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-4 h-4" />
                <span>$BOBZ</span>
              </motion.a>
            </Link>
          )}

          {collaboration.website && (
            <Link href={collaboration.website} passHref>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-700 rounded-full text-white text-sm font-semibold hover:bg-gray-600 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Website</span>
              </motion.a>
            </Link>
          )}
        </div>
      </div>
    </div>
  </motion.div>
)

export default function Collaborations() {
  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500"
      >
        Collaborations
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50">
          <h2 className="text-2xl font-bold mb-4 text-white">Our Collaborative Journey</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              At Crazzzy Monsters, we believe in the power of collaboration to strengthen the NFT ecosystem. We've
              partnered with various projects across the Cronos blockchain and beyond to create unique experiences,
              cross-promotions, and shared value for our communities.
            </p>
            <p>
              Our collaborations range from joint NFT drops and shared utilities to marketing partnerships and ecosystem
              integrations. Each collaboration is carefully selected to ensure alignment with our values and to provide
              maximum benefit to our holders.
            </p>
            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4 mt-6">
              <p className="text-yellow-300 font-semibold">⚠️ Disclaimer</p>
              <p className="text-yellow-200 text-sm mt-2">
                Always DYOR (Do Your Own Research) before engaging with any project. While we carefully select our
                collaboration partners, we cannot be held accountable for projects that may have changed direction or
                exited the space after our collaboration period. The crypto and NFT space is dynamic, and projects
                evolve over time.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
          Previous Collaborations
        </h2>

        {collaborations.map((collab, index) => (
          <CollaborationCard key={index} collaboration={collab} />
        ))}
      </div>
    </div>
  )
}

