// Mock data for the blogging platform

export const mockUser = {
  _id: "64f123a456b789c012d345e6",
  name: "Alice Johnson",
  email: "alice@devnovate.app",
  role: "USER" as const,
  bio: "Full-stack developer passionate about modern web technologies",
  avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  createdAt: "2024-01-15T10:00:00.000Z"
};

export const mockAdmin = {
  _id: "64f123a456b789c012d345e7",
  name: "Admin User",
  email: "admin@devnovate.app",
  role: "ADMIN" as const,
  bio: "Platform administrator",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  createdAt: "2024-01-01T10:00:00.000Z"
};

export const mockAuthors = [
  {
    _id: "64f123a456b789c012d345e8",
    name: "Sarah Chen",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    _id: "64f123a456b789c012d345e9",
    name: "Marcus Rodriguez",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    _id: "64f123a456b789c012d345ea",
    name: "Emily Zhang",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  }
];

export const mockBlogs = [
  {
    _id: "64f123a456b789c012d345f1",
    title: "Building Scalable React Applications with TypeScript",
    slug: "building-scalable-react-typescript",
    content: "In this comprehensive guide, we'll explore best practices for building large-scale React applications using TypeScript. We'll cover component architecture, state management patterns, and performance optimization techniques that will help you create maintainable and scalable codebases.",
    coverImageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&h=400&fit=crop",
    tags: ["react", "typescript", "architecture", "scalability"],
    status: "PUBLISHED" as const,
    visibility: "PUBLIC" as const,
    author: mockAuthors[0],
    likesCount: 42,
    commentsCount: 8,
    viewsCount: 1250,
    publishedAt: "2024-08-25T14:30:00.000Z",
    createdAt: "2024-08-24T10:00:00.000Z"
  },
  {
    _id: "64f123a456b789c012d345f2",
    title: "Modern CSS Techniques for Better User Interfaces",
    slug: "modern-css-techniques-better-ui",
    content: "Discover the latest CSS features and techniques that can dramatically improve your user interface design. From CSS Grid and Flexbox to custom properties and container queries, learn how to create stunning, responsive designs.",
    coverImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    tags: ["css", "ui", "design", "frontend"],
    status: "PUBLISHED" as const,
    visibility: "PUBLIC" as const,
    author: mockAuthors[1],
    likesCount: 38,
    commentsCount: 12,
    viewsCount: 980,
    publishedAt: "2024-08-24T09:15:00.000Z",
    createdAt: "2024-08-23T15:30:00.000Z"
  },
  {
    _id: "64f123a456b789c012d345f3",
    title: "API Design Best Practices for Node.js Applications",
    slug: "api-design-nodejs-best-practices",
    content: "Learn how to design robust, secure, and scalable APIs using Node.js and Express. This guide covers authentication, data validation, error handling, and documentation strategies for professional-grade APIs.",
    coverImageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    tags: ["nodejs", "api", "express", "backend"],
    status: "PUBLISHED" as const,
    visibility: "PUBLIC" as const,
    author: mockAuthors[2],
    likesCount: 56,
    commentsCount: 15,
    viewsCount: 1680,
    publishedAt: "2024-08-23T16:45:00.000Z",
    createdAt: "2024-08-22T11:20:00.000Z"
  },
  {
    _id: "64f123a456b789c012d345f4",
    title: "Getting Started with Docker for Web Developers",
    slug: "docker-web-developers-guide",
    content: "Docker has revolutionized how we develop and deploy applications. In this beginner-friendly tutorial, we'll explore containerization concepts and learn how to use Docker for web development workflows.",
    coverImageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=400&fit=crop",
    tags: ["docker", "devops", "containers", "deployment"],
    status: "PUBLISHED" as const,
    visibility: "PUBLIC" as const,
    author: mockAuthors[0],
    likesCount: 34,
    commentsCount: 7,
    viewsCount: 750,
    publishedAt: "2024-08-22T11:20:00.000Z",
    createdAt: "2024-08-21T14:15:00.000Z"
  },
  {
    _id: "64f123a456b789c012d345f5",
    title: "Understanding JavaScript Async/Await Patterns",
    slug: "javascript-async-await-patterns",
    content: "Asynchronous programming is crucial in modern JavaScript development. This deep dive explores async/await patterns, error handling strategies, and performance considerations for better code quality.",
    coverImageUrl: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
    tags: ["javascript", "async", "patterns", "programming"],
    status: "PUBLISHED" as const,
    visibility: "PUBLIC" as const,
    author: mockAuthors[1],
    likesCount: 48,
    commentsCount: 11,
    viewsCount: 1120,
    publishedAt: "2024-08-21T08:30:00.000Z",
    createdAt: "2024-08-20T16:45:00.000Z"
  },
  {
    _id: "64f123a456b789c012d345f6",
    title: "Building Progressive Web Apps with Service Workers",
    slug: "progressive-web-apps-service-workers",
    content: "Progressive Web Apps offer native-like experiences on the web. Learn how to implement service workers, caching strategies, and offline functionality to create fast, reliable web applications.",
    coverImageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
    tags: ["pwa", "service-workers", "web-app", "offline"],
    status: "PUBLISHED" as const,
    visibility: "PUBLIC" as const,
    author: mockAuthors[2],
    likesCount: 29,
    commentsCount: 5,
    viewsCount: 650,
    publishedAt: "2024-08-20T13:15:00.000Z",
    createdAt: "2024-08-19T09:30:00.000Z"
  }
];

// Calculate trending scores for blogs
export const mockTrendingBlogs = mockBlogs
  .map(blog => {
    const daysSincePublished = Math.floor(
      (Date.now() - new Date(blog.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    const recencyBoost = Math.max(0, 10 - daysSincePublished);
    const score = (blog.likesCount * 2) + blog.commentsCount + (blog.viewsCount * 0.2) + recencyBoost;
    
    return { ...blog, score };
  })
  .sort((a, b) => b.score - a.score)
  .slice(0, 3);

export const mockTags = [
  "react", "typescript", "javascript", "nodejs", "css", "ui", "design", 
  "frontend", "backend", "api", "docker", "devops", "pwa", "async", 
  "architecture", "scalability", "performance", "security"
];

export const mockComments = [
  {
    _id: "64f123a456b789c012d345c1",
    blogId: "64f123a456b789c012d345f1",
    author: {
      _id: "64f123a456b789c012d345e8",
      name: "John Doe",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
    },
    content: "Great article! The TypeScript integration tips were really helpful.",
    status: "VISIBLE" as const,
    createdAt: "2024-08-25T15:30:00.000Z"
  },
  {
    _id: "64f123a456b789c012d345c2",
    blogId: "64f123a456b789c012d345f1",
    author: {
      _id: "64f123a456b789c012d345e9",
      name: "Jane Smith",
      avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    content: "I've been struggling with large React apps. This came at the perfect time!",
    status: "VISIBLE" as const,
    createdAt: "2024-08-25T16:45:00.000Z"
  }
];