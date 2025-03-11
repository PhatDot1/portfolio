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
              A collection of development projects and technical explorations that showcase my skills and interests
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
    link: "https://github.com/",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "A DeFi protocol that optimizes token swaps across multiple liquidity pools, improving efficiency and reducing slippage.",
  },
  {
    title: "NFT Marketplace with Dynamic Metadata",
    link: "https://github.com/",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description: "A marketplace for NFTs with metadata that can evolve based on external triggers and on-chain events.",
  },
  {
    title: "Blockchain Data Visualization",
    link: "https://github.com/",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "A 3D visualization tool for blockchain data that helps identify patterns and anomalies in transaction networks.",
  },
  {
    title: "Smart Contract Verification Tool",
    link: "https://github.com/",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "A framework for testing and verifying smart contracts before deployment, reducing vulnerabilities and gas costs.",
  },
  {
    title: "Event-Triggered NFT System",
    link: "https://github.com/",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "NFTs that transform based on real-world events, using oracle systems to determine visual and functional changes.",
  },
  {
    title: "Secure Random Number Generator",
    link: "https://github.com/",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "A cryptographically secure random number generator for blockchain applications with verifiable entropy sources.",
  },
  {
    title: "Physics Simulation Platform",
    link: "https://github.com/",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "An educational web platform that simulates physical systems with interactive parameters and visualizations.",
  },
  {
    title: "Quantum Spin Chain Simulator",
    link: "https://github.com/",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "A computational model for simulating quantum spin chains, developed during my studies at Lancaster University.",
  },
  {
    title: "Gravitational Simulation Tool",
    link: "https://github.com/",
    thumbnail: "/placeholder.svg?height=600&width=600",
    description:
      "A visualization tool for gravitational interactions, including orbital mechanics and relativistic effects.",
  },
]

