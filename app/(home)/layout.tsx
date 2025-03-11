import type React from "react"
import { Navbar } from "@/components/page-ui/navbar"
import { Footer } from "@/components/page-ui/footer"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  )
}

