import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Eye, Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function WriteArticle() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [article, setArticle] = useState({
    title: "",
    content: "",
    coverImageUrl: "",
    tags: [] as string[],
    status: "DRAFT" as "DRAFT" | "PUBLISHED",
    visibility: "PUBLIC" as "PUBLIC" | "HIDDEN"
  });
  
  const [newTag, setNewTag] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddTag = () => {
    if (newTag.trim() && !article.tags.includes(newTag.trim().toLowerCase())) {
      setArticle(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()]
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSave = async (status: "DRAFT" | "PUBLISHED") => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save articles",
        variant: "destructive"
      });
      return;
    }

    if (!article.title.trim() || !article.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both title and content",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const slug = generateSlug(article.title);
      
      const { error } = await supabase
        .from('blogs')
        .insert({
          title: article.title.trim(),
          slug,
          content: article.content.trim(),
          cover_image_url: article.coverImageUrl.trim() || null,
          tags: article.tags,
          status,
          visibility: article.visibility,
          author_id: user.id,
          published_at: status === "PUBLISHED" ? new Date().toISOString() : null
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Article ${status === "PUBLISHED" ? "published" : "saved as draft"} successfully`
      });
      
      navigate('/my-articles');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save article",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && newTag.trim()) {
      event.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-4xl mx-auto py-8 px-4">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Write New Article</h1>
            <p className="text-muted-foreground">
              Share your knowledge with the developer community
            </p>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Article Details</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Title *</label>
                <Input
                  placeholder="Enter article title..."
                  value={article.title}
                  onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                  className="text-lg"
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image URL</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="https://example.com/image.jpg"
                      value={article.coverImageUrl}
                      onChange={(e) => setArticle(prev => ({ ...prev, coverImageUrl: e.target.value }))}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Image className="h-4 w-4" />
                  </Button>
                </div>
                {article.coverImageUrl && (
                  <div className="mt-2">
                    <img
                      src={article.coverImageUrl}
                      alt="Cover preview"
                      className="w-full h-48 object-cover rounded-md border"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tags</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTag}
                    disabled={!newTag.trim()}
                  >
                    Add
                  </Button>
                </div>
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Content *</label>
                <Textarea
                  placeholder="Start writing your article..."
                  value={article.content}
                  onChange={(e) => setArticle(prev => ({ ...prev, content: e.target.value }))}
                  className="min-h-[400px] resize-none"
                />
              </div>

              {/* Settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Visibility</label>
                  <Select
                    value={article.visibility}
                    onValueChange={(value: "PUBLIC" | "HIDDEN") => 
                      setArticle(prev => ({ ...prev, visibility: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUBLIC">Public</SelectItem>
                      <SelectItem value="HIDDEN">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('/my-articles')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleSave("DRAFT")}
                disabled={isLoading}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Save Draft
              </Button>
              
              <Button
                onClick={() => handleSave("PUBLISHED")}
                disabled={isLoading}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                {isLoading ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}