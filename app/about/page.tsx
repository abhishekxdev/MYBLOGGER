"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const router = useRouter()

  const handleSubscribeClick = () => {
    router.push("/#newsletter")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header activePage="about" />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About TrendForge</h1>

          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              TrendForge is dedicated to exploring the frontiers of artificial intelligence, with a focus on recent
              advancements in AI, GenAI, Computer Vision, and Deep Learning.
            </p>

            <h2>Our Mission</h2>
            <p>
              Our mission is to provide insightful, accessible, and cutting-edge content about the rapidly evolving
              field of artificial intelligence. We aim to bridge the gap between technical research and practical
              applications, making complex AI concepts understandable to a wider audience.
            </p>

            <h2>What We Cover</h2>
            <p>At TrendForge, we focus on several key areas in the AI landscape:</p>

            <ul>
              <li>
                <strong>Generative AI</strong>: From GANs to diffusion models, we explore how AI is creating
                increasingly realistic content across various media.
              </li>
              <li>
                <strong>Computer Vision</strong>: We delve into how machines perceive and understand visual information,
                and how this technology is transforming industries.
              </li>
              <li>
                <strong>Deep Learning</strong>: We examine the architectures, techniques, and applications that are
                pushing the boundaries of what AI can achieve.
              </li>
              <li>
                <strong>AI Ethics</strong>: We discuss the ethical implications of AI development and deployment,
                advocating for responsible innovation.
              </li>
            </ul>

            <h2>Our Team</h2>
            <p>
              TrendForge is run by a team of AI researchers, engineers, and enthusiasts who are passionate about the
              potential of artificial intelligence to transform our world for the better.
            </p>

            <h2>Contact Us</h2>
            <p>
              Have a question, suggestion, or want to collaborate? We'd love to hear from you! Reach out to us at{" "}
              <a href="mailto:ameyaudeshmukh@gmail.com" className="text-purple-400 hover:text-purple-300">
                abhishekxbiz@gmail.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}