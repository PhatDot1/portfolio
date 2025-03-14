"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, BrainCircuit, Code, Braces, Network, Layers } from "lucide-react"

// Define the props type for VibratingStrings
type VibratingStringsProps = {
  className?: string
  density?: number
}

// Dynamically import VibratingStrings with SSR disabled and a null loading fallback
const VibratingStrings = dynamic<VibratingStringsProps>(
  () =>
    import("@/components/ui/vibrating-strings").then(
      (mod) => mod.VibratingStrings
    ),
  { ssr: false, loading: () => null }
)

export function AboutSection() {
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
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/90"></div>
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute inset-0 noise-bg"></div>
      
      {/* Render the VibratingStrings component only on the client */}
      <VibratingStrings className="opacity-30" density={2.5} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-1 text-blue-400 border-blue-400/30"
            >
              About Me
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
              Professional Overview
            </h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-lg leading-relaxed mb-6">
              I am a Systems Engineer with expertise in web3 technology, smart
              contracts, and agentic AI. With a strong foundation in theoretical
              physics and mathematics from Imperial College London and Lancaster
              University, I bring a unique analytical perspective to technical
              challenges.
            </p>
            <p className="text-lg leading-relaxed">
              My work spans from developing secure NFT minters and smart contracts
              to building custom database tools and implementing AI solutions.
              I'm passionate about combining mathematical principles with
              cutting-edge technology to create innovative solutions.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-none glass-card">
              <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Code className="mr-3 text-blue-400" />
                    <span>Technical Expertise</span>
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-400 flex-shrink-0 mt-1">
                        •
                      </span>
                      <div>
                        <span className="font-medium">
                          Blockchain Development
                        </span>
                        <p className="text-muted-foreground mt-1">
                          Building secure smart contracts and NFT solutions on
                          Arbitrum, Solana, and Polygon.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-400 flex-shrink-0 mt-1">
                        •
                      </span>
                      <div>
                        <span className="font-medium">AI Integration</span>
                        <p className="text-muted-foreground mt-1">
                          Implementing AI agents for operational workflows and
                          content generation.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-400 flex-shrink-0 mt-1">
                        •
                      </span>
                      <div>
                        <span className="font-medium">
                          System Architecture
                        </span>
                        <p className="text-muted-foreground mt-1">
                          Designing robust systems with database integration and
                          API development.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <Cpu className="mr-3 text-blue-400" />
                    <span>Core Competencies</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center p-3 rounded-lg glass-card glass-card-hover">
                      <Braces className="h-5 w-5 mr-2 text-blue-400" />
                      <span>Smart Contracts</span>
                    </div>
                    <div className="flex items-center p-3 rounded-lg glass-card glass-card-hover">
                      <BrainCircuit className="h-5 w-5 mr-2 text-blue-400" />
                      <span>AI Agents</span>
                    </div>
                    <div className="flex items-center p-3 rounded-lg glass-card glass-card-hover">
                      <Network className="h-5 w-5 mr-2 text-blue-400" />
                      <span>API Development</span>
                    </div>
                    <div className="flex items-center p-3 rounded-lg glass-card glass-card-hover">
                      <Layers className="h-5 w-5 mr-2 text-blue-400" />
                      <span>Web Development</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-8 mb-4">
                    Research Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20">
                      Agentic AI
                    </Badge>
                    <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20">
                      Blockchain Technology
                    </Badge>
                    <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20">
                      Quantum Computing
                    </Badge>
                    <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20">
                      Machine Learning
                    </Badge>
                    <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20">
                      Theoretical Physics
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
