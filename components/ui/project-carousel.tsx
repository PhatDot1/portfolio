"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type Project = {
  title: string
  link: string
  thumbnail: string
  description?: string
}

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [paused, setPaused] = useState(false)
  const projectsPerPage = 3
  const totalPages = Math.ceil(projects.length / projectsPerPage)

  // Calculate visible projects
  const visibleProjects = projects.slice(currentIndex * projectsPerPage, (currentIndex + 1) * projectsPerPage)

  // Auto-advance carousel
  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
    }, 8000)

    return () => clearInterval(interval)
  }, [totalPages, paused])

  const handleNext = useCallback(() => {
    setPaused(true)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }, [totalPages])

  const handlePrev = useCallback(() => {
    setPaused(true)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }, [totalPages])

  // Pagination indicators
  const renderPagination = () => {
    return (
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setPaused(true)
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-blue-500" : "w-2 bg-gray-500/50"
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    )
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative max-w-6xl mx-auto px-4">
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visibleProjects.map((project, idx) => (
                <div
                  key={`${currentIndex}-${idx}`}
                  className="bg-black/30 border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={project.thumbnail || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    {project.description && <p className="text-muted-foreground text-sm mb-4">{project.description}</p>}
                    <Link
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 text-sm hover:text-blue-300 transition-colors"
                    >
                      View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 -ml-4 md:ml-0"
        onClick={handlePrev}
        aria-label="Previous projects"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 -mr-4 md:mr-0"
        onClick={handleNext}
        aria-label="Next projects"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {renderPagination()}
    </div>
  )
}

