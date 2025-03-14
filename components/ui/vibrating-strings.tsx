"use client"

import { useRef, useEffect } from "react"

export function VibratingStrings({ className, density = 1 }: { className?: string; density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect()
      canvas.width = width 
      canvas.height = height
    }

    // Initialize strings
    const openStrings: {
      x: number
      y: number
      length: number
      modes: { n: number; amplitude: number; phase: number }[]
      color: string
    }[] = []

    const closedStrings: {
      x: number
      y: number
      radius: number
      modes: { n: number; amplitude: number; phase: number }[]
      color: string
    }[] = []

    // Create open strings with proper mode expansions
    // Adjust count based on density parameter
    const openStringCount = Math.floor(12 * density)
    for (let i = 0; i < openStringCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const length = (Math.random() * 120 + 80) * 6

      // Create multiple vibrational modes (n=1,2,3...)
      const modes = []
      const modeCount = Math.floor(Math.random() * 3) + 2 // 2-4 modes

      for (let n = 1; n <= modeCount; n++) {
        modes.push({
          n,
          amplitude: (Math.random() * 10 + 5) / (n * 1.5), // Higher modes have smaller amplitudes
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Blue to purple color palette for strings
      const hue = 220 + Math.random() * 60
      const saturation = 70 + Math.random() * 30
      const lightness = 50 + Math.random() * 20
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`

      openStrings.push({ x, y, length, modes, color })
    }

    // Create closed strings (loops) with proper mode expansions
    // Adjust count based on density parameter
    const closedStringCount = Math.floor(8 * density)
    for (let i = 0; i < closedStringCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = (Math.random() * 40 + 30) * 6

      // Create multiple vibrational modes
      const modes = []
      const modeCount = Math.floor(Math.random() * 3) + 2 // 2-4 modes

      for (let n = 1; n <= modeCount; n++) {
        modes.push({
          n,
          amplitude: (Math.random() * 8 + 4) / (n * 1.2), // Higher modes have smaller amplitudes
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Slightly different color for closed strings
      const hue = 180 + Math.random() * 100
      const saturation = 70 + Math.random() * 30
      const lightness = 50 + Math.random() * 20
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`

      closedStrings.push({ x, y, radius, modes, color })
    }

    const drawStrings = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Increment time
      timeRef.current += 0.02

      // Draw open strings with proper mode expansions
      openStrings.forEach((string) => {
        drawOpenString(ctx, string, timeRef.current)
      })

      // Draw closed strings with proper mode expansions
      closedStrings.forEach((string) => {
        drawClosedString(ctx, string, timeRef.current)
      })

      animationFrameRef.current = requestAnimationFrame(drawStrings)
    }

    const drawOpenString = (
      ctx: CanvasRenderingContext2D,
      string: {
        x: number
        y: number
        length: number
        modes: { n: number; amplitude: number; phase: number }[]
        color: string
      },
      time: number,
    ) => {
      ctx.beginPath()

      // Starting point (fixed end)
      const startX = string.x - string.length / 2
      const startY = string.y
      ctx.moveTo(startX, startY)

      // Draw the string with proper mode expansion
      for (let i = 0; i <= 100; i++) {
        const x = startX + (i / 100) * string.length

        // Calculate y position based on superposition of modes
        // For open strings, we use sin(nπσ) modes to ensure fixed endpoints
        let y = string.y

        string.modes.forEach((mode) => {
          const normalizedPos = i / 100
          y += mode.amplitude * Math.sin(mode.n * Math.PI * normalizedPos) * Math.sin(time + mode.phase)
        })

        ctx.lineTo(x, y)
      }

      // Style and draw the string
      ctx.strokeStyle = string.color
      ctx.lineWidth = 2
      ctx.stroke()

      // Add glow effect
      ctx.shadowColor = string.color
      ctx.shadowBlur = 10
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    const drawClosedString = (
      ctx: CanvasRenderingContext2D,
      string: {
        x: number
        y: number
        radius: number
        modes: { n: number; amplitude: number; phase: number }[]
        color: string
      },
      time: number,
    ) => {
      ctx.beginPath()

      // Draw the closed string with proper mode expansion
      for (let i = 0; i <= 100; i++) {
        const angle = (i / 100) * Math.PI * 2

        // Calculate radius based on superposition of modes
        // For closed strings, we use cos(nθ) and sin(nθ) modes
        let radius = string.radius

        string.modes.forEach((mode) => {
          radius += mode.amplitude * Math.cos(mode.n * angle + time + mode.phase)
        })

        const x = string.x + Math.cos(angle) * radius
        const y = string.y + Math.sin(angle) * radius

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      // Close the path for closed strings
      ctx.closePath()

      // Style and draw the string
      ctx.strokeStyle = string.color
      ctx.lineWidth = 2
      ctx.stroke()

      // Add glow effect
      ctx.shadowColor = string.color
      ctx.shadowBlur = 10
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Start animation
    drawStrings()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [density])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
