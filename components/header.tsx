"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function Header({ activePage = "home" }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("admin-token")
    setIsLoggedIn(!!token)
  }, [])

  const handleSubscribeClick = () => {
    router.push("/#newsletter")
  }

  const handleLoginClick = () => {
    router.push("/admin/login")
  }

  const handleDashboardClick = () => {
    router.push("/admin/dashboard")
  }

  return (
    <header className="container mx-auto py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          Trend<span className="text-purple-500">Forge</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm">
          <Link
            href="/"
            className={
              activePage === "home"
                ? "text-foreground transition-colors border-b-2 border-purple-500 pb-1"
                : "text-muted-foreground hover:text-foreground transition-colors"
            }
          >
            Home
          </Link>
          <Link
            href="/articles/"
            className={
              activePage === "articles"
                ? "text-foreground transition-colors border-b-2 border-purple-500 pb-1"
                : "text-muted-foreground hover:text-foreground transition-colors"
            }
          >
            Articles
          </Link>
          <Link
            href="/topics/"
            className={
              activePage === "topics"
                ? "text-foreground transition-colors border-b-2 border-purple-500 pb-1"
                : "text-muted-foreground hover:text-foreground transition-colors"
            }
          >
            Topics
          </Link>
          <Link
            href="/about/"
            className={
              activePage === "about"
                ? "text-foreground transition-colors border-b-2 border-purple-500 pb-1"
                : "text-muted-foreground hover:text-foreground transition-colors"
            }
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isLoggedIn ? (
            <Button
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white"
              onClick={handleDashboardClick}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-white"
                onClick={handleSubscribeClick}
              >
                Subscribe
              </Button>
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleLoginClick}
              >
                Admin
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

