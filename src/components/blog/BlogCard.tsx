import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Eye, Calendar, User } from "lucide-react";

interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    slug: string;
    content: string;
    coverImageUrl?: string;
    tags: string[];
    author: {
      _id: string;
      name: string;
      avatarUrl?: string;
    };
    likesCount: number;
    commentsCount: number;
    viewsCount: number;
    publishedAt: string;
  };
  variant?: "default" | "compact" | "featured";
}

export function BlogCard({ blog, variant = "default" }: BlogCardProps) {
  const excerpt = blog.content.length > 150 
    ? blog.content.substring(0, 150) + "..."
    : blog.content;

  const publishedDate = new Date(blog.publishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

  if (variant === "compact") {
    return (
      <Card className="group hover:shadow-md transition-all duration-300 hover:shadow-brand/5">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {blog.coverImageUrl && (
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <Link to={`/blogs/${blog.slug}`} className="block group">
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-accent transition-colors">
                  {blog.title}
                </h3>
              </Link>
              
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Avatar className="w-4 h-4">
                  <AvatarImage src={blog.author.avatarUrl} alt={blog.author.name} />
                  <AvatarFallback className="text-xs">
                    {blog.author.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{blog.author.name}</span>
                <span>•</span>
                <time dateTime={blog.publishedAt}>{timeAgo}</time>
              </div>

              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>{blog.likesCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{blog.commentsCount}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "featured") {
    return (
      <Card className="group hover:shadow-xl transition-all duration-500 hover:shadow-brand/10 overflow-hidden">
        <div className="relative">
          {blog.coverImageUrl && (
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={blog.coverImageUrl}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-white/20 backdrop-blur-sm border-0 text-white">
                  {tag}
                </Badge>
              ))}
            </div>
            <Link to={`/blogs/${blog.slug}`} className="block group">
              <h2 className="text-2xl font-bold mb-2 group-hover:text-accent-light transition-colors">
                {blog.title}
              </h2>
            </Link>
            <p className="text-white/90 mb-3 line-clamp-2">{excerpt}</p>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={blog.author.avatarUrl} alt={blog.author.name} />
                <AvatarFallback>{blog.author.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{blog.author.name}</p>
                <time className="text-xs text-muted-foreground" dateTime={blog.publishedAt}>
                  {timeAgo}
                </time>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{blog.likesCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{blog.commentsCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{blog.viewsCount}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:shadow-brand/5 overflow-hidden">
      {blog.coverImageUrl && (
        <div className="aspect-[16/9] overflow-hidden">
          <img
            src={blog.coverImageUrl}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Link to={`/blogs/${blog.slug}`} className="block group">
          <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-accent transition-colors">
            {blog.title}
          </h3>
        </Link>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={blog.author.avatarUrl} alt={blog.author.name} />
              <AvatarFallback>{blog.author.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{blog.author.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <time dateTime={blog.publishedAt}>{timeAgo}</time>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{blog.likesCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{blog.commentsCount}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}