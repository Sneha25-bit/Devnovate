import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, Clock, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  tags: string[];
  status: "DRAFT" | "PENDING_REVIEW" | "PUBLISHED" | "REJECTED" | "HIDDEN" | "DELETED";
  visibility: "PUBLIC" | "HIDDEN";
  likes_count: number;
  comments_count: number;
  views_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export default function MyArticles() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (user) {
      fetchArticles();
    }
  }, [user]);

  const fetchArticles = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('author_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your articles",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (articleId: string) => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', articleId)
        .eq('author_id', user?.id);

      if (error) throw error;

      setArticles(prev => prev.filter(article => article.id !== articleId));
      toast({
        title: "Success",
        description: "Article deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete article",
        variant: "destructive"
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "DRAFT":
        return <Clock className="h-4 w-4 text-warning" />;
      case "REJECTED":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "default";
      case "DRAFT":
        return "secondary";
      case "REJECTED":
        return "destructive";
      default:
        return "outline";
    }
  };

  const filteredArticles = articles.filter(article => {
    switch (activeTab) {
      case "published":
        return article.status === "PUBLISHED";
      case "drafts":
        return article.status === "DRAFT";
      case "rejected":
        return article.status === "REJECTED";
      default:
        return true;
    }
  });

  const getContentPreview = (content: string) => {
    return content.length > 150 ? content.substring(0, 150) + "..." : content;
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Articles</h1>
            <p className="text-muted-foreground">
              Manage and track your published content
            </p>
          </div>
          
          <Button
            onClick={() => navigate('/write')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Write New Article
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({articles.length})
            </TabsTrigger>
            <TabsTrigger value="published">
              Published ({articles.filter(a => a.status === "PUBLISHED").length})
            </TabsTrigger>
            <TabsTrigger value="drafts">
              Drafts ({articles.filter(a => a.status === "DRAFT").length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({articles.filter(a => a.status === "REJECTED").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="text-lg text-muted-foreground">Loading your articles...</div>
              </div>
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-lg text-muted-foreground mb-4">
                  {activeTab === "all" 
                    ? "You haven't written any articles yet"
                    : `No ${activeTab} articles found`
                  }
                </div>
                <Button
                  onClick={() => navigate('/write')}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Write Your First Article
                </Button>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        {/* Cover Image */}
                        {article.cover_image_url && (
                          <div className="w-32 h-24 flex-shrink-0">
                            <img
                              src={article.cover_image_url}
                              alt={article.title}
                              className="w-full h-full object-cover rounded-md border"
                            />
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-semibold line-clamp-1">
                                  {article.title}
                                </h3>
                                <Badge variant={getStatusVariant(article.status)} className="gap-1">
                                  {getStatusIcon(article.status)}
                                  {article.status}
                                </Badge>
                              </div>
                              
                              <p className="text-muted-foreground line-clamp-2">
                                {getContentPreview(article.content)}
                              </p>
                            </div>
                          </div>

                          {/* Tags */}
                          {article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {article.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Stats & Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {article.views_count}
                              </div>
                              <div>
                                {article.likes_count} likes
                              </div>
                              <div>
                                {article.comments_count} comments
                              </div>
                              <div>
                                {article.published_at 
                                  ? `Published ${formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}`
                                  : `Updated ${formatDistanceToNow(new Date(article.updated_at), { addSuffix: true })}`
                                }
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {article.status === "PUBLISHED" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => navigate(`/blog/${article.slug}`)}
                                  className="gap-1"
                                >
                                  <Eye className="h-4 w-4" />
                                  View
                                </Button>
                              )}
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(`/write?edit=${article.id}`)}
                                className="gap-1"
                              >
                                <Edit className="h-4 w-4" />
                                Edit
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(article.id)}
                                className="gap-1 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}