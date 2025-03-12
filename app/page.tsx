"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Clock, Cpu, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllPosts, type BlogPost } from "@/lib/blog-service"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const { toast } = useToast()
  const newsletterRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Load posts when component mounts and set up interval to check for updates
    const loadPosts = () => {
      const allPosts = getAllPosts()
      setPosts(allPosts)
    }

    loadPosts() // Initial load

    // Set up interval to check for updates every 2 seconds
    const interval = setInterval(loadPosts, 2000)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  const scrollToNewsletter = () => {
    newsletterRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
      setIsSubmitting(false)
    }, 1000)
  }

  // Get the 3 most recent posts for featured articles
  const featuredPosts = posts.slice(0, 3)
  // Get the next 6 posts for recent articles
  const recentPosts = posts.slice(3, 9)

  return (
    <div className="min-h-screen bg-background">
      <Header activePage="home" />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Exploring the Frontiers of <span className="text-purple-500">Artificial Intelligence</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Deep insights into AI, GenAI, Computer Vision, and Deep Learning advancements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/articles/">Latest Articles</Link>
                </Button>
                <Button variant="outline" className="border-gray-700 hover:bg-accent" onClick={scrollToNewsletter}>
                  Join Newsletter
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden border border-border">
              <Image
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&h=800&auto=format&fit=crop"
                alt="AI visualization showing neural network connections"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Articles</h2>
            <Link href="/articles/" className="text-purple-500 hover:text-purple-400 text-sm flex items-center gap-2">
              View all <Eye className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post, index) => (
              <FeaturedCard
                key={post.id}
                title={post.title}
                description={post.description}
                image={post.image}
                date={post.date}
                category={post.category}
                icon={
                  index === 0 ? (
                    <BrainCircuit className="h-5 w-5" />
                  ) : index === 1 ? (
                    <Cpu className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )
                }
                slug={post.slug}
              />
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <ArticleCard
                key={post.id}
                title={post.title}
                description={post.description}
                category={post.category}
                date={post.date}
                slug={post.slug}
                image={post.image}
              />
            ))}
          </div>
        </section>

        <section ref={newsletterRef} id="newsletter" className="bg-card rounded-xl p-8 mb-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Stay Updated</h2>
              <p className="text-muted-foreground">
                Subscribe to our newsletter to receive the latest insights on AI advancements, tutorials, and industry
                news.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background border-border focus-visible:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeaturedCard({ title, description, image, date, category, icon, slug = "" }) {
  return (
    <Card className="bg-card border-border overflow-hidden hover:border-purple-500/50 transition-colors">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-purple-500 mb-2">
          {icon}
          <span>{category}</span>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <Link href={`/blog/${slug}/`} className="text-purple-500 hover:text-purple-400">
          Read more →
        </Link>
      </CardFooter>
    </Card>
  )
}

function ArticleCard({ title, description, category, date, slug = "", image }) {
  return (
    <Link href={`/blog/${slug}/`} className="group">
      <div className="space-y-3">
        <div className="relative h-48 rounded-lg overflow-hidden border border-border group-hover:border-purple-500/50 transition-colors">
          <Image src={image || "/placeholder.svg"} alt={`${title} thumbnail`} fill className="object-cover" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs text-purple-500 mb-2">
            <BrainCircuit className="h-4 w-4" />
            <span>{category}</span>
          </div>
          <h3 className="font-medium group-hover:text-purple-400 transition-colors">{title}</h3>
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{description}</p>
          <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}