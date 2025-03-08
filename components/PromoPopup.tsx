"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Link from "next/link"

interface PromoPopupProps {
  isEnabled?: boolean
  title?: string
  link?: string
  storageKey?: string
}

export default function PromoPopup({
  isEnabled = true,
  title = "MINT of Crazzzy Monsters Arcane Creatures is LIVE!!",
  link = "https://cmacmint.netlify.app/",
  storageKey = "promo_popup_shown",
}: PromoPopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if popup should be shown
    const hasBeenShown = localStorage.getItem(storageKey)
    if (isEnabled && !hasBeenShown) {
      setIsVisible(true)
      localStorage.setItem(storageKey, "true")
    }
  }, [isEnabled, storageKey])

  const closePopup = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closePopup}
          />

          {/* Popup Content */}
          <motion.div
            className="relative bg-gray-800/90 rounded-2xl p-8 max-w-md w-full"
            animate={{
              rotate: [0, 2, -2, 2, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {/* Gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-green-500 rounded-2xl p-[2px] -z-10">
              <div className="absolute inset-0 bg-gray-800 rounded-2xl" />
            </div>

            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="text-center space-y-6">
              <motion.h2
                className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                {title}
              </motion.h2>

              <Link href={link} passHref>
                <motion.a
                  className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-green-500 rounded-full text-white font-semibold hover:from-pink-600 hover:to-green-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closePopup}
                >
                  Mint Now
                </motion.a>
              </Link>
            </div>

            {/* Animated background effects */}
            <div className="absolute inset-0 -z-10">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-green-500/20 rounded-2xl blur-xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

