"use client"

import { motion } from "framer-motion"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = "crazzzymonsters@gmail.com"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="container mx-auto px-4 pt-20 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500"
      >
        Contact Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-16"
      >
        Have questions or suggestions? We'd love to hear from you!
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        {/* Email Section */}
        <div className="mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-white">Direct Email</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-grow">
                <div className="bg-gray-900/50 p-3 rounded-lg font-mono text-sm break-all">{email}</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-green-500 rounded-lg text-white font-semibold hover:from-pink-600 hover:to-green-600 transition-all duration-300"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Google Form Section */}
        <div className="relative">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-green-500 rounded-xl p-[2px]">
            <div className="absolute inset-0 bg-gray-800/95 backdrop-blur-sm rounded-[9px]" />
          </div>

          {/* Content container */}
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 md:p-6">
            {/* Custom styled iframe container */}
            <div className="relative w-full overflow-hidden rounded-lg bg-white/5">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdBO-4kWdx7VVqupzXWygF2oOgId7Ckoc2Ol4MRyw-kAICaQg/viewform?embedded=true"
                className="w-full min-h-[800px] md:min-h-[1531px]"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
              >
                Loading...
              </iframe>
            </div>
          </div>
        </div>

        {/* Additional contact information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-gray-400 text-sm"
        >
          <p>You can also reach us through our social media channels</p>
          <p className="mt-2">We typically respond within 24-48 hours</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

