import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Eye, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LikeButton } from "./LikeButton";
import { CommentSection } from "./CommentSection";

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

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 group">
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
            <h2 className="text-2xl font-bold mb-2 group-hover:text-accent-light transition-colors">
              {blog.title}
            </h2>
            <p className="text-white/90 mb-3 line-clamp-2">{excerpt}</p>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
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
                <Eye className="w-4 h-4" />
                <span>{blog.viewsCount}</span>
              </div>
            </div>
          </div>

          {/* Engagement */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-4">
              <LikeButton 
                blogId={blog._id} 
                initialLikesCount={blog.likesCount} 
              />
              
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{blog.commentsCount}</span>
              </button>
            </div>
          </div>
          
          {/* Comment Section */}
          <CommentSection 
            blogId={blog._id} 
            initialCommentsCount={blog.commentsCount} 
          />
        </div>
      </Card>
    );
  }

  // Compact variant
  if (variant === "compact") {
    return (
      <Card className="hover:shadow-md transition-shadow group">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Cover Image */}
            {blog.coverImageUrl && (
              <div className="w-20 h-16 flex-shrink-0">
                <img
                  src={blog.coverImageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-md border"
                />
              </div>
            )}
            
            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="space-y-1">
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {excerpt}
                </p>
              </div>
              
              {/* Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={blog.author?.avatarUrl} />
                    <AvatarFallback>
                      {blog.author?.name?.charAt(0)?.toUpperCase() || 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    {blog.author?.name}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(blog.publishedAt), { addSuffix: true })}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <LikeButton 
                    blogId={blog._id} 
                    initialLikesCount={blog.likesCount}
                    className="text-xs"
                  />
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {blog.commentsCount}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant (featured-style card)
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-0">
        {/* Cover Image */}
        {blog.coverImageUrl && (
          <div className="aspect-video overflow-hidden">
            <img
              src={blog.coverImageUrl}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="p-6 space-y-4">
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {blog.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {blog.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{blog.tags.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          {/* Title & Content */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {blog.title}
            </h3>
            <p className="text-muted-foreground line-clamp-3">
              {excerpt}
            </p>
          </div>
          
          {/* Author & Meta */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={blog.author?.avatarUrl} />
                <AvatarFallback>
                  {blog.author?.name?.charAt(0)?.toUpperCase() || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{blog.author?.name}</span>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {formatDistanceToNow(new Date(blog.publishedAt), { addSuffix: true })}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {blog.viewsCount}
              </div>
            </div>
          </div>
          
          {/* Engagement */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-4">
              <LikeButton 
                blogId={blog._id} 
                initialLikesCount={blog.likesCount} 
              />
              
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm font-medium">{blog.commentsCount}</span>
              </button>
            </div>
          </div>
          
          {/* Comment Section */}
          <CommentSection 
            blogId={blog._id} 
            initialCommentsCount={blog.commentsCount} 
          />
        </div>
      </CardContent>
    </Card>
  );
}