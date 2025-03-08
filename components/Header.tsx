"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import WalletConnection from "./WalletConnection"
import HamburgerMenu from "./HamburgerMenu"
import Image from "next/image"

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-40 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <Link href="/">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cm_logo_Website2-JkO1mocTZlPnpyFE1fPxl8Ije86PwM.webp"
              alt="Crazzzy Monsters Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Crazzzy Monsters
          </span>
        </motion.div>
      </Link>
      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/" passHref>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-500 to-green-500 text-white hover:from-pink-600 hover:to-green-600 transition duration-300"
          >
            Home
          </motion.a>
        </Link>
        <WalletConnection />
        <HamburgerMenu />
      </div>
    </nav>
  )
}

