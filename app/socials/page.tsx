"use client"

import { motion } from "framer-motion"
import { Twitter, MessageCircle, Send } from "lucide-react"
import Link from "next/link"

const socialLinks = [
  {
    name: "X (Twitter)",
    icon: Twitter,
    href: "https://x.com/CrazzzyMonsters",
    color: "from-blue-400 to-blue-600",
    hoverColor: "group-hover:from-blue-500 group-hover:to-blue-700",
    delay: 0,
    disabled: false,
  },
  {
    name: "Discord",
    icon: MessageCircle,
    href: "https://discord.com/invite/YjYHgKNapj",
    color: "from-indigo-400 to-indigo-600",
    hoverColor: "group-hover:from-indigo-500 group-hover:to-indigo-700",
    delay: 0.1,
    disabled: false,
  },
  {
    name: "Telegram",
    icon: Send,
    href: "https://t.me/crazzzymonsters",
    color: "from-sky-400 to-sky-600",
    hoverColor: "group-hover:from-sky-500 group-hover:to-sky-700",
    delay: 0.2,
    disabled: true,
  },
]

const SocialButton = ({ social }: { social: (typeof socialLinks)[0] }) => {
  const ButtonContent = (
    <div className="group/tooltip relative">
      {social.disabled && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 mb-2 whitespace-nowrap">
          Coming Soon
        </div>
      )}
      <div
        className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20 ${social.disabled ? "cursor-not-allowed opacity-70" : ""}`}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-green-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon container with glow effect */}
        <div className="relative flex justify-center mb-6">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${social.color} blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
          />
          <div
            className={`relative w-20 h-20 bg-gradient-to-r ${social.color} ${social.hoverColor} rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-current`}
          >
            <social.icon className="w-10 h-10 text-white transform group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Text content */}
        <div className="relative text-center">
          <h2 className="text-xl font-bold mb-2 text-white group-hover:text-pink-400 transition-colors duration-300">
            {social.name}
          </h2>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            Join us on {social.name}
          </p>
        </div>

        {/* Hover border effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-pink-500/50 rounded-xl transition-colors duration-300" />
      </div>
    </div>
  )

  if (social.disabled) {
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="block">
        {ButtonContent}
      </motion.div>
    )
  }

  return (
    <Link href={social.href} passHref>
      <motion.a
        className="block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ButtonContent}
      </motion.a>
    </Link>
  )
}

export default function Socials() {
  return (
    <div className="container mx-auto px-4 pt-20 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500"
      >
        Join Our Community
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-16"
      >
        Connect with us on social media to stay updated with the latest news, events, and announcements from the Crazzzy
        Monsters universe.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {socialLinks.map((social) => (
          <motion.div
            key={social.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: social.delay,
            }}
          >
            <SocialButton social={social} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

