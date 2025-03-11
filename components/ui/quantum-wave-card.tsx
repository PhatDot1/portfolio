"use client"

import type React from "react"
import { useRef, useEffect } from "react"

export const QuantumWaveCard = ({
  text,
  icon,
  className,
}: {
  text?: string
  icon?: React.ReactNode
  className?: string
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
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

    // Advanced string theory and QFT equations
    const equations = [
      // Virasoro algebra
      "[L_m, L_n] = (m-n)L_{m+n} + \\frac{c}{12}m(m^2-1)\\delta_{m+n,0}",

      // Polyakov action
      "S_P = \\frac{T}{2} \\int d^2\\sigma \\sqrt{-h} h^{ab} \\partial_a X^\\mu \\partial_b X_\\mu",

      // Beta function
      "\\beta(g) = \\mu \\frac{dg}{d\\mu} = -\\frac{g^3}{16\\pi^2} + O(g^5)",

      // Renormalization group equation
      "\\mu \\frac{d}{d\\mu}\\Gamma^{(n)} = \\left[ \\mu\\frac{\\partial}{\\partial\\mu} + \\beta(g)\\frac{\\partial}{\\partial g} - n\\gamma_\\phi \\right]\\Gamma^{(n)}",

      // String theory equations
      "T_{\\mu\\nu} = \\frac{2}{\\sqrt{-g}}\\frac{\\delta S}{\\delta g^{\\mu\\nu}}",

      // Conformal field theory
      "\\langle \\phi(z)\\phi(w) \\rangle = \\frac{1}{(z-w)^{2\\Delta}}",

      // Bosonic string mode expansion
      "X^\\mu(\\tau,\\sigma) = x^\\mu + \\alpha' p^\\mu \\tau + i\\sqrt{\\frac{\\alpha'}{2}}\\sum_{n\\neq 0} \\frac{1}{n}\\alpha_n^\\mu e^{-in\\tau}\\cos(n\\sigma)",

      // D-brane tension
      "T_p = \\frac{1}{(2\\pi)^p g_s (\\alpha')^{(p+1)/2}}",

      // Calabi-Yau manifold condition
      "R_{\\mu\\nu} = 0",

      // Superstring action
      "S = \\frac{1}{4\\pi\\alpha'} \\int d^2\\sigma (\\partial_a X^\\mu \\partial^a X_\\mu - i\\bar{\\psi}^\\mu \\rho^a \\partial_a \\psi_\\mu)",
    ]

    const drawQuantumWaves = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Increment time
      timeRef.current += 0.01

      // Mouse influence
      const mouseX = mouseRef.current.x || canvas.width / 2
      const mouseY = mouseRef.current.y || canvas.height / 2

      // Draw closed and open strings
      drawBosonic26DStrings(ctx, canvas, mouseX, mouseY, timeRef.current)

      // Draw advanced equations
      drawStringTheoryEquations(ctx, canvas, timeRef.current, equations)

      animationFrameRef.current = requestAnimationFrame(drawQuantumWaves)
    }

    const drawBosonic26DStrings = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      mouseX: number,
      mouseY: number,
      time: number,
    ) => {
      // Draw open strings with proper mode expansions
      for (let i = 0; i < 3; i++) {
        const startX = Math.random() * canvas.width * 0.8 + canvas.width * 0.1
        const startY = Math.random() * canvas.height * 0.8 + canvas.height * 0.1
        const length = Math.random() * 80 + 40

        ctx.beginPath()

        // Draw the string with proper mode expansion
        for (let j = 0; j <= 50; j++) {
          const x = startX + (j / 50) * length

          // Calculate y position based on superposition of modes
          // For open strings, we use sin(nπσ) modes to ensure fixed endpoints
          let y = startY

          // Add multiple modes with decreasing amplitude
          y += 5 * Math.sin(Math.PI * (j / 50)) * Math.sin(time * 2 + i)
          y += 2.5 * Math.sin(2 * Math.PI * (j / 50)) * Math.sin(time * 3 + i + 1)
          y += 1.25 * Math.sin(3 * Math.PI * (j / 50)) * Math.sin(time * 4 + i + 2)

          // Add mouse influence
          const distX = x - mouseX
          const distY = y - mouseY
          const dist = Math.sqrt(distX * distX + distY * distY)
          if (dist < 100) {
            y += ((100 - dist) / 10) * Math.sin(time * 5)
          }

          ctx.lineTo(x, y)
        }

        // Blue to purple gradient for strings
        const hue = 220 + Math.random() * 60
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.3)`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Draw closed strings (loops) with proper mode expansions
      for (let i = 0; i < 2; i++) {
        const centerX = Math.random() * canvas.width * 0.8 + canvas.width * 0.1
        const centerY = Math.random() * canvas.height * 0.8 + canvas.height * 0.1
        const baseRadius = Math.random() * 20 + 15

        ctx.beginPath()

        for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
          // Calculate radius based on superposition of modes
          let radius = baseRadius

          // Add multiple modes with decreasing amplitude
          radius += 4 * Math.cos(angle + time * 1.5 + i)
          radius += 2 * Math.cos(2 * angle + time * 2 + i + 1)
          radius += 1 * Math.cos(3 * angle + time * 2.5 + i + 2)

          // Add mouse influence
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius

          const distX = x - mouseX
          const distY = y - mouseY
          const dist = Math.sqrt(distX * distX + distY * distY)

          let mouseEffect = 0
          if (dist < 100) {
            mouseEffect = (100 - dist) / 20
          }

          const finalX = centerX + Math.cos(angle) * (radius + mouseEffect * Math.cos(time * 3))
          const finalY = centerY + Math.sin(angle) * (radius + mouseEffect * Math.sin(time * 3))

          if (angle === 0) {
            ctx.moveTo(finalX, finalY)
          } else {
            ctx.lineTo(finalX, finalY)
          }
        }

        ctx.closePath()
        const hue = 180 + Math.random() * 100
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.3)`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
    }

    const drawStringTheoryEquations = (
      ctx: CanvasRenderingContext2D,
      canvas: HTMLCanvasElement,
      time: number,
      equations: string[],
    ) => {
      ctx.font = "10px monospace"
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)"

      for (let i = 0; i < 5; i++) {
        const equation = equations[Math.floor(Math.random() * equations.length)]
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const opacity = ((Math.sin(time + i) + 1) / 2) * 0.15

        ctx.globalAlpha = opacity
        ctx.fillText(equation, x, y)
        ctx.globalAlpha = 1
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = 0
      mouseRef.current.y = 0
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    // Start animation
    drawQuantumWaves()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm ${className}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="z-10 flex flex-col items-center justify-center">
        <div className="relative flex size-44 flex-col items-center justify-center rounded-full text-4xl font-bold">
          <div className="absolute size-full rounded-full bg-black/50 blur-sm" />
          <span className="z-20 whitespace-nowrap text-white">{text}</span>
          <span className="z-20 mt-4 whitespace-nowrap text-blue-400">{icon}</span>
        </div>
      </div>
    </div>
  )
}

