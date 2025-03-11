"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import type React from "react"

export function SmoothGradientCard({
  text,
  icon,
  className,
}: {
  text?: string
  icon?: React.ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useRef<number | null>(null)
  const mouseY = useRef<number | null>(null)
  const animationFrameId = useRef<number | null>(null)
  const particlesRef = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      alpha: number
    }>
  >([])

  useEffect(() => {
    const card = cardRef.current
    const canvas = canvasRef.current
    if (!card || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match card
    const resizeCanvas = () => {
      const rect = card.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height

      // Initialize particles
      initParticles()
    }

    const initParticles = () => {
      const particles = []
      const particleCount = 100

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const vx = (Math.random() - 0.5) * 0.3
        const vy = (Math.random() - 0.5) * 0.3
        const size = Math.random() * 2 + 1

        // Blue-purple color palette for quantum feel
        const hue = 220 + Math.random() * 60 // 220-280 range (blue to purple)
        const saturation = 70 + Math.random() * 30 // 70-100%
        const lightness = 50 + Math.random() * 20 // 50-70%
        const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`

        const alpha = 0.3 + Math.random() * 0.3

        particles.push({ x, y, vx, vy, size, color, alpha })
      }

      particlesRef.current = particles
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      mouseX.current = e.clientX - rect.left
      mouseY.current = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      // When mouse leaves, gradually fade out the effect
      mouseX.current = null
      mouseY.current = null
    }

    const drawQuantumField = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw quantum field particles
      particlesRef.current.forEach((particle) => {
        // Apply gravitational well effect if mouse is over card
        if (mouseX.current !== null && mouseY.current !== null) {
          const dx = particle.x - mouseX.current
          const dy = particle.y - mouseY.current
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxForce = 0.5
          const force = Math.min(maxForce, 50 / (distance + 0.1))

          // Create gravitational well effect
          const angle = Math.atan2(dy, dx)
          particle.vx -= Math.cos(angle) * force * 0.02
          particle.vy -= Math.sin(angle) * force * 0.02

          // Add some quantum uncertainty/fluctuation
          particle.vx += (Math.random() - 0.5) * 0.01
          particle.vy += (Math.random() - 0.5) * 0.01
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off walls with some energy loss
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.9
          particle.x = particle.x < 0 ? 0 : canvas.width
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.9
          particle.y = particle.y < 0 ? 0 : canvas.height
        }

        // Speed limit to prevent particles from moving too fast
        const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
        if (speed > 1.5) {
          particle.vx = (particle.vx / speed) * 1.5
          particle.vy = (particle.vy / speed) * 1.5
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.alpha
        ctx.fill()

        // Draw connections between nearby particles (quantum entanglement)
        particlesRef.current.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 50) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = (1 - distance / 50) * 0.2
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })

        ctx.globalAlpha = 1
      })

      // Draw gravitational well if mouse is over card
      if (mouseX.current !== null && mouseY.current !== null) {
        const gradient = ctx.createRadialGradient(
          mouseX.current,
          mouseY.current,
          0,
          mouseX.current,
          mouseY.current,
          100,
        )
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)")
        gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.1)")
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.beginPath()
        ctx.arc(mouseX.current, mouseY.current, 100, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      animationFrameId.current = requestAnimationFrame(drawQuantumField)
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    // Start animation
    drawQuantumField()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="z-10 flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 text-blue-400">{icon}</div>
        <h3 className="text-xl font-semibold text-white">{text}</h3>
      </div>
    </motion.div>
  )
}

