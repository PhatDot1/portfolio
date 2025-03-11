"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type Project = {
  title: string
  link: string
  thumbnail: string
  description?: string
}

export function CosmicProjectGallery({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const starsRef = useRef<{ x: number; y: number; size: number; speed: number; brightness: number }[]>([])
  const timeRef = useRef(0)

  // Initialize stars
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      canvas.width = width
      canvas.height = height

      // Create stars
      const stars = []
      const starCount = 200

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.05 + 0.01,
          brightness: Math.random() * 0.8 + 0.2,
        })
      }

      starsRef.current = stars
    }

    const animateStars = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update time
      timeRef.current += 0.01

      // Draw stars
      starsRef.current.forEach((star) => {
        // Move star
        star.y += star.speed

        // Reset star if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        // Pulsate brightness with time
        const brightness = star.brightness * (0.8 + 0.2 * Math.sin(timeRef.current * 2))

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
        ctx.fill()
      })

      // Draw cosmic dust and nebula effects
      drawCosmicEffects(ctx, canvas, timeRef.current)

      animationFrameRef.current = requestAnimationFrame(animateStars)
    }

    const drawCosmicEffects = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) => {
      // Draw nebula-like clouds
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      )

      gradient.addColorStop(0, "rgba(59, 130, 246, 0.01)")
      gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.005)")
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw some cosmic dust particles
      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(time * 0.1 + i) * canvas.width) / 2 + canvas.width / 2
        const y = (Math.cos(time * 0.1 + i) * canvas.height) / 2 + canvas.height / 2
        const size = Math.random() * 3 + 1

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(99, 102, 241, ${Math.random() * 0.05})`
        ctx.fill()
      }
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Start animation
    animateStars()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // Auto-rotate projects
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [projects.length])

  return (
    <div ref={containerRef} className="relative w-full h-[80vh] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-6">
                {projects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    className={`cursor-pointer transition-all duration-300 ${
                      idx === activeIndex
                        ? "bg-blue-500/10 border border-blue-500/20"
                        : "bg-black/20 border border-white/5 hover:bg-blue-500/5"
                    } rounded-xl p-6`}
                    onClick={() => setActiveIndex(idx)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <h3 className={`text-xl font-bold mb-2 ${idx === activeIndex ? "text-blue-400" : "text-white"}`}>
                      {project.title}
                    </h3>
                    {project.description && <p className="text-muted-foreground text-sm">{project.description}</p>}
                    {idx === activeIndex && (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-4 text-blue-400 text-sm hover:text-blue-300 transition-colors"
                      >
                        View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="order-1 md:order-2">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-video overflow-hidden rounded-xl border border-white/10 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <Image
                  src={projects[activeIndex].thumbnail || "/placeholder.svg"}
                  alt={projects[activeIndex].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-2xl font-bold text-white">{projects[activeIndex].title}</h3>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

