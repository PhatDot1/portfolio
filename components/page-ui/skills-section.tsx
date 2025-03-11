"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import { FaPython, FaReact, FaNodeJs, FaEthereum } from "react-icons/fa"
import { SiSolidity, SiTypescript, SiPostgresql, SiChainlink } from "react-icons/si"
import { TbBrandNextjs } from "react-icons/tb"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PhysicsParticleSimulation } from "@/components/ui/physics-particle-simulation"
import { ClientOnly } from "@/components/ui/client-only"
import { SmoothGradientCard } from "@/components/ui/smooth-gradient-card"

export function SkillsSection() {
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
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/90"></div>
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute inset-0 noise-bg"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 text-blue-400 border-blue-400/30">
              Skills
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Technical Expertise</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {skills.map((item, idx) => (
              <Link key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="h-[13rem]">
                <SmoothGradientCard text={item.title} icon={item.icon} />
              </Link>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 relative">
            <Card className="glass-card overflow-hidden">
              <ClientOnly>
                <PhysicsParticleSimulation className="absolute inset-0 opacity-40" />
              </ClientOnly>
              <CardContent className="p-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <h3 className="text-xl font-bold mb-6 text-blue-400">Advanced Capabilities</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center">
                        <span className="mr-3 text-blue-400 flex-shrink-0">•</span>
                        <div>
                          <p className="font-medium">Blockchain & Smart Contracts Development</p>
                          <p className="text-sm text-muted-foreground mt-1">
                          Developed secure deposit smart contracts, NFT minters, and multi-liquidity swap platforms
                          </p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-3 text-blue-400 flex-shrink-0">•</span>
                        <div>
                          <p className="font-medium">Infrastructure Enginnering</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Set up RPC nodes and validators on Ethereum Holesky
                          </p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-3 text-blue-400 flex-shrink-0">•</span>
                        <div>
                          <p className="font-medium">REST API Development & Integration</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Building robust APIs with authentication and validation
                          </p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-3 text-blue-400 flex-shrink-0">•</span>
                        <div>
                          <p className="font-medium">LangChain & Agentic AI</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Building AI-powered applications with natural language processing
                          </p>
                        </div>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-3 text-blue-400 flex-shrink-0">•</span>
                        <div>
                          <p className="font-medium">Web Scraping & Automation</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Creating efficient data collection and processing systems
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-6 text-blue-400">Software & Cloud</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg glass-card glass-card-hover">
                        <p className="font-medium">GCP & AWS</p>
                        <div className="flex items-center mt-2">
                          <div className="h-2 bg-blue-400 rounded-full w-4/5"></div>
                          <span className="ml-2 text-xs text-muted-foreground">80%</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg glass-card glass-card-hover">
                        <p className="font-medium">DigitalOcean & Docker</p>
                        <div className="flex items-center mt-2">
                          <div className="h-2 bg-blue-400 rounded-full w-11/12"></div>
                          <span className="ml-2 text-xs text-muted-foreground">80%</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg glass-card glass-card-hover">
                        <p className="font-medium">Ethers.js & Crossmint</p>
                        <div className="flex items-center mt-2">
                          <div className="h-2 bg-blue-400 rounded-full w-11/12"></div>
                          <span className="ml-2 text-xs text-muted-foreground">90%</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg glass-card glass-card-hover">
                        <p className="font-medium">Hardhat</p>
                        <div className="flex items-center mt-2">
                          <div className="h-2 bg-blue-400 rounded-full w-11/12"></div>
                          <span className="ml-2 text-xs text-muted-foreground">90%</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg glass-card glass-card-hover">
                        <p className="font-medium">Vercel & Netlify</p>
                        <div className="flex items-center mt-2">
                          <div className="h-2 bg-blue-400 rounded-full w-full"></div>
                          <span className="ml-2 text-xs text-muted-foreground">100%</span>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg glass-card glass-card-hover">
                        <p className="font-medium">GitHub & CI/CD</p>
                        <div className="flex items-center mt-2">
                          <div className="h-2 bg-blue-400 rounded-full w-4/5"></div>
                          <span className="ml-2 text-xs text-muted-foreground">95%</span>
                        </div>
                      </div>
                    </div>
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

const skills = [
  {
    title: "Python",
    link: "https://www.python.org/",
    icon: <FaPython size={24} />,
  },
  {
    title: "TypeScript",
    link: "https://www.typescriptlang.org/",
    icon: <SiTypescript size={24} />,
  },
  {
    title: "Solidity",
    link: "https://soliditylang.org/",
    icon: <SiSolidity size={24} />,
  },
  {
    title: "React",
    link: "https://reactjs.org/",
    icon: <FaReact size={24} />,
  },
  {
    title: "Node.js",
    link: "https://nodejs.org/",
    icon: <FaNodeJs size={24} />,
  },
  {
    title: "Next.js",
    link: "https://nextjs.org/",
    icon: <TbBrandNextjs size={24} />,
  },
  {
    title: "PostgreSQL",
    link: "https://www.postgresql.org/",
    icon: <SiPostgresql size={24} />,
  },
  {
    title: "Langchain",
    link: "https://www.langchain.com/",
    icon: <SiChainlink size={24} />,
  },
  {
    title: "EVM",
    link: "https://ethereum.org/",
    icon: <FaEthereum size={24} />,
  },
]

