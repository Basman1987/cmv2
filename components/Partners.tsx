"use client"

import { motion } from "framer-motion"

const partners = [
  {
    id: 1,
    name: "Ethereum Lion",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Full-Colour_Ethereum_Lion_Icon-QOf2vxOVOpoP59nOABzRKG7Y3EbRoV.svg",
  },
  {
    id: 2,
    name: "Loaded Lions",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LL_Full_on%20Black%20(1)-iqoBSSPAM8RvurOvzL5sYrcpMxNZXH.png",
  },
  { id: 3, name: "Partner 3", image: "/placeholder.svg?height=100&width=100" },
  { id: 4, name: "Partner 4", image: "/placeholder.svg?height=100&width=100" },
  { id: 5, name: "Partner 5", image: "/placeholder.svg?height=100&width=100" },
  { id: 6, name: "Partner 6", image: "/placeholder.svg?height=100&width=100" },
  { id: 7, name: "Partner 7", image: "/placeholder.svg?height=100&width=100" },
  { id: 8, name: "Partner 8", image: "/placeholder.svg?height=100&width=100" },
]

export default function Partners() {
  return (
    <section className="py-20 px-4">
      <h2 className="text-4xl font-bold mb-10 text-center text-white">Our Partners</h2>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div key={`${partner.id}-${index}`} className="flex-shrink-0 mx-4">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-pink-500 to-green-500 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-800 rounded-full flex items-center justify-center p-4">
                  {partner.image ? (
                    <img
                      src={partner.image || "/placeholder.svg"}
                      alt={partner.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700/50 rounded-full"></div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

