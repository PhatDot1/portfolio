import type React from "react"
import "@/app/globals.css"

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next"
import { Space_Grotesk } from 'next/font/google'

import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/ui/theme-provider"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://patrickloughran.com"),
  title: "Patrick Loughran | Systems Engineer & Blockchain Specialist",
  description:
    "Professional portfolio of Patrick Loughran - Systems Engineer specializing in blockchain technology, smart contracts, AI integration, APIs, and scripting.",
  applicationName: "Patrick Loughran Portfolio",
  keywords: [
    "Patrick Loughran",
    "Systems Engineer",
    "Blockchain",
    "Smart Contracts",
    "NFT",
    "LangChain",
    "AI",
    "Web Development",
    "API Development",
  ],
  openGraph: {
    siteName: "Patrick Loughran",
    title: "Patrick Loughran | Systems Engineer & Blockchain Specialist",
    description:
      "Professional portfolio of Patrick Loughran - Systems Engineer specializing in blockchain technology, smart contracts, AI integration, APIs, and scripting.",
    type: "website",
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@patrickloughran",
    title: "Patrick Loughran | Systems Engineer & Blockchain Specialist",
    description:
      "Professional portfolio of Patrick Loughran - Systems Engineer specializing in blockchain technology, smart contracts, AI integration, APIs, and scripting.",
    images: ["/opengraph-image.png"],
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: "/favicon/android-chrome-192x192.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      url: "/favicon/android-chrome-512x512.png",
    },
    {
      rel: "apple-touch-icon",
      url: "/favicon/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon/favicon-32x32.png",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${spaceGrotesk.className} antialiased`} suppressHydrationWarning={true}>
        <Analytics />
        <SpeedInsights />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster position="bottom-right" theme="dark" />
        </ThemeProvider>
      </body>
    </html>
  )
}
