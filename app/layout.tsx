import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TrendForge - AI, GenAI, Computer Vision & Deep Learning Blog",
  description: "Exploring the frontiers of artificial intelligence, generative AI, computer vision, and deep learning.",
  keywords: "AI, artificial intelligence, machine learning, deep learning, computer vision, generative AI",
  authors: [{ name: "TrendForge Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://neuralpulse.ai",
    title: "TrendForge - AI, GenAI, Computer Vision & Deep Learning Blog",
    description: "Exploring the frontiers of artificial intelligence, generative AI, computer vision, and deep learning.",
    siteName: "TrendForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrendForge - AI, GenAI, Computer Vision & Deep Learning Blog",
    description: "Exploring the frontiers of artificial intelligence, generative AI, computer vision, and deep learning.",
    creator: "@TrendForge",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}