"use client"

import { motion } from "framer-motion"

const roadmapItems = [
  { date: "Q4 2022", title: "Project Launch", description: "Initial release of Crazzzy Monsters" },
  {
    date: "Q2 2023",
    title: "Launch Crazzzy Monsters gen 1",
    description: "Crazzzy Monsters OG mint on crazzzymonsters.com",
  },
  {
    date: "Q3 2023",
    title: "Airdrop & Ryoshi Monsters Launch",
    description:
      "All holders of Crazzzy monsters got a Hipparchus map airdropped on a 10:1 ratio. Hold 10 CM's get 1 Map. Crazzzy Ryoshi Monsters mint. 20 Monsters families, 10k NFT's.",
  },
  { date: "Q1 2024", title: "Launch of $CRY token", description: "Launch of $CRY token" },
  {
    date: "Q3 2024",
    title: "Launch of Originz",
    description:
      "Our dapp Originz is live, stake your NFT's and earn Orgi. Participate in NFT raffles and auctions. Stake $CRY and earn $CRY",
  },
  {
    date: "Q4 2024",
    title: "Launch Crazzzy Monsters gen 2",
    description: "Arcane Creatures mint in partnership with crypto.com (Phase 1)",
  },
  {
    date: "Q1 2025",
    title: "Ecosystem Expansion",
    description:
      "• Crazzzy Monsters gen 2: Arcane Creatures mint (Phase 2 DeFi)\n• Gamefi integration of gen 2 in partnership with Loaded Lions\n• Originz correction and expansion\n• New Crazzzy Monsters Website\n• Spectral Private Discord",
  },
  {
    date: "Q2 2025",
    title: "Strategic Growth",
    description:
      "• Strategic DeFi partnerships\n• Spectral Public Discord\n• Crazzzy Monsters gen 1 (expansion chain)\n• Spectral modules testing\n• Spectral Labs release",
  },
  {
    date: "Q3 2025",
    title: "Spectral Deployment",
    description: "• Spectral module release",
  },
]

export default function Roadmap() {
  return (
    <section className="py-20 px-4">
      <h2 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
        Our Roadmap
      </h2>
      <div className="max-w-4xl mx-auto px-4">
        {roadmapItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8 flex flex-col sm:flex-row items-start sm:items-center"
          >
            <div className="w-full sm:w-1/4 text-left sm:text-right pr-0 sm:pr-4 mb-2 sm:mb-0">
              <span className="text-neon-pink font-bold">{item.date}</span>
            </div>
            <div className="w-full sm:w-1/2 border-l-2 border-neon-green pl-4 pb-8">
              <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
              {item.description.includes("•") ? (
                <div className="text-sm sm:text-base whitespace-pre-line">{item.description}</div>
              ) : (
                <p className="text-sm sm:text-base">{item.description}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-12 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
        >
          <h3 className="text-xl font-semibold mb-3 text-white">Roadmap Disclaimer</h3>
          <p className="text-gray-300 text-sm">
            This roadmap represents our current vision and strategic direction. As with any forward-looking plan in the
            dynamic blockchain space, timelines may adjust, and initiatives may be added, modified, or reprioritized
            based on market conditions, technological advancements, and community feedback. We are committed to
            transparency and will communicate any significant changes to our community. Consider this roadmap as a
            guideline rather than a fixed schedule, as we continuously evolve to deliver the best possible experience
            for our users and holders.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

