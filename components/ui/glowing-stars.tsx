"use client"

import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export function GlowingStars() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [stars, setStars] = React.useState<
    { id: number; x: number; y: number; size: number; opacity: number; delay: number }[]
  >([])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const { width, height } = container.getBoundingClientRect()

    // Create stars
    const starCount = Math.floor((width * height) / 15000) // Adjust density
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 5,
    }))

    setStars(newStars)

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      const starCount = Math.floor((width * height) / 15000)
      const newStars = Array.from({ length: starCount }).map((_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3,
        delay: Math.random() * 5,
      }))
      setStars(newStars)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.5, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            delay: star.delay,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}
    </div>
  )
}

