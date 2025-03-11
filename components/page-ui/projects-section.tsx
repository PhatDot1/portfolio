"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { FloatingEquations } from "@/components/ui/floating-equations"
import { ClientOnly } from "@/components/ui/client-only"
import { ProjectCarousel } from "@/components/ui/project-carousel"

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/90"></div>
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute inset-0 noise-bg"></div>
      <ClientOnly>
        <FloatingEquations className="opacity-70" />
      </ClientOnly>

      <div className="container mx-auto px-4 relative z-10 mb-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="outline" className="mb-4 px-4 py-1 text-blue-400 border-blue-400/30">
              Projects
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Featured Work</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
              A collection of past and current development projects and technical explorations that showcase my skills and interests
            </p>
          </motion.div>
        </motion.div>
      </div>

      <ProjectCarousel projects={projects} />
    </section>
  )
}

const projects = [
  {
    title: "Multi-Pool Liquidity Swap",
    link: "https://github.com/PhatDot1/PPshift",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "A DeFi protocol that optimizes token swaps across multiple liquidity pools, improving efficiency and reducing slippage.",
  },
  {
    title: "NFT Marketplace with Dynamic Metadata",
    link: "https://github.com/PhatDot1/BetNFT",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description: "A marketplace for NFTs with metadata that can evolve based on external triggers and on-chain events.",
  },
  {
    title: "On-Chain NFT Chatbot Agent",
    link: "https://github.com/PhatDot1/crossmint_agent",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "Engineered an on-chain chatbot agent with LangChain and Crossmint to enable NFT creation, listing, and token transfers via natural language.",
  },
  {
    title: "Controversial Tweet Scraper",
    link: "https://github.com/PhatDot1/FileFind",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "Implemented a Selenium-based tweet scraper for analyzing controversial Twitter content with advanced query and authentication features.",
  },
  {
    title: "Secondary ERC-20 Marketplace",
    link: "https://github.com/PhatDot1/footium-secondary-mint-market",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "Built an app enabling users to mint NFTs via third-party signatures, bypassing direct mint authority, with an optional premium minting service. V2 Pending.",
  },
  {
    title: "Quantum Random Number-Based Picture Poker Game",
    link: "https://github.com/",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "Built a poker game using quantum random number generation (QRNG) integrated with Ethereum smart contracts.",
  },
  {
    title: "AI-Powered SPL Token Minter",
    link: "https://github.com/",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "Designed a simple app allowing users to input prompts to generate custom designs and mint them seamlessly.",
  },
  {
    title: "Semantic Word Guessing Game",
    link: "https://github.com/PhatDot1/PPmantle",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "A daily word guessing game where players receive exciting visual feedback and numerical indicators of semantic closeness.",
  },
  {
    title: "NFT Minters",
    link: "https://github.com/PhatDot1/minting-scripts-archive",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "NFT Contracts and Scripts for database integrated NFT Minting on Solana, EVM, and more. ",
  },
]

