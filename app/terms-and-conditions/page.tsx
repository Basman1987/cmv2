"use client"

import { motion } from "framer-motion"

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4 pt-20 pb-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
          Terms and Conditions
        </h1>

        <div className="prose prose-invert max-w-none space-y-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8">
          <section>
            <h2 className="text-2xl font-bold">OWNERSHIP AND COMMERCIAL RIGHTS OF CRAZZZY MONSTER NFTS</h2>
            <p>
              By minting a Crazzzy Monsters (CM) NFT from our smart contract, purchasing it from the secondary market,
              or obtaining it through any other legitimate means, the Holder is granted full ownership and commercial
              rights to the NFT and its unique artwork. The License granted to the Holder is limited to the Licensed NFT
              CM, allowing them to use and reproduce the Licensed CM NFT for tribute or derivative art, merchandise, or
              sharing with third party projects. The Holder agrees not to use or market any CM NFT in any project or
              derivative work involving hate speech, racism, pornography, or any other illegal or unlawful content. Upon
              sale or transfer of the NFT, all ownership and commercial rights are immediately transferred to the new
              Holder. No refunds will be issued to any Holder upon a lawful purchase of any NFT or CM. If a Holder
              purchases a CM from the secondary market, they will be bound by the Terms of Service of that platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">ART AND CREATIVE DESIGN</h2>
            <p>
              Any Attributes associated with a CM are used as a parody and are not sponsored, endorsed, or affiliated
              with any companies or third-party licensors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              LIMITATIONS OF LIABILITY FOR GAS, FAILED TRANSACTIONS, SMART CONTRACT BUGS
            </h2>
            <p>
              Participants in minting CM NFTs agree to hold the project Creative Team harmless for any losses incurred
              due to gas fees for failed transactions, excessive gas fees due to website or smart contract bugs, or loss
              of NFTs due to website or smart contract bugs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">NO GUARANTEES OR FUTURE PROMISES</h2>
            <p>
              While the CM Creative Team has released a roadmap outlining future goals and plans, we cannot guarantee
              the accomplishment of every item during the launch planning phase as ideas and projects may evolve
              organically. Your purchase of a CM from our initial launch of 10,000 NFTs guarantees only what is received
              with the initial purchase, whether through primary or secondary channels. Any future benefits are
              ancillary to this purchase and not to be considered with the initial purchase. You acknowledge that you
              are not relying on any future commitments by The CM Team in using this site and participating in our NFT
              launch.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">NO GUARANTEES OF VALUE</h2>
            <p>
              CM NFTs were created solely as collectibles and not as investment vehicles or substitutes for
              cryptocurrency. We make no promises or guarantees that these NFTs will retain monetary value in fiat,
              cash, or cryptocurrency.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">TAXES</h2>
            <p>
              Each Holder is solely responsible for any Federal or State tax liabilities that may arise from minting or
              reselling CM NFTs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">CLASS ACTION WAIVER, JURISDICTION AND CHOICE OF LAW</h2>
            <p>
              You agree to waive any class action status, and any legal disputes related to the Crazzzy Monsters project
              must be brought on an individual basis in the chosen jurisdiction and governed by the chosen law.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  )
}

