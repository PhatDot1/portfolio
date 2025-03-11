import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/90"></div>
      <div className="absolute inset-0 grid-pattern"></div>
      <div className="absolute inset-0 noise-bg"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold text-gradient">
              Patrick Loughran
            </Link>
            <p className="text-sm text-muted-foreground mt-2">Systems Engineer & Blockchain Specialist</p>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="#home" className="text-sm text-muted-foreground hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="#about" className="text-sm text-muted-foreground hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link href="#experience" className="text-sm text-muted-foreground hover:text-blue-400 transition-colors">
              Experience
            </Link>
            <Link href="#projects" className="text-sm text-muted-foreground hover:text-blue-400 transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="text-sm text-muted-foreground hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4 mt-6 md:mt-0">
            <Link
              href="https://github.com/PhatDot1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-blue-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/patrick-loughran-8b033b238/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-blue-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:patrickloughran121@outlook.com"
              className="text-muted-foreground hover:text-blue-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center">
            © {currentYear} Patrick Loughran. Made with
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

