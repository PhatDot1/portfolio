"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Briefcase } from "lucide-react"

export function ExperienceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const experiences = [
    {
      title: "Systems Engineer",
      company: "Encode Club Education LTD",
      period: "Mar 2024 - Present",
      responsibilities: [
        "NFT Minter Development: Created Solana and Polygon NFT minters with database integration, automating NFT issuance to programme graduates and participants.",
        "Secure Smart Contracts: Developed deposit smart contracts with robust validation mechanisms for seamless financial transactions.",
        "Custom Database Tools: Designed a backend-powered email extension with tracking, unsubscribe links, and error minimization to enhance compliance and flexibility.",
        "Web Development: Created secure web pages and user preference management systems to support the developer community.",
        "REST API Development: Built and integrated APIs for seamless service communication and data exchange.",
        "LangChain & On-Chain AI: Built Airtable agents with LangChain for record automation and dynamic content, integrating Crossmint for enhanced blockchain interactions.",
      ],
    },
    {
      title: "Graduate Operations Engineer",
      company: "Encode Club Education LTD",
      period: "Oct 2023 - Mar 2024",
      responsibilities: [
        "RPC Node and Validators: Set up and managed RPC nodes and validators on Ethereum mainnet and Holesky using Geth and Lighthouse, ensuring high availability and performance.",
        "Marketing Tracking: Built systems for user conversion tracking, pixel-based email open tracking, link click tracking, and social media engagement analysis.",
        "Workflow Optimization: Streamlined operations using Python, Zapier, and DigitalOcean droplets to improve efficiency and reliability.",
        "Programme Leadership & Community Engagement: Acted as the primary contact and front-facing lead for Solana Bootcamps, Hackathons, and an AI Bootcamp.",
        "CRM Development & Data Management: Built custom CRM solutions in Airtable to manage and quantify 10,000+ leads.",
      ],
    },
    {
      title: "Mathematics Tutor & Research",
      company: "Imperial College London",
      period: "Nov 2019 - Aug 2022",
      responsibilities: [
        "Workshop Hosting: Conducted workshops on advanced mathematical concepts, providing hands-on problem-solving sessions and fostering collaborative learning.",
        "Learning Material Creation: Developed engaging classes and worksheets for University Mathematics.",
        "Investigating String Theory Phenomenon: Analyzing how Lower-Dimensional Effective Theories Arise from Higher-Dimensional Frameworks and Exploring Invariant Structures Governing Fundamental Interactions.",
      ],
    },
  ]

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/90"></div>
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute inset-0 noise-bg"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 text-blue-400 border-blue-400/30">
              Experience
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Professional Journey</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <TracingBeam>
            <div className="relative mx-auto max-w-3xl">
              {experiences.map((item, index) => (
                <motion.div key={`content-${index}`} variants={itemVariants} className="mb-16 last:mb-0">
                  <Card className="overflow-hidden glass-card glass-card-hover">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground flex items-center">
                            <Briefcase className="mr-2 h-5 w-5 text-blue-400" />
                            {item.title}
                          </h3>
                          <p className="text-lg font-medium text-blue-400 mt-1">{item.company}</p>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="text-sm">{item.period}</span>
                        </div>
                      </div>

                      <div className="prose prose-sm dark:prose-invert mt-4 text-muted-foreground">
                        <ul className="space-y-3">
                          {item.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2 text-blue-400 flex-shrink-0 mt-1">•</span>
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TracingBeam>
        </motion.div>
      </div>
    </section>
  )
}

