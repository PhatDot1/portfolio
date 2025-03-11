"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown, FileText, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import { GlowingStars } from "@/components/ui/glowing-stars"
import { ClientOnly } from "@/components/ui/client-only"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const words = [
    {
      text: "Systems",
    },
    {
      text: "Engineer",
    },
    {
      text: "&",
    },
    {
      text: "Operations",
    },
    {
      text: "Specialist",
      className: "text-blue-500 dark:text-blue-400",
    },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-hero-glow opacity-50"></div>
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute inset-0 noise-bg"></div>
      <ClientOnly>
        <GlowingStars />
      </ClientOnly>

      <div className="container mx-auto px-4 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-lg text-blue-400 font-medium mb-4"
          >
            Hello, I&apos;m
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold mb-4 glow-text-shadow"
          >
            Patrick Loughran
          </motion.h1>

          {mounted && (
            <div className="min-h-[60px] my-8">
              <TypewriterEffect words={words} />
            </div>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-muted-foreground max-w-2xl mx-auto mt-6 text-lg"
          >
            Specializing in blockchain technology, smart contracts, and AI integration. Building innovative solutions
            with a strong mathematical foundation.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <Link href="/patrick-loughran-cv.pdf" target="_blank">
            <Button size="lg" className="min-w-[180px] h-12 text-base font-medium relative overflow-hidden group">
              <span className="relative z-10 flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Download CV
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </Link>
          <Link href="#contact">
            <Button variant="outline" size="lg" className="min-w-[180px] h-12 text-base font-medium glass-card-hover">
              <Send className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <Link
            href="#about"
            className="flex flex-col items-center text-muted-foreground hover:text-blue-400 transition-colors"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </Link>
        </motion.div>
      </div>

      <ClientOnly>
        <BackgroundBeams />
      </ClientOnly>
    </section>
  )
}

