"use client"

export interface BlogPost {
  id: string
  title: string
  description: string
  content: string
  category: string
  date: string
  author: string
  image: string
  slug: string
  readTime?: string
  relatedPosts?: {
    title: string
    category: string
    image: string
    slug: string
  }[]
}

// Default blog posts
const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Evolution of Generative Adversarial Networks: From GAN to StyleGAN-3",
    description:
      "Explore the development of GAN architectures, highlighting key milestones like Progressive GAN, StyleGAN-1, StyleGAN-2, and the latest advancements in StyleGAN-3.",
    content: `<p>Generative Adversarial Networks (GANs) have revolutionized the field of artificial intelligence since their introduction by Ian Goodfellow and his colleagues in 2014. These networks consist of two neural networks—a generator and a discriminator—that are trained simultaneously through adversarial training.</p>
      
      <h2>The Original GAN</h2>
      <p>The original GAN architecture introduced a novel approach to generative modeling. The generator network creates samples (such as images), while the discriminator network evaluates them. The generator aims to produce samples that are indistinguishable from real data, while the discriminator aims to correctly identify which samples are real and which are generated.</p>
      
      <p>However, early GANs faced significant challenges, including training instability, mode collapse (where the generator produces limited varieties of samples), and difficulty in generating high-resolution images.</p>
      
      <h2>Progressive GAN: A Step Forward</h2>
      <p>In 2017, researchers at NVIDIA introduced Progressive GAN, which addressed many of the limitations of the original architecture. Progressive GAN employed a training methodology where both the generator and discriminator start with low-resolution images and gradually add layers that deal with higher-resolution details.</p>
      
      <p>This progressive training approach significantly improved training stability and enabled the generation of higher-resolution images (up to 1024×1024 pixels) with impressive detail and realism.</p>`,
    category: "GenAI",
    date: "May 15, 2023",
    author: "Dr. Alex Chen",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=600&h=400&auto=format&fit=crop",
    slug: "evolution-of-gans",
    readTime: "8 min read",
    relatedPosts: [
      {
        title: "The Rise of Multimodal AI Models: Bridging Text, Image, and Beyond",
        category: "AI Research",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "multimodal-ai-models",
      },
      {
        title: "AI in 2025: Transforming Daily Life",
        category: "Future Tech",
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "ai-in-2025",
      },
    ],
  },
  {
    id: "2",
    title: "AI in 2025: Transforming Daily Life",
    description:
      "Discuss how generative AI has integrated into everyday activities by 2025, providing personal style tips, translating conversations, analyzing diets, and more.",
    content: `<p>As we approach 2025, artificial intelligence has become deeply integrated into our daily lives in ways that were once the realm of science fiction. From personal assistants that anticipate our needs to AI systems that help us make better decisions, the technology has transformed how we live, work, and interact with the world around us.</p>
      
      <h2>Personal AI Assistants: Beyond Voice Commands</h2>
      <p>Personal AI assistants have evolved far beyond simple voice-activated helpers. In 2025, these systems understand context, remember past interactions, and proactively offer assistance based on your habits, preferences, and current situation.</p>
      
      <p>These assistants have become truly personal, adapting to individual communication styles and preferences. They can manage complex tasks like negotiating appointment times with other AI assistants, researching and summarizing information across multiple sources, and even handling routine correspondence in your personal communication style.</p>`,
    category: "Future Tech",
    date: "June 2, 2023",
    author: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=600&h=400&auto=format&fit=crop",
    slug: "ai-in-2025",
    readTime: "7 min read",
    relatedPosts: [
      {
        title: "The Future of AI Research: What's Next?",
        category: "Future of AI",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "future-of-ai-research",
      },
      {
        title: "Ethical Considerations in Generative AI",
        category: "AI Ethics",
        image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "ethical-considerations-genai",
      },
    ],
  },
  {
    id: "3",
    title: "The Rise of Multimodal AI Models: Bridging Text, Image, and Beyond",
    description:
      "Examine the emergence of multimodal AI models that process and generate multiple data types, such as text, images, and videos, and their applications in various industries.",
    content: `<p>Artificial intelligence has undergone a remarkable evolution in recent years, with one of the most significant developments being the rise of multimodal AI models. These sophisticated systems can process, understand, and generate content across multiple types of data—or modalities—such as text, images, audio, and video.</p>
      
      <h2>Understanding Multimodal AI</h2>
      <p>Traditional AI models were typically designed to work with a single type of data. Text-based models like GPT processed and generated language, while image-based models like DALL-E created visual content. These single-modality models, while powerful in their domains, were limited by their inability to connect concepts across different types of information.</p>
      
      <p>Multimodal AI models break down these barriers by integrating multiple types of data into a unified system. They can understand the relationships between text and images, audio and video, or any combination of modalities.</p>`,
    category: "AI Research",
    date: "June 28, 2023",
    author: "Dr. Michael Zhang",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&h=400&auto=format&fit=crop",
    slug: "multimodal-ai-models",
    readTime: "9 min read",
    relatedPosts: [
      {
        title: "The Evolution of Generative Adversarial Networks: From GAN to StyleGAN-3",
        category: "GenAI",
        image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "evolution-of-gans",
      },
      {
        title: "Deep Learning for Natural Language Processing",
        category: "NLP",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=600&h=400&auto=format&fit=crop",
        slug: "deep-learning-nlp",
      },
    ],
  },
]

// Initialize posts in localStorage if they don't exist
if (typeof window !== "undefined" && !localStorage.getItem("blog-posts-initialized")) {
  localStorage.setItem("blog-posts", JSON.stringify(defaultPosts))
  localStorage.setItem("blog-posts-initialized", "true")
}

// Get all blog posts
export function getAllPosts(): BlogPost[] {
  if (typeof window === "undefined") {
    return defaultPosts
  }

  const storedPosts = localStorage.getItem("blog-posts")
  return storedPosts ? JSON.parse(storedPosts) : []
}

// Get a single blog post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts()
  return posts.find((post) => post.slug === slug)
}

// Add a new blog post
export function addPost(post: Omit<BlogPost, "id">): BlogPost {
  const posts = getAllPosts()
  const newPost = {
    ...post,
    id: Date.now().toString(),
  }

  const updatedPosts = [newPost, ...posts]
  localStorage.setItem("blog-posts", JSON.stringify(updatedPosts))

  return newPost
}

// Update an existing blog post
export function updatePost(post: BlogPost): BlogPost {
  const posts = getAllPosts()
  const updatedPosts = posts.map((p) => (p.id === post.id ? post : p))
  localStorage.setItem("blog-posts", JSON.stringify(updatedPosts))

  return post
}

// Delete a blog post
export function deletePost(id: string): void {
  const posts = getAllPosts()
  const updatedPosts = posts.filter((post) => post.id !== id)
  localStorage.setItem("blog-posts", JSON.stringify(updatedPosts))
}

// Authentication functions
export function login(username: string, password: string): boolean {
  // In a real app, this would validate against a backend
  if (username === "abhishekviz" && password === "Abhishek@5151") {
    localStorage.setItem("admin-token", "demo-token-12345")
    localStorage.setItem("admin-user", username)
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem("admin-token")
  localStorage.removeItem("admin-user")
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") {
    return false
  }
  return !!localStorage.getItem("admin-token")
}