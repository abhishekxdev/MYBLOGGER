"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BrainCircuit, Clock, Share2, Twitter, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { getPostBySlug, type BlogPost } from "@/lib/blog-service"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BlogPost({ params }: { params: { slug: string } }) {
  const { toast } = useToast()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPost = () => {
      try {
        const foundPost = getPostBySlug(params.slug)
        if (foundPost) {
          setPost(foundPost)
        } else {
          toast({
            title: "Post not found",
            description: "The requested blog post could not be found.",
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error("Error loading post:", error)
        toast({
          title: "Error",
          description: "Failed to load blog post",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPost()
  }, [params.slug, toast])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const text = `Check out this article: ${post.title}`

    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url)
        toast({
          title: "Link copied",
          description: "The article link has been copied to your clipboard.",
        })
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/articles/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to articles
          </Link>

          <div className="flex items-center gap-2 text-sm text-purple-500 mb-4">
            <BrainCircuit className="h-5 w-5" />
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <div>{post.date}</div>
            <div>By {post.author}</div>
          </div>

          <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden border border-border mb-8">
            <Image
              src={post.image || "/placeholder.svg"}
              alt="Article hero image showing GAN-generated art"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex justify-between items-center mb-8">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 border-border hover:bg-accent"
                onClick={() => handleShare("twitter")}
              >
                <Twitter className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 border-border hover:bg-accent"
                onClick={() => handleShare("facebook")}
              >
                <Facebook className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 border-border hover:bg-accent"
                onClick={() => handleShare("linkedin")}
              >
                <Linkedin className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-3 border-border hover:bg-accent"
              onClick={() => handleShare("clipboard")}
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>

          <article className="prose dark:prose-invert prose-purple max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <div className="border-t border-border mt-12 pt-8">
            <h3 className="text-xl font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {post.relatedPosts && post.relatedPosts.length > 0 ? (
                post.relatedPosts.map((relatedPost, index) => (
                  <Link href={`/blog/${relatedPost.slug}/`} className="group" key={index}>
                    <div className="space-y-3">
                      <div className="relative h-48 rounded-lg overflow-hidden border border-border group-hover:border-purple-500/50 transition-colors">
                        <Image
                          src={relatedPost.image || "/placeholder.svg"}
                          alt={`${relatedPost.title} thumbnail`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs text-purple-500 mb-2">
                          <BrainCircuit className="h-4 w-4" />
                          <span>{relatedPost.category}</span>
                        </div>
                        <h3 className="font-medium group-hover:text-purple-400 transition-colors">
                          {relatedPost.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-muted-foreground col-span-2 text-center">No related articles found.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}