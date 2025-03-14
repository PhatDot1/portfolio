"use client"

import { useRef, useEffect, useState } from "react"

export function VibratingStrings({ className, density = 1 }: { className?: string; density?: number }) {
  // Track mounting to ensure client-only random generation
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>(0)
  const timeRef = useRef(0)

  // Mark as mounted (client-side only)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return  // Do nothing until mounted

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

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Use the container dimensions for proper full-section distribution
    const { width: cWidth, height: cHeight } = container.getBoundingClientRect()

    // Scaling multiplier to make strings larger
    const sizeMultiplier = 2

    // Arrays to hold string definitions
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

    // Create open strings spread across the full container
    const openStringCount = Math.floor(12 * density)
    for (let i = 0; i < openStringCount; i++) {
      const x = Math.random() * cWidth
      const y = Math.random() * cHeight
      const length = (Math.random() * 120 + 80) * sizeMultiplier

      const modes = []
      const modeCount = Math.floor(Math.random() * 3) + 2 // 2-4 modes
      for (let n = 1; n <= modeCount; n++) {
        modes.push({
          n,
          amplitude: ((Math.random() * 10 + 5) / (n * 1.5)) * sizeMultiplier,
          phase: Math.random() * Math.PI * 2,
        })
      }

      // Blue-to-purple color palette
      const hue = 220 + Math.random() * 60
      const saturation = 70 + Math.random() * 30
      const lightness = 50 + Math.random() * 20
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`

      openStrings.push({ x, y, length, modes, color })
    }

    // Create closed strings (loops) spread across the full container
    const closedStringCount = Math.floor(8 * density)
    for (let i = 0; i < closedStringCount; i++) {
      const x = Math.random() * cWidth
      const y = Math.random() * cHeight
      const radius = (Math.random() * 40 + 30) * sizeMultiplier

      const modes = []
      const modeCount = Math.floor(Math.random() * 3) + 2 // 2-4 modes
      for (let n = 1; n <= modeCount; n++) {
        modes.push({
          n,
          amplitude: ((Math.random() * 8 + 4) / (n * 1.2)) * sizeMultiplier,
          phase: Math.random() * Math.PI * 2,
        })
      }

      const hue = 180 + Math.random() * 100
      const saturation = 70 + Math.random() * 30
      const lightness = 50 + Math.random() * 20
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`

      closedStrings.push({ x, y, radius, modes, color })
    }

    const drawStrings = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
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
      const startX = string.x - string.length / 2
      const startY = string.y
      ctx.moveTo(startX, startY)

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

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [mounted, density])

  // Do not render anything until mounted to prevent hydration mismatch
  if (!mounted) return null

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
