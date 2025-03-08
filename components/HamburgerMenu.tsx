"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

const menuItems = [
  { id: "royalties", label: "Royalties", href: "/royalties" },
  { id: "secondary-markets", label: "Secondary Markets", href: "/secondary-markets" },
  { id: "socials", label: "Socials", href: "/socials" },
  { id: "contact", label: "Contact", href: "/contact" },
  { id: "launchpad", label: "Launchpad", href: "/launchpad" },
  { id: "nft-viewer", label: "NFT Viewer", href: "/nft-viewer" },
  { id: "cry-token", label: "$CRY Token", href: "/cry-token" },
  { id: "spectral", label: "Spectral", href: "/spectral" },
  { id: "collaborations", label: "Collaborations", href: "/collaborations" },
  { id: "team", label: "Team", href: "/team" },
]

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative z-50">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 bg-gray-800 rounded-full focus:outline-none"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-white mb-1"
        ></motion.span>
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-6 h-0.5 bg-white mb-1"
        ></motion.span>
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="w-6 h-0.5 bg-white"
        ></motion.span>
      </button>

      {/* Menu Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-12 right-0 w-56 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl overflow-hidden"
          >
            {/* Menu Items */}
            <motion.ul
              className="py-2"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
                closed: {
                  transition: {
                    staggerChildren: 0.05,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              {menuItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    open: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3 },
                    },
                    closed: {
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.3 },
                    },
                  }}
                >
                  <Link href={item.href} passHref>
                    <motion.a
                      className="block w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                      whileHover={{ x: 10 }}
                    >
                      {item.label}
                    </motion.a>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

