import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  PenTool, 
  User, 
  Menu, 
  X,
  Settings,
  LogOut 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, profile, userRole, signOut } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blogs?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleLogout = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <span className="text-xl font-bold bg-gradient-brand bg-clip-text text-transparent">
            Devnovate
          </span>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search blogs, topics, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-0 focus:bg-card"
            />
          </div>
        </form>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/blogs">Browse</Link>
              </Button>
              <Button asChild variant="brand" size="sm" className="bg-gradient-brand hover:opacity-90">
                <Link to="/create">
                  <PenTool className="w-4 h-4 mr-2" />
                  Write
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10">
                        {profile?.name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{profile?.name}</div>
                    <div className="text-muted-foreground text-xs">{userRole?.toLowerCase()}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-blogs">My Blogs</Link>
                  </DropdownMenuItem>
                  {userRole === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin">
                          <Settings className="mr-2 h-4 w-4" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/blogs">Browse</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild variant="brand" size="sm" className="bg-gradient-brand hover:opacity-90">
                <Link to="/auth">Get Started</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </form>

            {/* Mobile Navigation */}
            <div className="flex flex-col space-y-2">
              <Button asChild variant="ghost" className="justify-start">
                <Link to="/blogs" onClick={() => setIsMobileMenuOpen(false)}>
                  Browse Blogs
                </Link>
              </Button>
              
              {isAuthenticated ? (
                <>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link to="/create" onClick={() => setIsMobileMenuOpen(false)}>
                      <PenTool className="w-4 h-4 mr-2" />
                      Write Blog
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      Profile
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link to="/my-blogs" onClick={() => setIsMobileMenuOpen(false)}>
                      My Blogs
                    </Link>
                  </Button>
                  {userRole === "ADMIN" && (
                    <Button asChild variant="ghost" className="justify-start">
                      <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    className="justify-start text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="ghost" className="justify-start">
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild variant="brand" className="justify-start bg-gradient-brand">
                    <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}