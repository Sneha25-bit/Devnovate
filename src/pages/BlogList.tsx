import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  X,
  Calendar,
  User as UserIcon
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockBlogs, mockTags, mockAuthors } from "@/data/mockData";
import { useAuth } from "@/hooks/useAuth";

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get("tags")?.split(",").filter(Boolean) || []
  );
  const [selectedAuthor, setSelectedAuthor] = useState(searchParams.get("author") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "latest");
  const [showFilters, setShowFilters] = useState(false);
  
  const { isAuthenticated } = useAuth();

  // Filter and sort blogs based on current filters
  const filteredBlogs = mockBlogs
    .filter(blog => {
      const matchesSearch = !searchQuery || 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => blog.tags.includes(tag));
      
      const matchesAuthor = !selectedAuthor || 
        blog.author._id === selectedAuthor;
      
      return matchesSearch && matchesTags && matchesAuthor;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "popular":
          return b.likesCount - a.likesCount;
        case "trending":
          const aScore = (a.likesCount * 2) + a.commentsCount + (a.viewsCount * 0.2);
          const bScore = (b.likesCount * 2) + b.commentsCount + (b.viewsCount * 0.2);
          return bScore - aScore;
        default:
          return 0;
      }
    });

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    if (selectedAuthor) params.set("author", selectedAuthor);
    if (sortBy !== "latest") params.set("sort", sortBy);
    
    setSearchParams(params, { replace: true });
  }, [searchQuery, selectedTags, selectedAuthor, sortBy, setSearchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search will be handled by the effect above
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedAuthor("");
    setSortBy("latest");
  };

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedAuthor || sortBy !== "latest";

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Discover Articles</h1>
          <p className="text-muted-foreground text-lg">
            Explore {mockBlogs.length} curated articles from our community of developers
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="search"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                />
              </div>
            </form>

            {/* Filter Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters {hasActiveFilters && `(${[searchQuery, ...selectedTags, selectedAuthor, sortBy !== "latest" ? sortBy : ""].filter(Boolean).length})`}
                </Button>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-2 text-muted-foreground"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t space-y-6">
                {/* Tags Filter */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Topics
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mockTags.slice(0, 15).map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "secondary"}
                        className="cursor-pointer transition-colors"
                        onClick={() => toggleTag(tag)}
                      >
                        #{tag}
                        {selectedTags.includes(tag) && (
                          <X className="w-3 h-3 ml-1" />
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Author Filter */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Author
                  </h3>
                  <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Select an author" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All authors</SelectItem>
                      {mockAuthors.map((author) => (
                        <SelectItem key={author._id} value={author._id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="outline" className="gap-1">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="outline" className="gap-1">
                  #{tag}
                  <button onClick={() => toggleTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {selectedAuthor && (
                <Badge variant="outline" className="gap-1">
                  Author: {mockAuthors.find(a => a._id === selectedAuthor)?.name}
                  <button onClick={() => setSelectedAuthor("")}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            {filteredBlogs.length} article{filteredBlogs.length !== 1 ? "s" : ""} found
          </p>
          
          {isAuthenticated && (
            <Button asChild variant="brand">
              <Link to="/create">
                Write Article
              </Link>
            </Button>
          )}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="mb-6">
                Try adjusting your search terms or clearing some filters.
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline">
                  Clear all filters
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}