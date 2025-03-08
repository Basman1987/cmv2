"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface MarketButton {
  name: string
  href: string
  logo?: string
}

interface Category {
  name: string
  image: string
  markets: MarketButton[]
}

const categories: Category[] = [
  {
    name: "Crazzzy Monsters OG",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cm-NQ6VcBHBnD1N7ioiked3m10otrkgYR.webp",
    markets: [
      {
        name: "Crypto.com/NFT",
        href: "https://crypto.com/nft/collection/b00f1936d584039f49e0232adabfdd35?tab=items",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Full-Colour_Ethereum_Lion_Icon-QOf2vxOVOpoP59nOABzRKG7Y3EbRoV.svg",
      },
      {
        name: "Ebisus Bay",
        href: "https://app.ebisusbay.com/collection/cronos/crazzzy-monsters?chain=cronos",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-dark-ebisus-Wh4QeJ4NU11ljnxnKKb7rd9VQzHGRG.svg",
      },
      {
        name: "Minted Network",
        href: "https://minted.network/collections/cronos/0x8f2836874dc85b81c2cf0421af593e6e8d5dffa1",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/minted1666603954990-R7TActocXNoWl2d0IHLNfwo5ZTBeym.png",
      },
    ],
  },
  {
    name: "Crazzzy Monsters Arcane Creatures",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cmac-y2xFRvqx6AR7PWvw88w3PwIZ2KxDC7.webp",
    markets: [
      {
        name: "Crypto.com/NFT",
        href: "https://crypto.com/nft/collection/854cabb3b34b57a6cd912a406c22b9bf?tab=items",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Full-Colour_Ethereum_Lion_Icon-QOf2vxOVOpoP59nOABzRKG7Y3EbRoV.svg",
      },
      {
        name: "Ebisus Bay",
        href: "https://app.ebisusbay.com/collection/cronos/crazzzy-monsters-arcane-creatures-edition-1?chain=cronos",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-dark-ebisus-Wh4QeJ4NU11ljnxnKKb7rd9VQzHGRG.svg",
      },
      {
        name: "Minted Network",
        href: "https://minted.network/collections/cronos/0x272d3ad398742d5f04751fbf8b6cc17401beae11",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/minted1666603954990-R7TActocXNoWl2d0IHLNfwo5ZTBeym.png",
      },
    ],
  },
  {
    name: "Hipparchus Maps",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hipparchus-Ezv6HK13CVnAnF8uoL9tb4GRlpfA7i.webp",
    markets: [
      {
        name: "Ebisus Bay",
        href: "https://app.ebisusbay.com/collection/cronos/crazzzy-hipparchus-map?chain=cronos",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-dark-ebisus-Wh4QeJ4NU11ljnxnKKb7rd9VQzHGRG.svg",
      },
      {
        name: "Minted Network",
        href: "https://minted.network/collections/cronos/0x272d3ad398742d5f04751fbf8b6cc17401beae11",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/minted1666603954990-R7TActocXNoWl2d0IHLNfwo5ZTBeym.png",
      },
    ],
  },
  {
    name: "Crazzzy Ryoshi Monsters",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Ryoshi-oB7MVWR0oC0oRLDORP8FWHASmj6crs.webp",
    markets: [
      {
        name: "Ebisus Bay",
        href: "https://app.ebisusbay.com/collection/cronos/crazzzy-ryoshi-monsterzzz?chain=cronos",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-dark-ebisus-Wh4QeJ4NU11ljnxnKKb7rd9VQzHGRG.svg",
      },
      {
        name: "Minted Network",
        href: "https://minted.network/collections/cronos/0xe65faa8791f25e9fb034f1c8913f14f6db12c6c0",
        logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/minted1666603954990-R7TActocXNoWl2d0IHLNfwo5ZTBeym.png",
      },
    ],
  },
]

const MarketplaceButton = ({ name, href, logo, categoryName }: MarketButton & { categoryName: string }) => {
  const isDisabled = categoryName === "Crazzzy Monsters Arcane Creatures" && name === "Minted Network"

  const ButtonContent = (
    <div className="relative group/tooltip">
      {isDisabled && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 mb-2 whitespace-nowrap">
          Coming Soon
        </div>
      )}
      <div
        className={`relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 ${isDisabled ? "cursor-not-allowed opacity-70" : ""}`}
      >
        {/* Ripple effect container */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-green-500/20" />
        </div>

        <div className="relative flex items-center gap-4">
          {/* Logo placeholder */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-pink-500 to-green-500 p-[2px]">
            <div className="w-full h-full rounded-full overflow-hidden">
              <Image
                src={logo || "/placeholder.svg"}
                alt={`${name} logo`}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Button text */}
          <span className="font-semibold text-white group-hover:text-pink-400 transition-colors duration-300">
            {name}
          </span>

          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-green-500/10 blur-xl" />
          </div>
        </div>
      </div>
    </div>
  )

  if (isDisabled) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {ButtonContent}
      </motion.div>
    )
  }

  return (
    <Link href={href} passHref>
      <motion.a className="group relative block" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {ButtonContent}
      </motion.a>
    </Link>
  )
}

export default function SecondaryMarkets() {
  return (
    <div className="container mx-auto px-4 pt-20 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500"
      >
        Secondary Markets
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-16"
      >
        Explore and trade Crazzzy Monsters NFTs across various marketplaces
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
          >
            {/* Category header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
              </div>
              <h2 className="text-xl font-bold text-white">{category.name}</h2>
            </div>

            {/* Marketplace buttons */}
            <div className="space-y-4">
              {category.markets.map((market) => (
                <MarketplaceButton
                  key={`${category.name}-${market.name}`}
                  name={market.name}
                  href={market.href}
                  logo={market.logo}
                  categoryName={category.name}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

