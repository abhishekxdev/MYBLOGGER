"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllPosts, deletePost, isAuthenticated, logout, type BlogPost } from "@/lib/blog-service"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/admin/login")
      return
    }

    // Load posts
    const loadPosts = () => {
      try {
        const allPosts = getAllPosts()
        setPosts(allPosts)
        // Get the 5 most recent posts
        const recent = [...allPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)
        setRecentPosts(recent)
      } catch (error) {
        console.error("Error loading posts:", error)
        toast({
          title: "Error",
          description: "Failed to load blog posts",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [router, toast])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleDeletePost = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        deletePost(id)
        setPosts(posts.filter((post) => post.id !== id))
        setRecentPosts(recentPosts.filter((post) => post.id !== id))
        toast({
          title: "Success",
          description: "Post deleted successfully",
        })
      } catch (error) {
        console.error("Error deleting post:", error)
        toast({
          title: "Error",
          description: "Failed to delete post",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
            <Button asChild>
              <Link href="/admin/posts/new">
                <Plus className="mr-2 h-4 w-4" /> New Post
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Recent Posts Section */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Quick access to your 5 most recent blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                    <div>
                      <h3 className="font-medium">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/posts/edit/${post.id}`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* All Posts Section */}
          <Card>
            <CardHeader>
              <CardTitle>All Blog Posts</CardTitle>
              <CardDescription>Manage your blog posts - create, edit, or delete posts</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">Loading posts...</div>
              ) : posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No blog posts found. Create your first post!</p>
                  <Button asChild>
                    <Link href="/admin/posts/new">
                      <Plus className="mr-2 h-4 w-4" /> Create New Post
                    </Link>
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/admin/posts/edit/${post.id}`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeletePost(post.id)}>
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}