"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BrainCircuit, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { getAllPosts, type BlogPost } from "@/lib/blog-service"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ArticlesPage() {
  const router = useRouter()
  const [articles, setArticles] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const posts = getAllPosts()
      setArticles(posts)
    } catch (error) {
      console.error("Error loading posts:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSubscribeClick = () => {
    router.push("/#newsletter")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header activePage="articles" />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-8">All Articles</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                description={article.description}
                category={article.category}
                date={article.date}
                slug={article.slug}
                image={article.image}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
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