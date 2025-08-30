import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  Search, 
  ArrowRight, 
  PenTool, 
  Users, 
  BookOpen,
  Sparkles 
} from "lucide-react";
import { mockUser, mockBlogs, mockTrendingBlogs, mockTags } from "@/data/mockData";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const user = mockUser; // In real app, this would come from auth context
  
  const latestBlogs = mockBlogs.slice(0, 6);
  const trendingBlogs = mockTrendingBlogs;
  const popularTags = mockTags.slice(0, 12);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to blogs page with search query
      window.location.href = `/blogs?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header user={user} />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-brand opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent-light text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Welcome to Devnovate
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-brand bg-clip-text text-transparent leading-tight">
              Share Knowledge,
              <br />
              Build Community
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover insightful articles, share your expertise, and connect with developers 
              from around the world on our curated blogging platform.
            </p>
            
            {/* Hero Search */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search for articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-card shadow-lg border-0 focus:shadow-xl focus:shadow-brand/10"
                />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-brand hover:opacity-90"
                >
                  Search
                </Button>
              </div>
            </form>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-gradient-brand hover:opacity-90 text-lg px-8">
                <Link to="/blogs">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Articles
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to={user ? "/create" : "/signup"}>
                  <PenTool className="w-5 h-5 mr-2" />
                  Start Writing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">500+</div>
              <div className="text-muted-foreground">Quality Articles</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">1,200+</div>
              <div className="text-muted-foreground">Active Writers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">10K+</div>
              <div className="text-muted-foreground">Monthly Readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-accent" />
              <h2 className="text-3xl font-bold">Trending Now</h2>
            </div>
            <Button asChild variant="ghost" className="group">
              <Link to="/blogs?sort=trending">
                View All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trendingBlogs.map((blog, index) => (
              <div key={blog._id} className="relative">
                {index === 0 && (
                  <div className="absolute -top-2 -right-2 z-10 bg-gradient-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                    #1 Trending
                  </div>
                )}
                <BlogCard 
                  blog={blog} 
                  variant={index === 0 ? "featured" : "default"} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <Button asChild variant="ghost" className="group">
              <Link to="/blogs">
                Browse All
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tags Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Topics</h2>
          
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {popularTags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-sm py-2 px-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                asChild
              >
                <Link to={`/blogs?tags=${encodeURIComponent(tag)}`}>
                  #{tag}
                </Link>
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-brand text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Share Your Story?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join our community of developers and writers. Share your knowledge, 
            learn from others, and build meaningful connections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to={user ? "/create" : "/signup"}>
                <PenTool className="w-5 h-5 mr-2" />
                Start Writing Today
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 border-white/20 text-white hover:bg-white hover:text-primary">
              <Link to="/blogs">
                <Users className="w-5 h-5 mr-2" />
                Join the Community
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/50 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent">
                Devnovate
              </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 Devnovate. Built with ❤️ for the developer community.
          </div>
        </div>
      </footer>
    </div>
  );
}