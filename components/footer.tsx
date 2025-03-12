import Link from "next/link"
import { Github, Linkedin, Mail, Rss, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tighter">
              Trend<span className="text-purple-500">Forge</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Exploring the cutting edge of artificial intelligence and machine learning.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Rss className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Topics</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Generative AI
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Computer Vision
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Deep Learning
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Machine Learning
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-foreground">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Code Samples
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Datasets
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground">
                  Tools
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>abhishekxbiz@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-6 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TrendForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}