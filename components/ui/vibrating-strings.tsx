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

    // We'll use this scale factor to enlarge the drawing 6x
    const scaleFactor = 6

    // Resize the canvas and set a transform so that drawing commands use container coordinates
    const resizeCanvas = () => {
      const { width, height } = container.getBoundingClientRect()
      canvas.width = width * scaleFactor
      canvas.height = height * scaleFactor
      // This transform scales all drawing by the scaleFactor.
      ctx.setTransform(scaleFactor, 0, 0, scaleFactor, 0, 0)
    }

    // Set up canvas dimensions and transform
    resizeCanvas()

    // Use container dimensions (unscaled) for generating positions and sizes
    const { width: cWidth, height: cHeight } = container.getBoundingClientRect()

    // Initialize arrays for our open and closed strings
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

    // Create open strings (positions are generated based on container dimensions)
    const openStringCount = Math.floor(12 * density)
    for (let i = 0; i < openStringCount; i++) {
      const x = Math.random() * cWidth
      const y = Math.random() * cHeight
      const length = Math.random() * 120 + 80

      const modes = []
      const modeCount = Math.floor(Math.random() * 3) + 2 // 2-4 modes
      for (let n = 1; n <= modeCount; n++) {
        modes.push({
          n,
          amplitude: (Math.random() * 10 + 5) / (n * 1.5),
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Use a blue-to-purple color palette
      const hue = 220 + Math.random() * 60
      const saturation = 70 + Math.random() * 30
      const lightness = 50 + Math.random() * 20
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`

      openStrings.push({ x, y, length, modes, color })
    }

    // Create closed strings (loops)
    const closedStringCount = Math.floor(8 * density)
    for (let i = 0; i < closedStringCount; i++) {
      const x = Math.random() * cWidth
      const y = Math.random() * cHeight
      const radius = Math.random() * 40 + 30

      const modes = []
      const modeCount = Math.floor(Math.random() * 3) + 2 // 2-4 modes
      for (let n = 1; n <= modeCount; n++) {
        modes.push({
          n,
          amplitude: (Math.random() * 8 + 4) / (n * 1.2),
          phase: Math.random() * Math.PI * 2,
        })
      }

      const hue = 180 + Math.random() * 100
      const saturation = 70 + Math.random() * 30
      const lightness = 50 + Math.random() * 20
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`

      closedStrings.push({ x, y, radius, modes, color })
    }

    // Draw and animate the strings
    const drawStrings = () => {
      // Clear the canvas using container dimensions (the transform scales this automatically)
      ctx.clearRect(0, 0, cWidth, cHeight)

      timeRef.current += 0.02

      openStrings.forEach((string) => {
        drawOpenString(ctx, string, timeRef.current)
      })

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

      // Fixed endpoint at the left
      const startX = string.x - string.length / 2
      const startY = string.y
      ctx.moveTo(startX, startY)

      // Superimpose multiple vibrational modes
      for (let i = 0; i <= 100; i++) {
        const x = startX + (i / 100) * string.length

        let y = string.y
        string.modes.forEach((mode) => {
          const normalizedPos = i / 100
          y += mode.amplitude * Math.sin(mode.n * Math.PI * normalizedPos) * Math.sin(time + mode.phase)
        })

        ctx.lineTo(x, y)
      }

      ctx.strokeStyle = string.color
      ctx.lineWidth = 2
      ctx.stroke()

      // Add a glow effect
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

      // Draw the loop using superposition of modes
      for (let i = 0; i <= 100; i++) {
        const angle = (i / 100) * Math.PI * 2

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

      ctx.closePath()
      ctx.strokeStyle = string.color
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.shadowColor = string.color
      ctx.shadowBlur = 10
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    drawStrings()
    window.addEventListener("resize", resizeCanvas)
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [density])

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
