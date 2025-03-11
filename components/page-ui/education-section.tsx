"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Award, Code, GraduationCap, School } from "lucide-react"

export function EducationSection() {
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

  return (
    <section id="education" className="py-24 relative overflow-hidden">
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
              Education
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Academic Background</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 gap-10">
            {educationItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden glass-card glass-card-hover">
                  <CardHeader className="bg-blue-500/5 pb-4 relative">
                    <div className="absolute top-0 right-0 h-20 w-20 bg-blue-500/10 rounded-bl-full"></div>
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-full bg-blue-500/10 text-blue-400">
                          {index === 0 ? <GraduationCap className="h-6 w-6" /> : <School className="h-6 w-6" />}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{item.degree}</h3>
                          <p className="text-blue-400">{item.institution}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-sm text-muted-foreground border-blue-500/20">
                        {item.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {item.description && (
                      <div className="mb-6">
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    )}

                    {item.modules && (
                      <div className="mb-6 p-4 rounded-lg bg-blue-500/5">
                        <h4 className="font-semibold flex items-center mb-3 text-blue-400">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Modules
                        </h4>
                        <p className="text-sm text-muted-foreground">{item.modules}</p>
                      </div>
                    )}

                    {item.dissertation && (
                      <div className="mb-6 p-4 rounded-lg bg-blue-500/5">
                        <h4 className="font-semibold flex items-center mb-3 text-blue-400">
                          <Award className="h-4 w-4 mr-2" />
                          Dissertation
                        </h4>
                        <p className="text-sm text-muted-foreground">{item.dissertation}</p>
                      </div>
                    )}

                    {item.projects && (
                      <div className="p-4 rounded-lg bg-blue-500/5">
                        <h4 className="font-semibold flex items-center mb-3 text-blue-400">
                          <Code className="h-4 w-4 mr-2" />
                          Project Experiences
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-3">
                          {item.projects.map((project, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2 text-blue-400 flex-shrink-0 mt-1">•</span>
                              <span>{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const educationItems = [
  {
    institution: "Imperial College London",
    degree: "MSc Quantum Fields and Fundamental Forces",
    period: "Oct 2021 - Oct 2023",
    modules:
      "Quantum Field Theory, Advanced Quantum Field Theory, Particle Symmetries, Unification, General Relativity, Relativity and Cosmology, Supersymmetry, Quantum Electrodynamics.",
    dissertation: "Authored a dissertation on compactification methods in 11D Supergravity theories.",
  },
  {
    institution: "Lancaster University",
    degree: "BSc Theoretical Physics with Mathematics: First Class Hons",
    period: "Sept 2018 - Aug 2021",
    description: "Placed in the top 10% of all Mathematicians.",
    projects: [
      "Quantum Spin Chain and Transverse Field Modeling: Modeled XY anisotropic quantum spin chains and Ising transverse field models using Qiskit and IBM quantum computing.",
      "Gravitational Simulations Report: Simulated planetary orbital motion and perihelion precession with Python.",
      "Quantum Sudoku Solver: Implemented a 4x4 quantum Sudoku solver using Qiskit and Grover's Search Algorithm.",
    ],
  },
]

