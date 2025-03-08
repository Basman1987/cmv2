"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg py-4 px-4 text-center">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">© 2025 Crazzzy Monsters. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/faq">
            <motion.span
              className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              FAQ
            </motion.span>
          </Link>
          <Link href="/terms-and-conditions">
            <motion.span
              className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Terms & Conditions
            </motion.span>
          </Link>
          <p className="text-xs">
            Made by{" "}
            <Link
              href="https://basmanstudios.com/"
              className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500 hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              Basman Studios
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

