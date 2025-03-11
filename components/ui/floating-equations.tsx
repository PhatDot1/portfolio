"use client"

import { useRef, useEffect } from "react"

export function FloatingEquations({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>(0)
  const timeRef = useRef(0)
  const equationsRef = useRef<
    {
      text: string
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      rotationSpeed: number
      rotation: number
    }[]
  >([])

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

      // Initialize equations
      initEquations()
    }

    // Update the initEquations function to make equations more readable
    const initEquations = () => {
      // Advanced theoretical physics equations
      const equationTexts = [
        // Virasoro algebra
        "[L_m, L_n] = (m-n)L_{m+n} + \\frac{26}{12}m(m^2-1)\\delta_{m+n,0}",

        // Polyakov action
        "S_P = -\\frac{T}{2}\\int d^2\\sigma \\sqrt{-h} h^{ab}\\partial_a X^\\mu \\partial_b X_\\mu",

        // Renormalization group flow equation
        "\\Lambda \\frac{\\partial S_\\Lambda}{\\partial \\Lambda} = \\frac{1}{2}\\int \\frac{\\delta S_\\Lambda}{\\delta \\phi}R_\\Lambda\\frac{\\delta S_\\Lambda}{\\delta \\phi} - \\text{Tr}(R_\\Lambda\\frac{\\delta^2 S_\\Lambda}{\\delta \\phi \\delta \\phi})",

        // Renormalized couplings scale dependence
        "\\mu \\frac{dg(\\mu)}{d\\mu} = \\beta(g(\\mu))",

        // Dirac-Born-Infeld action
        "S_{DBI} = -T_p \\int d^{p+1}\\xi e^{-\\phi}\\sqrt{-\\det(g_{ab} + B_{ab} + 2\\pi\\alpha' F_{ab})}",

        // Chern-Simons term for D-branes
        "S_{CS} = \\mu_p \\int_{M_{p+1}} \\sum_q C_{(q)} \\wedge e^{2\\pi\\alpha' F + B}",

        // Beta function
        "\\beta(g) = \\mu \\frac{dg}{d\\mu} = -\\frac{g^3}{16\\pi^2} + O(g^5)",

        // Calabi-Yau manifold condition
        "R_{\\mu\\nu} = 0",

        // Superstring action
        "S = \\frac{1}{4\\pi\\alpha'} \\int d^2\\sigma (\\partial_a X^\\mu \\partial^a X_\\mu - i\\bar{\\psi}^\\mu \\rho^a \\partial_a \\psi_\\mu)",

        // AdS/CFT correspondence
        "Z_{\\text{CFT}}[\\phi_0] = Z_{\\text{gravity}}[\\phi|_{\\partial AdS} = \\phi_0]",

        // M-theory relation
        "g_s = (\\frac{R_{11}}{l_p})^{3/2}",

        // Conformal field theory
        "\\langle \\phi(z)\\phi(w) \\rangle = \\frac{1}{(z-w)^{2\\Delta}}",
      ]

      const equations = []

      // Create floating equations with physics properties
      for (let i = 0; i < 10; i++) {
        // Reduced number of equations
        const text = equationTexts[i % equationTexts.length]
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const vx = (Math.random() - 0.5) * 0.1 // Slower horizontal drift
        const vy = (Math.random() - 0.5) * 0.1 // Slower vertical drift
        const size = Math.random() * 6 + 14 // Larger font size between 14-20px
        const opacity = Math.random() * 0.3 + 0.3 // Higher opacity between 0.3-0.6
        const rotationSpeed = (Math.random() - 0.5) * 0.002 // Much slower rotation
        const rotation = Math.random() * 0.2 - 0.1 // Very slight initial rotation (-0.1 to 0.1 radians)

        equations.push({ text, x, y, vx, vy, size, opacity, rotationSpeed, rotation })
      }

      equationsRef.current = equations
    }

    // Update the drawEquations function to improve readability
    const drawEquations = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Increment time
      timeRef.current += 0.005 // Slower time increment

      // Draw and update each equation
      equationsRef.current.forEach((eq) => {
        // Update position
        eq.x += eq.vx
        eq.y += eq.vy

        // Update rotation (very minimal)
        eq.rotation += eq.rotationSpeed

        // Wrap around edges with more padding
        if (eq.x < -500) eq.x = canvas.width + 100
        if (eq.x > canvas.width + 500) eq.x = -100
        if (eq.y < -100) eq.y = canvas.height + 50
        if (eq.y > canvas.height + 100) eq.y = -50

        // Pulsating opacity (more subtle)
        const pulsingOpacity = eq.opacity * (0.9 + 0.1 * Math.sin(timeRef.current * 0.3))

        // Draw equation with background for better contrast
        ctx.save()
        ctx.translate(eq.x, eq.y)
        ctx.rotate(eq.rotation)

        // Add subtle background for better readability
        const textWidth = ctx.measureText(eq.text).width
        ctx.fillStyle = `rgba(0, 0, 0, ${pulsingOpacity * 0.5})`
        ctx.fillRect(-10, -eq.size, textWidth + 20, eq.size * 1.5)

        // Draw text
        ctx.font = `${eq.size}px 'Computer Modern', serif`
        ctx.fillStyle = `rgba(255, 255, 255, ${pulsingOpacity})`
        ctx.fillText(eq.text, 0, 0)

        ctx.restore()
      })

      animationFrameRef.current = requestAnimationFrame(drawEquations)
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Start animation
    drawEquations()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}

