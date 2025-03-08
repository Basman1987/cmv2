"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const nfts = [
  {
    id: 1,
    name: "Crazzzy Monsters OG",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cm-NQ6VcBHBnD1N7ioiked3m10otrkgYR.webp",
  },
  {
    id: 2,
    name: "CM Arcane Creatures",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cmac-y2xFRvqx6AR7PWvw88w3PwIZ2KxDC7.webp",
  },
  {
    id: 3,
    name: "Hipparchus Maps",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hipparchus-Ezv6HK13CVnAnF8uoL9tb4GRlpfA7i.webp",
  },
  {
    id: 4,
    name: "Ryoshi Monsters",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ryoshi-oB7MVWR0oC0oRLDORP8FWHASmj6crs.webp",
  },
]

interface NFT {
  id: number
  name: string
  image: string
}

interface InfoPopupProps {
  nft: NFT
  onClose: () => void
}

const InfoPopup: React.FC<InfoPopupProps> = ({ nft, onClose }) => (
  <motion.div
    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0.9 }}
      className="bg-gray-900/90 p-6 rounded-lg max-w-sm w-full m-4 backdrop-blur-sm border border-gray-800"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-2xl font-bold mb-4">{nft.name}</h3>
      <img
        src={nft.image || "/placeholder.svg"}
        alt={nft.name}
        className="w-full max-w-[200px] mx-auto aspect-square object-cover rounded-lg mb-4"
      />
      <p className="text-gray-300 mb-4">
        {nft.id === 1 ? (
          <>
            10000 Crazzzy Monsters on the Cronos BlockChain, 20 Families of Crazzzy Monsters. Be ready to be overwhelmed
            by Royaltiezzz, Utilities, Giveawayzzz, airdropzzz, and more...
          </>
        ) : nft.id === 2 ? (
          <>
            Introducing 'Arcane Creatures,' the female counterparts to our original 'Crazzzy Monsters' collection. This
            second edition of 10,000 unique NFTs draws inspiration from classic horror and sci-fi films, blending eerie
            charm with spine-chilling aesthetics. Each NFT captures the mystique of iconic female figures in horror,
            from haunted specters to wicked witches. Explore the mysterious allure of our Arcane Creatures and dive
            deeper into the Crazzzy Monsters universe.
          </>
        ) : nft.id === 3 ? (
          <>Utility packed map that gives access to various utilities and Origins</>
        ) : nft.id === 4 ? (
          <>
            This collection is themed around the Ryoshi Dynasties game by Ebisu's Bay. It will consist of 10,000 NFTs
            with a heavy burn mechanism, 20 different Crazzzy Ryoshi Monsters with various quantities. Main focus of
            this collection is to maximise possible daily rewards for the current holders of our main Crazzzy NFT
            collections on Ebisu's Bay. Surprises will come for holders of the 20 different Crazzzy Ryoshi Monsterzzz.
          </>
        ) : (
          `This is a placeholder description for the ${nft.name} NFT. In a real application, this would contain detailed information about the NFT's properties, rarity, and history.`
        )}
      </p>
      <button
        onClick={onClose}
        className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-green-500 rounded-full text-white font-semibold hover:from-pink-600 hover:to-green-600 transition duration-300"
      >
        Close
      </button>
    </motion.div>
  </motion.div>
)

export default function NFTGallery() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  return (
    <section className="py-20 px-4">
      <h2 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
        Featured NFTs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
        {nfts.map((nft) => (
          <motion.div
            key={nft.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-full max-w-[200px] mx-auto aspect-square">
              <img
                src={nft.image || "/placeholder.svg"}
                alt={nft.name}
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
              <button
                onClick={() => setSelectedNFT(nft)}
                className="w-full py-2 px-4 bg-gradient-to-r from-pink-500/80 to-green-500/80 hover:from-pink-500 hover:to-green-500 rounded-full text-white text-sm font-semibold transition-all duration-300"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedNFT && <InfoPopup nft={selectedNFT} onClose={() => setSelectedNFT(null)} />}
      </AnimatePresence>
    </section>
  )
}

