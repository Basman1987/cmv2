"use client"

import { motion } from "framer-motion"
import { Twitter, MessageCircle, Globe, Rocket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCard {
  name: string
  logo: string
  links: {
    twitter: string
    discord: string
    website: string
    mint: string
  }
}

const upcomingProjects: ProjectCard[] = [
  {
    name: "The Pride by $CROFam",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/the_pride-6UKiHAR7b7zaPyaxqHaYJhacPVI0X5.webp",
    links: {
      twitter: "https://x.com/HQCroFam",
      discord: "https://discord.gg/XBYRN7BgUn",
      website: "https://crofam-token.com/",
      mint: "https://crofammint.netlify.app/",
    },
  },
]

const ongoingProjects: ProjectCard[] = [
  {
    name: "Paradise Square",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/paradise-gMrCCEJws7VmcVPPre8iM6W9NMxSzF.webp",
    links: {
      twitter: "https://x.com/ParadiseSquare1",
      discord: "#",
      website: "#",
      mint: "#",
    },
  },
]

const finishedProjects: ProjectCard[] = [
  {
    name: "Project Name",
    logo: "/placeholder.svg?height=200&width=200",
    links: {
      twitter: "#",
      discord: "#",
      website: "#",
      mint: "#",
    },
  },
]

const ProjectSection = ({ title, projects }: { title: string; projects: ProjectCard[] }) => (
  <div className="mb-16">
    <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500 text-center w-full">
      {title}
    </h2>
    <div className="flex flex-wrap justify-center gap-6">
      {projects.map((project, index) => (
        <motion.div
          key={`${title}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 hover:shadow-xl transition-all duration-300 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[400px]"
        >
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src={project.logo || "/placeholder.svg"}
                alt={`${project.name} logo`}
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">{project.name}</h3>
            <div className="flex gap-4">
              <Link href={project.links.twitter} passHref>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-700 hover:bg-blue-600 transition-colors duration-300"
                  title="Twitter/X"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </Link>
              <Link href={project.links.discord} passHref>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-700 hover:bg-indigo-600 transition-colors duration-300"
                  title="Discord"
                >
                  <MessageCircle className="w-5 h-5" />
                </motion.a>
              </Link>
              <Link href={project.links.website} passHref>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-700 hover:bg-green-600 transition-colors duration-300"
                  title="Website"
                >
                  <Globe className="w-5 h-5" />
                </motion.a>
              </Link>
              <Link href={project.links.mint} passHref>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gray-700 hover:bg-pink-600 transition-colors duration-300"
                  title="Mint"
                >
                  <Rocket className="w-5 h-5" />
                </motion.a>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)

export default function Launchpad() {
  return (
    <div className="container mx-auto px-4 pt-20 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500"
      >
        Launchpad
      </motion.h1>

      <div className="space-y-8 max-w-4xl mx-auto mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-lg md:text-xl text-gray-300"
        >
          Discover and participate in exciting new NFT projects
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 text-gray-200"
        >
          <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-green-500">
            Launch Your Vision with Our Comprehensive Launchpad Service!
          </h2>

          <p className="text-center">
            Looking to start your own project but not sure where to begin? We're here to help you every step of the way!
            Our launchpad service is designed to bring your ideas to life, from concept to completion.
          </p>

          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-white">What We Offer:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-pink-500">🚀</span>
                <span>
                  <strong className="text-white">Art Creation</strong> – Whether you need hand-drawn masterpieces or
                  cutting-edge AI-generated designs, we've got you covered.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500">🚀</span>
                <span>
                  <strong className="text-white">Discord Services</strong> – Build and manage a vibrant community with
                  our expert Discord setup and moderation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500">🚀</span>
                <span>
                  <strong className="text-white">Smart Contracts</strong> – Secure, efficient, and customized smart
                  contracts tailored to your project's needs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500">🚀</span>
                <span>
                  <strong className="text-white">Websites & DApps</strong> – Professional and user-friendly websites and
                  decentralized applications to showcase your project.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pink-500">🚀</span>
                <span>
                  <strong className="text-white">IPFS Storage</strong> – Reliable and decentralized storage solutions
                  for your digital assets.
                </span>
              </li>
            </ul>
          </div>

          <p className="text-center font-semibold">
            <span className="text-white">You name it, we're here for you!</span> Whether you're an artist, developer, or
            entrepreneur, our launchpad is the ultimate starting point to turn your vision into reality.
          </p>

          <p className="text-center text-xl">
            Ready to get started?{" "}
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-green-500">
              Let's build something amazing together!
            </span>
          </p>
        </motion.div>
      </div>

      <ProjectSection title="Upcoming Launchpad Mints" projects={upcomingProjects} />
      <ProjectSection title="Ongoing Launchpad Mints" projects={ongoingProjects} />
      <ProjectSection title="Finished Launchpad Mints" projects={finishedProjects} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mt-20 p-8 bg-gray-800/30 backdrop-blur-sm rounded-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-white">Disclaimer</h2>
        <div className="prose prose-invert max-w-none">
          <p className="mb-4">
            We provide launchpad services to help projects reach a wider audience and gain traction. While we thoroughly
            review and vet each project before offering our services, we cannot guarantee the legitimacy or future
            actions of any project.
          </p>

          <h3 className="text-xl font-semibold mb-4">Important Notice:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              We are not responsible or liable for any malicious activities, scams, or rug pulls by projects launched
              through our platform.
            </li>
            <li>Our due diligence process aims to minimize risks, but it is not foolproof.</li>
            <li>
              Investors and users should always <strong>Do Your Own Research (DYOR)</strong> before participating in any
              project.
            </li>
          </ul>

          <p className="mt-6 text-sm text-gray-400">
            By using our launchpad services, you acknowledge and accept these terms.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

