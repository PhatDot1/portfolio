"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { BlockMath } from "react-katex"
import "katex/dist/katex.min.css"

type Equation = {
  text: string
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  rotationSpeed: number
  rotation: number
}

// A simple seeded random generator function
function createSeededRandomGenerator(seed: number) {
  let currentSeed = seed
  return () => {
    const x = Math.sin(currentSeed++) * 10000
    return x - Math.floor(x)
  }
}

export function FloatingEquations({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  // For SSR we use default dimensions; these should be close to your expected container size.
  const defaultWidth = 800
  const defaultHeight = 600

  // Create a seeded random function (with fixed seed) to generate deterministic initial values.
  const random = useMemo(() => createSeededRandomGenerator(42), [])

  // Generate initial equations deterministically using the seeded random function.
  const initialEquations = useMemo(() => {
    const width = defaultWidth
    const height = defaultHeight
    const equationTexts = [
      "[L_m, L_n] = (m-n)L_{m+n} + \\frac{26}{12}m(m^2-1)\\delta_{m+n,0}",
      "S_P = -\\frac{T}{2}\\int d^2\\sigma \\sqrt{-h}\\,h^{ab}\\partial_a X^\\mu\\partial_b X_\\mu",
      "\\Lambda \\frac{\\partial S_\\Lambda}{\\partial \\Lambda} = \\frac{1}{2}\\int \\frac{\\delta S_\\Lambda}{\\delta \\phi}\\,R_\\Lambda\\frac{\\delta S_\\Lambda}{\\delta \\phi} - \\text{Tr}\\Bigl(R_\\Lambda\\frac{\\delta^2 S_\\Lambda}{\\delta \\phi\\delta \\phi}\\Bigr)",
      "\\mu \\frac{dg(\\mu)}{d\\mu} = \\beta(g(\\mu))",
      "S_{DBI} = -T_p \\int d^{p+1}\\xi\\,e^{-\\phi}\\sqrt{-\\det\\Bigl(g_{ab}+B_{ab}+2\\pi\\alpha' F_{ab}\\Bigr)}",
      "S_{CS} = \\mu_p \\int_{\\mathcal{M}_{p+1}} \\sum_q C_{(q)} \\wedge e^{2\\pi\\alpha' F+B}",
      "\\beta(g) = \\mu \\frac{dg}{d\\mu} = -\\frac{g^3}{16\\pi^2}+O(g^5)",
      "S = \\frac{1}{4\\pi\\alpha'} \\int d^2\\sigma \\Bigl(\\partial_a X^\\mu\\partial^a X_\\mu - i\\bar{\\psi}^\\mu\\rho^a\\partial_a \\psi_\\mu\\Bigr)",
      "Z_{\\text{CFT}}[\\phi_0]=Z_{\\text{gravity}}\\Bigl[\\phi\\big|_{\\partial \\text{AdS}}=\\phi_0\\Bigr]",
      "g_s=\\Bigl(\\frac{R_{11}}{l_p}\\Bigr)^{3/2}",
      "\\langle \\phi(z)\\phi(w)\\rangle=\\frac{1}{(z-w)^{2\\Delta}}",
    ]
    const eqs: Equation[] = []
    const numEquations = 10
    for (let i = 0; i < numEquations; i++) {
      const text = equationTexts[i % equationTexts.length]
      const x = random() * width
      const y = random() * height
      // Reduced velocity values for slower drift.
      const vx = (random() - 0.5) * 0.2
      const vy = (random() - 0.5) * 0.2
      const size = random() * 6 + 14 // font size between 14 and 20px
      const opacity = random() * 0.3 + 0.3 // opacity between 0.3 and 0.6
      // Reduced rotation speed.
      const rotationSpeed = (random() - 0.5) * 0.001
      const rotation = random() * 0.2 - 0.1

      eqs.push({ text, x, y, vx, vy, size, opacity, rotationSpeed, rotation })
    }
    return eqs
  }, [random])

  const [equations, setEquations] = useState<Equation[]>(initialEquations)

  useEffect(() => {
    // On the client, update dimensions if possible.
    const container = containerRef.current
    let width = defaultWidth
    let height = defaultHeight
    if (container) {
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
    }

    let animationFrameId: number
    let lastTimestamp = performance.now()
    const speedFactor = 4

    const animate = (timestamp: number) => {
      const delta = timestamp - lastTimestamp
      lastTimestamp = timestamp

      setEquations((prevEqs) =>
        prevEqs.map((eq) => {
          let newX = eq.x + eq.vx * (delta / 16) * speedFactor
          let newY = eq.y + eq.vy * (delta / 16) * speedFactor
          let newRotation = eq.rotation + eq.rotationSpeed * (delta / 16) * speedFactor

          // Wrap around with padding.
          if (newX < -200) newX = width + 100
          if (newX > width + 200) newX = -100
          if (newY < -50) newY = height + 50
          if (newY > height + 50) newY = -50

          return { ...eq, x: newX, y: newY, rotation: newRotation }
        })
      )
      animationFrameId = requestAnimationFrame(animate)
    }
    animationFrameId = requestAnimationFrame(animate)

    const handleResize = () => {
      // Optionally, you could recalc container dimensions on resize.
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {equations.map((eq, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: eq.x,
            top: eq.y,
            transform: `rotate(${eq.rotation}rad)`,
            opacity: eq.opacity,
            fontSize: `${eq.size}px`,
            background: "rgba(0, 0, 0, 0.5)",
            padding: "2px 4px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
          }}
        >
          <BlockMath math={eq.text} />
        </div>
      ))}
    </div>
  )
}
