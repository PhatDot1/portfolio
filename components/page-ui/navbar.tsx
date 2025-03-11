"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Github, Linkedin, Mail, FileText } from "lucide-react"
import { ModeToggle } from "@/components/page-ui/mode-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const sections = ["contact", "projects", "skills", "education", "experience", "about", "home"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gradient" onClick={closeMenu}>
          Patrick Loughran
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  activeSection === link.href.substring(1)
                    ? "text-blue-400 bg-blue-500/10"
                    : "text-muted-foreground hover:text-blue-400 hover:bg-blue-500/5",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/patrick-loughran-cv.pdf" target="_blank">
              <Button variant="outline" size="sm" className="glass-card-hover">
                <FileText className="h-4 w-4 mr-2" />
                CV
              </Button>
            </Link>
            <Link href="https://github.com/PhatDot1" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                aria-label="GitHub"
                className="text-muted-foreground hover:text-blue-400"
              >
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/patrick-loughran-8b033b238/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-blue-400"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-3 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="text-muted-foreground hover:text-blue-400"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium py-2 px-3 rounded-md",
                    activeSection === link.href.substring(1)
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-foreground hover:text-blue-400 hover:bg-blue-500/5",
                  )}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center space-x-4 py-2 mt-2">
                <Link href="/patrick-loughran-cv.pdf" target="_blank" className="flex-1">
                  <Button variant="outline" className="w-full glass-card-hover">
                    <FileText className="h-4 w-4 mr-2" />
                    Download CV
                  </Button>
                </Link>
              </div>
              <div className="flex items-center space-x-4 py-2">
                <Link href="https://github.com/PhatDot1" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="GitHub"
                    className="text-muted-foreground hover:text-blue-400"
                  >
                    <Github className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/patrick-loughran-8b033b238/" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="LinkedIn"
                    className="text-muted-foreground hover:text-blue-400"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="mailto:patrickloughran121@outlook.com">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Email"
                    className="text-muted-foreground hover:text-blue-400"
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

