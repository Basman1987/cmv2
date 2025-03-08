"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
import NFTGallery from "../components/NFTGallery"
import Roadmap from "../components/Roadmap"
import Partners from "../components/Partners"
import Image from "next/image"

const CryptoData = dynamic(() => import("../components/CryptoData"), { ssr: false })

export default function Home() {
  return (
    <>
      <div className="relative w-full h-[200px] md:h-[240px] lg:h-[300px] xl:h-[350px] mt-16">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Front_banner-LY2qUezkoRSPkVXHlWRfAmujIhdETT.webp"
          alt="Crazzzy Monsters Banner"
          fill
          className="object-contain"
          priority
        />
      </div>

      <section className="flex flex-col justify-center items-center text-center px-4 relative mt-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-green-500"
        >
          Welcome to Crazzzy Monsters
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-lg lg:text-2xl mb-8 mx-auto max-w-4xl px-2 md:px-4"
        >
          Embark on a journey through the digital frontier of NFTs and decentralized wonders.
        </motion.p>
        <div className="w-full max-w-[280px] md:max-w-md">
          <Link href="https://originz.crazzzymonsters.com/" passHref>
            <motion.a
              className="group relative block w-full px-4 md:px-6 py-2 md:py-3 mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative overflow-hidden rounded-full bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-green-500/20" />
                </div>

                <div className="relative px-4 md:px-6 py-2 md:py-3">
                  <span className="font-semibold text-sm md:text-base text-white group-hover:text-pink-400 transition-colors duration-300">
                    Originz
                  </span>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-green-500/10 blur-xl" />
                  </div>
                </div>
              </div>
            </motion.a>
          </Link>

          <Link href="https://cmacmint.netlify.app/" passHref>
            <motion.a
              className="group relative block w-full px-4 md:px-6 py-2 md:py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative overflow-hidden rounded-full bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-pink-500/20" />
                </div>

                <div className="relative px-4 md:px-6 py-2 md:py-3">
                  <span className="font-semibold text-sm md:text-base text-white group-hover:text-green-400 transition-colors duration-300">
                    MINT CMAC
                  </span>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-pink-500/10 blur-xl" />
                  </div>
                </div>
              </div>
            </motion.a>
          </Link>
        </div>
      </section>

      <NFTGallery />
      <CryptoData />
      <Roadmap />
      <Partners />
    </>
  )
}

