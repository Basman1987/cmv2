"use client"

import { motion } from "framer-motion"
import { Twitter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
  twitter: string
}

const teamMembers: TeamMember[] = [
  {
    name: "JKCryptoXYZ",
    role: "Founder & CEO",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/jk-URB6k8V6wcdo0esVWAUDyavk992L3L.webp",
    bio: "Visionary founder and CEO of Crazzzy Monsters, bringing years of blockchain expertise and creative direction to the project. Leading the team in building innovative NFT collections and developing the expanding Crazzzy Monsters ecosystem. With a keen eye for emerging trends in the NFT space, JK has positioned Crazzzy Monsters at the forefront of the Cronos blockchain. His strategic partnerships and community-first approach have created a loyal following and sustainable growth model. JK continues to push boundaries, exploring new utilities and experiences for Crazzzy Monsters holders.",
    twitter: "https://x.com/JKCryptoXYZ",
  },
  {
    name: "Basman",
    role: "COO / Developer / Artist",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Basman2-QS3bicN0NolX4nyY4zk37yqF4TR7jm.webp",
    bio: "A multi-talented professional combining artistic vision with technical expertise. As COO, Developer, and Artist, Basman brings a unique blend of creative and technical skills to the Crazzzy Monsters project, ensuring seamless integration of art and technology. His innovative approach to NFT design has established the distinctive aesthetic that defines the Crazzzy Monsters brand. Overseeing day-to-day operations while simultaneously creating captivating artwork, Basman's versatility is key to the project's success. His deep understanding of blockchain technology enables him to bridge the gap between artistic vision and technical implementation.",
    twitter: "https://x.com/Basman90777419",
  },
  {
    name: "KVRC",
    role: "Community Manager",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kvrc-TjgoJ1YuvrJYV0wHEobp7O4aVxOQ1N.webp",
    bio: "Cronos DeFi luminary, blending community and project management skills, elevating fellow Crofam endeavors. A dedicated 26-year-old, here daily to radiate support. Passion ignited post-high school, steering me towards lasting pursuits in management and animal care. Crypto and Cronos seized my focus. Committed to crafting a haven for learning, earning, and delight within Cronos projects i support.",
    twitter: "https://x.com/kvrle98",
  },
  {
    name: "Rand al'Thor",
    role: "Head Moderator",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rand-5f01csfrb6Q2aFbMuTxZeCFp4OELqz.webp",
    bio: "Vigilant guardian of the Crazzzy Monsters community, Rand brings order and harmony to our digital spaces. With exceptional conflict resolution skills and deep knowledge of blockchain technologies, he ensures our community remains a welcoming environment for newcomers and veterans alike. His dedication to fairness and transparency has been instrumental in building our thriving ecosystem.",
    twitter: "https://x.com/randalthor88",
  },
]

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
  >
    <div className="flex flex-col items-center flex-1">
      {/* Profile Picture */}
      <div className="relative w-48 h-48 mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-green-500 rounded-full p-[2px]">
          <div className="w-full h-full rounded-full overflow-hidden">
            <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Role - with gradient text */}
      <h3 className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
        {member.role}
      </h3>

      {/* Name */}
      <h4 className="text-lg font-semibold mb-4 text-white">{member.name}</h4>

      {/* Bio - with fixed height and scrolling */}
      <div className="w-full mb-6 flex-1">
        <p className="text-gray-300 text-center">{member.bio}</p>
      </div>

      {/* Twitter Link */}
      <Link href={member.twitter} passHref>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-green-500 rounded-full text-white font-semibold hover:from-pink-600 hover:to-green-600 transition-all duration-300 mt-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="w-4 h-4" />
          <span>Follow on X</span>
        </motion.a>
      </Link>
    </div>
  </motion.div>
)

export default function Team() {
  return (
    <div className="container mx-auto px-4 pt-20 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500"
      >
        Our Team
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-16"
      >
        Meet the passionate individuals behind Crazzzy Monsters
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-full"
          >
            <TeamMemberCard member={member} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

