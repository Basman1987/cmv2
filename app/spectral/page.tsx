"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Spectral() {
  return (
    <div className="container mx-auto px-4 pt-20 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500"
      >
        Spectral
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-16"
      >
        Welcome to the Spectral section of Crazzzy Monsters
      </motion.p>

      {/* Add your spectral content here */}
      <div className="grid grid-cols-1 justify-items-center items-center gap-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">Coming Soon</h2>
          <p className="text-gray-300">Stay tuned for exciting spectral content and features.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          className="mt-8 w-full max-w-[300px]"
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spectral_Logo-yfxH0q1jqOjtkbBK62zRr15VjP9pXE.webp"
            alt="Spectral Logo"
            width={300}
            height={300}
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  )
}

